<?php
/**
 * Příjem poptávky z kontaktního formuláře (ContactSection.astro) a odeslání
 * e-mailem. Běží na Wedos webhostingu (PHP), web je jinak čistě statický.
 *
 * Obsah poptávky se neukládá na server — odchází jen e-mailem na RECIPIENT
 * a zálohou na BACKUP_RECIPIENT (schránka na Wedosu, jiný poskytovatel než
 * Google Workspace u RECIPIENT — když jeden e-mail spadne do spamu nebo se
 * nedoručí, poptávka se neztratí). Klient dostane krátké potvrzení
 * (od 7. 10. 2026), odpovědí na něj píše na REPLY_TO.
 *
 * Ochrana proti spamu bez CAPTCHA: skryté pole (honeypot) + minimální doba
 * vyplnění. Obojí při zásahu vrací „úspěch“, aby robot nepoznal, že neprošel.
 * Proti cílenému zahlcení: max. RATE_LIMIT odeslání za hodinu z jedné IP
 * (IP se ukládá jen jako otisk v api/limity/, nejdéle hodinu).
 *
 * Lokálně (npm run dev) se PHP nespouští — otestovat až na hostingu.
 */

declare(strict_types=1);

const RECIPIENT = 'patrik@mintfinance.cz';
// Odesílatel musí být na doméně webu (SPF), jinak e-maily padají do spamu.
const SENDER = 'poptavka@patrikgajdadzis.cz';
const SENDER_NAME = 'Web patrikgajdadzis.cz';
const BACKUP_RECIPIENT = 'poptavka@patrikgajdadzis.cz';
// Kam odpoví klient na potvrzovací e-mail (veřejný e-mail z brand manualu).
const REPLY_TO = 'patrik@mintfinance.cz';
// Online rezervace — musí sedět s BOOKING_URL v src/data/entity.ts.
const BOOKING_URL = 'https://calendar.app.google/995121nUYKycJ5aNA';
const MIN_FILL_MS = 3000;
// Záměrně velkorysé: kdyby Wedos schovával návštěvníky za společnou IP
// proxy, přísnější limit by blokoval skutečné klienty.
const RATE_LIMIT = 8;
const RATE_WINDOW_S = 3600;

const INTEREST_AREAS = [
    'Finanční plán',
    'Hypotéka a bydlení',
    'Investice',
    'Pojištění',
    'Penze',
    'Kontrola současných financí',
    'Jiné',
];

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status, bool $wantsJson): never
{
    http_response_code($status);
    header('Cache-Control: no-store');
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok]);
    } else {
        // Záložní odpověď pro odeslání bez JavaScriptu.
        header('Content-Type: text/html; charset=utf-8');
        $message = $ok
            ? 'Děkuji. Ozvu se vám co nejdříve.'
            : 'Zprávu se nepodařilo odeslat. Zkuste to znovu nebo mi zavolejte na +420 775 217 721.';
        echo '<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="robots" content="noindex">'
            . '<title>Poptávka | Patrik Gajdadzis</title><p>' . htmlspecialchars($message) . '</p>'
            . '<p><a href="/#kontakt">Zpět na web</a></p></html>';
    }
    exit;
}

function field(string $name, int $maxLength): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        return '';
    }
    // Nezlomitelné mezery → běžné: hodnoty ve formuláři je obsahují kvůli
    // typografii (např. „Hypotéka a\u{00A0}bydlení“), whitelist níž ne.
    $value = str_replace("\u{00A0}", ' ', $value);
    // Odstranit řídicí znaky (kromě nového řádku v delším textu) a ořezat délku.
    $value = trim(preg_replace('/[^\P{C}\n]/u', '', $value) ?? '');
    return mb_substr($value, 0, $maxLength);
}

function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

/**
 * Vrací true, pokud tahle IP už v posledních RATE_WINDOW_S sekundách odeslala
 * RATE_LIMIT poptávek. Při jakékoli chybě souborového systému pustí poptávku
 * dál — limit nesmí nikdy zablokovat skutečného klienta.
 */
function rateLimited(): bool
{
    $dir = __DIR__ . '/limity';
    if (!is_dir($dir) && !@mkdir($dir, 0700) && !is_dir($dir)) {
        return false;
    }
    // Za proxy je skutečná IP v X-Forwarded-For; podvržení hlavičky limit jen
    // obejde, nikoho nezablokuje.
    $forwarded = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0]);
    $ip = $forwarded !== '' ? $forwarded : ($_SERVER['REMOTE_ADDR'] ?? '');
    $file = $dir . '/' . hash('sha256', $ip . '|' . __FILE__) . '.txt';
    $now = time();

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false;
    }
    flock($handle, LOCK_EX);
    $times = array_filter(
        array_map('intval', explode("\n", (string) stream_get_contents($handle))),
        static fn (int $t): bool => $t > $now - RATE_WINDOW_S
    );
    $limited = count($times) >= RATE_LIMIT;
    if (!$limited) {
        $times[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, implode("\n", $times));
    flock($handle, LOCK_UN);
    fclose($handle);

    // Občas smazat otisky starší než okno limitu.
    if (random_int(1, 20) === 1) {
        foreach (glob($dir . '/*.txt') ?: [] as $old) {
            if (@filemtime($old) < $now - RATE_WINDOW_S) {
                @unlink($old);
            }
        }
    }
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, $wantsJson);
}

// Honeypot a příliš rychlé vyplnění → tváříme se, že je vše v pořádku.
// Prázdná doba vyplnění = neproběhl JavaScript (ten ji doplňuje): člověk bez
// JS dostane poctivou chybu s telefonem, ne falešné „odesláno“.
$honeypot = $_POST['website'] ?? '';
$elapsed = (int) ($_POST['vyplneno-ms'] ?? 0);
if ($honeypot !== '') {
    respond(true, 200, $wantsJson);
}
if ($elapsed <= 0) {
    respond(false, 400, $wantsJson);
}
if ($elapsed < MIN_FILL_MS) {
    respond(true, 200, $wantsJson);
}
if (rateLimited()) {
    respond(false, 429, $wantsJson);
}

$name = oneLine(field('jmeno', 100));
$phone = oneLine(field('telefon', 60));
$email = oneLine(field('email', 254));
$area = oneLine(field('oblast', 60));
$situation = field('situace', 3000);
// Odkud poptávka je: kontaktní formulář (prázdné) nebo nástroj
// „Na kolik dosáhnete?“ (/sluzby/hypoteky/na-kolik-dosahnete) — tam je
// e-mail nepovinný, ozývá se po telefonu.
$source = oneLine(field('zdroj', 40));
$isTool = $source === 'na-kolik-dosahnete';
$hasEmail = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;

// Kontroly jsou záměrně stejně volné jako v prohlížeči (pole jen povinná) —
// přísnější server by odmítl poptávku, kterou formulář pustil, a ta by se ztratila.
$valid = $name !== ''
    && preg_match_all('/\d/', $phone) >= 6
    && ($hasEmail || ($isTool && $email === ''))
    && in_array($area, INTEREST_AREAS, true);

if (!$valid) {
    respond(false, 400, $wantsJson);
}

$encode = static fn (string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

$subject = $encode($isTool
    ? "Na kolik dosáhnu (web): {$name}"
    : "Nová poptávka z webu: {$area} — {$name}");

$body = implode("\n", [
    $isTool ? 'Nová poptávka z nástroje „Na kolik dosáhnete?“ na patrikgajdadzis.cz' : 'Nová poptávka z formuláře na patrikgajdadzis.cz',
    '',
    "Jméno a příjmení: {$name}",
    "Telefon: {$phone}",
    'E-mail: ' . ($hasEmail ? $email : '(nevyplněno)'),
    "Oblast zájmu: {$area}",
    '',
    'Situace:',
    $situation !== '' ? $situation : '(nevyplněno)',
    '',
    '—',
    'Odesláno ' . (new DateTimeImmutable('now', new DateTimeZone('Europe/Prague')))->format('j. n. Y H:i'),
    $hasEmail ? 'Odpovědí na tento e-mail napíšete přímo klientovi.' : 'Klient e-mail nevyplnil — ozvěte se mu telefonicky.',
]);

$headers = implode("\r\n", array_filter([
    'From: ' . $encode(SENDER_NAME) . ' <' . SENDER . '>',
    $hasEmail ? 'Reply-To: ' . $encode($name) . ' <' . $email . '>' : '',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]));

// Dvě samostatná odeslání: selhání jednoho nesmí shodit druhé. Pro klienta
// je poptávka odeslaná, pokud dorazila aspoň jedna kopie.
$sentMain = mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER);
$sentBackup = mail(BACKUP_RECIPIENT, $subject, $body, $headers, '-f' . SENDER);
$sent = $sentMain || $sentBackup;

// Potvrzení klientovi (7.–8. 10. 2026, text i vzhled schválil uživatel).
// Záměrně bez jména z formuláře a bez textu situace: kdyby robot zadal cizí
// e-mail a do polí reklamu, web by ji jinak rozeslal pod Patrikovým jménem.
// Oblast je ze seznamu (whitelist výš), takže je bezpečná. Odpověď klienta
// jde přímo na REPLY_TO. Selhání potvrzení neovlivní výsledek poptávky.
// HTML verze: potvrzeni-email.html + podpis-email.html (obojí v api/,
// zvenku nedostupné). Textová verze níž je pro programy bez HTML —
// při změně textu upravit obě.
if ($sent && $hasEmail) {
    $clientText = implode("\n", [
        'Dobrý den,',
        '',
        'zpráva mi dorazila v pořádku. Do jednoho pracovního dne se vám osobně ozvu, abychom domluvili termín.',
        '',
        "Téma: {$area}",
        '',
        'Konzultace je nezávazná a zdarma, trvá zhruba 30 minut. Můžeme se potkat v kanceláři v Ostravě-Porubě, nebo online.',
        '',
        'Pokud nechcete čekat, vyberte si termín rovnou tady: ' . BOOKING_URL,
        'nebo mi zavolejte na +420 775 217 721.',
        '',
        'Patrik Gajdadzis',
        '+420 775 217 721 · ' . REPLY_TO,
        'patrikgajdadzis.cz',
        '17. listopadu 599/30, 708 00 Ostrava-Poruba',
        '',
        '—',
        'Tento e-mail jste dostali, protože jste vyplnili formulář na patrikgajdadzis.cz.',
    ]);

    $template = @file_get_contents(__DIR__ . '/potvrzeni-email.html');
    $signature = @file_get_contents(__DIR__ . '/podpis-email.html');
    $clientHtml = null;
    if ($template !== false) {
        if ($signature === false) {
            $signature = '<p style="margin:0;font-weight:bold;color:#0F2747;">Patrik Gajdadzis</p>';
        }
        $clientHtml = str_replace(
            ['{{TEMA}}', '{{REZERVACE}}', '{{PODPIS}}'],
            [htmlspecialchars($area, ENT_QUOTES, 'UTF-8'), htmlspecialchars(BOOKING_URL, ENT_QUOTES, 'UTF-8'), $signature],
            $template
        );
    }

    $clientHeaders = [
        'From: ' . $encode('Patrik Gajdadzis') . ' <' . SENDER . '>',
        'Reply-To: ' . $encode('Patrik Gajdadzis') . ' <' . REPLY_TO . '>',
        'MIME-Version: 1.0',
    ];
    if ($clientHtml !== null) {
        $boundary = 'pg-' . bin2hex(random_bytes(12));
        $clientHeaders[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
        $clientBody = implode("\r\n", [
            '--' . $boundary,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
            '',
            chunk_split(base64_encode($clientText)),
            '--' . $boundary,
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
            '',
            chunk_split(base64_encode($clientHtml)),
            '--' . $boundary . '--',
            '',
        ]);
    } else {
        $clientHeaders[] = 'Content-Type: text/plain; charset=UTF-8';
        $clientHeaders[] = 'Content-Transfer-Encoding: 8bit';
        $clientBody = $clientText;
    }
    @mail(
        $email,
        $encode('Děkuji za zprávu, ozvu se do jednoho pracovního dne'),
        $clientBody,
        implode("\r\n", $clientHeaders),
        '-f' . SENDER
    );
}

respond($sent, $sent ? 200 : 500, $wantsJson);
