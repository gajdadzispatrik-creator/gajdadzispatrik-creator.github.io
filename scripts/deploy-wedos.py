"""Nahrání webu na Wedos přes FTP s TLS (11. 11. 2026).

Náhrada za lftp: instalace lftp na serverech GitHubu (apt) opakovaně
selhávala/visela. Python je na GitHub runnerech vždy, nic se neinstaluje.

Chování stejné jako dřív (.github/workflows/deploy-wedos.yml):
  1. dist/_astro/ – soubory mají otisk obsahu v názvu, nahrají se jen ty,
     které na serveru chybí nebo mají jinou velikost (staré zůstávají,
     takže stará stránka funguje, dokud ji nepřepíše nová),
  2. zbytek dist/ (stránky, obrázky, .htaccess, api/) – každý soubor se
     nahraje pod dočasným jménem a hotový se přejmenuje (stránka nikdy
     není během nahrávání rozbitá); složku api/limity/ na serveru nemaže
     ani nenahrává,
  3. deploy/www.htaccess → /www/.htaccess.
Nic na serveru nemaže.

Proměnné prostředí: FTP_HOST, FTP_USER, FTP_PASSWORD.
"""
import ftplib
import os
import ssl
import sys
import time

LOCAL_ROOT = 'dist'
REMOTE_ROOT = '/www/domains/patrikgajdadzis.cz'
SKIP_PREFIXES = ('api/limity/',)


class SessionReuseFTP_TLS(ftplib.FTP_TLS):
    """Datové spojení navazuje na TLS relaci řídicího spojení (servery jako
    ProFTPD/vsftpd to často vyžadují; lftp to dělalo samo)."""

    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn, server_hostname=self.host, session=self.sock.session)
        return conn, size


def connect():
    host, user, password = (os.environ.get(k, '') for k in ('FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'))
    if not (host and user and password):
        sys.exit('Chybí tajné údaje WEDOS_FTP_*')
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE  # jako dřív v lftp (ssl:verify-certificate no)
    ftp = SessionReuseFTP_TLS(context=ctx, timeout=60)
    ftp.connect(host, 21)
    ftp.login(user, password)
    ftp.prot_p()
    ftp.set_pasv(True)
    ftp.voidcmd('TYPE I')
    return ftp


class Uploader:
    def __init__(self):
        self.ftp = connect()
        self.known_dirs = set()
        self.uploaded = 0
        self.skipped = 0

    def retry(self, fn, *args):
        for attempt in range(3):
            try:
                return fn(*args)
            except (ftplib.error_temp, OSError, EOFError) as exc:
                print(f'  opakuji ({attempt + 1}/3): {exc}')
                time.sleep(3)
                try:
                    self.ftp.close()
                except Exception:
                    pass
                self.ftp = connect()
                self.known_dirs.clear()
        return fn(*args)

    def ensure_dir(self, remote_dir):
        if remote_dir in self.known_dirs or remote_dir in ('', '/'):
            return
        parent = remote_dir.rsplit('/', 1)[0]
        self.ensure_dir(parent)
        try:
            self.ftp.mkd(remote_dir)
        except ftplib.error_perm:
            pass  # už existuje
        self.chmod('755', remote_dir)
        self.known_dirs.add(remote_dir)

    def chmod(self, mode, remote_path):
        # Práva čtení pro web server (lftp je nastavovalo samo; bez nich 403).
        try:
            self.ftp.sendcmd(f'SITE CHMOD {mode} {remote_path}')
        except ftplib.all_errors as exc:
            print(f'  chmod {mode} {remote_path}: {exc}')

    def remote_size(self, remote_path):
        try:
            return self.ftp.size(remote_path)
        except ftplib.error_perm:
            return None

    def _put(self, local_path, remote_path, atomic):
        self.ensure_dir(remote_path.rsplit('/', 1)[0])
        target = remote_path + '.tmp-upload' if atomic else remote_path
        with open(local_path, 'rb') as fh:
            self.ftp.storbinary(f'STOR {target}', fh)
        if atomic:
            try:
                self.ftp.rename(target, remote_path)
            except ftplib.error_perm:
                # Server nedovolí přejmenovat přes existující soubor: smazat a přejmenovat.
                try:
                    self.ftp.delete(remote_path)
                except ftplib.error_perm:
                    pass
                self.ftp.rename(target, remote_path)

    def put(self, local_path, remote_path, atomic=True, only_if_changed=False):
        if only_if_changed:
            size = self.retry(self.remote_size, remote_path)
            if size == os.path.getsize(local_path):
                self.skipped += 1
                # i nezměněný soubor: srovnat práva (oprava po nasazení bez chmod)
                self.ensure_dir(remote_path.rsplit('/', 1)[0])
                self.chmod('644', remote_path)
                return
        self.retry(self._put, local_path, remote_path, atomic)
        self.chmod('644', remote_path)
        self.uploaded += 1


def local_files(root):
    for base, _dirs, files in os.walk(root):
        for name in sorted(files):
            full = os.path.join(base, name)
            rel = os.path.relpath(full, root).replace(os.sep, '/')
            yield full, rel


def main():
    up = Uploader()
    files = list(local_files(LOCAL_ROOT))

    # 1) _astro: jen nové / změněné (podle velikosti), přímo pod konečným jménem
    for full, rel in files:
        if rel.startswith('_astro/'):
            up.put(full, f'{REMOTE_ROOT}/{rel}', atomic=False, only_if_changed=True)
    print(f'_astro: nahráno {up.uploaded}, beze změny {up.skipped}')

    # 2) zbytek: přes dočasný soubor a přejmenování
    before = up.uploaded
    for full, rel in files:
        if rel.startswith('_astro/') or rel.startswith(SKIP_PREFIXES):
            continue
        up.put(full, f'{REMOTE_ROOT}/{rel}', atomic=True)
    print(f'stránky a ostatní: nahráno {up.uploaded - before}')

    # 3) hostingový .htaccess
    up.put('deploy/www.htaccess', '/www/.htaccess', atomic=True)
    print('hotovo')
    up.ftp.quit()


if __name__ == '__main__':
    main()
