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

// Nepovinná odpověď „Jak jste se o mně dozvěděl/a?“ — whitelist, stejný seznam
// jako HEARD_FROM_OPTIONS v src/data/formOptions.ts.
const HEARD_FROM = [
    'Google – vyhledávání',
    'Google Mapy / profil',
    'Reklama (Google)',
    'Doporučení od známého nebo klienta',
    'Seznam / Firmy.cz',
    'Sociální sítě',
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
// Neznámá nebo prázdná hodnota poptávku nezamítá, jen se uvede „(neuvedeno)“.
$heardFromRaw = oneLine(field('odkud', 60));
$heardFrom = in_array($heardFromRaw, HEARD_FROM, true) ? $heardFromRaw : '';
// Odkud poptávka je: kontaktní formulář (prázdné) nebo nástroj
// „Na kolik dosáhnete?“ (/sluzby/hypoteky/na-kolik-dosahnete) — tam je
// e-mail nepovinný, ozývá se po telefonu.
$source = oneLine(field('zdroj', 40));
$isTool = $source === 'na-kolik-dosahnete';
// Vstupní stránka „Končí vám fixace?“ (/sluzby/hypoteky/refixace, 1. 11. 2026):
// jméno, telefon a měsíc konce fixace, e-mail se nevyplňuje.
$isRefix = $source === 'refixace';
// Doporučení ze stránky „Děkuji“ (/dekuji, 10. 11. 2026): klient vyplní
// kontakt na někoho ze svého okolí a své jméno; e-mail se nevyplňuje.
$isReferral = $source === 'doporuceni';
$referredBy = oneLine(field('od', 100));
$phoneOnly = $isTool || $isRefix || $isReferral;
$fixationEnd = oneLine(field('konec_fixace', 40));
$hasEmail = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;

/** Ověří pole o zdroji kliknutí přísným vzorem; cokoli jiného zahodí (bez chyby). */
function trackingField(string $name, string $pattern, int $max): string
{
    $value = oneLine(field($name, $max));
    return preg_match($pattern, $value) === 1 ? $value : '';
}

// Zdroj kliknutí (gclid, UTM) — formulář je pošle jen se souhlasem
// s marketingovými cookies (CookieConsent.astro). Kód zdroje podle číselníku
// Marketingu (Osobní značka/znalosti/zdroje-klientu-kody.md): google-ads / web.
$gclid = trackingField('gclid', '/^[A-Za-z0-9_-]{10,150}$/', 150);
$utmSource = trackingField('utm_source', '/^[A-Za-z0-9._ -]{1,60}$/', 60);
$utmMedium = trackingField('utm_medium', '/^[A-Za-z0-9._ -]{1,60}$/', 60);
$utmCampaign = trackingField('utm_campaign', '/^[A-Za-z0-9._ -]{1,60}$/', 60);
$fromAds = $gclid !== '' || in_array(strtolower($utmMedium), ['cpc', 'ppc', 'paid', 'paidsearch'], true);
$sourceCode = $fromAds ? 'google-ads' : 'web';
// Pro CRM (hlídač poptávek mozku v2, Mozek v2/smysly/poptavka.py, 10. 11. 2026):
// zdroj jen z hodnot Web / Google Ads / Doporučení, jméno rozdělené na
// křestní a příjmení (formulář má jedno pole: první slovo = jméno).
$crmSource = $isReferral ? 'Doporučení' : ($fromAds ? 'Google Ads' : 'Web');
$nameParts = preg_split('/\s+/u', trim($name), 2) ?: [''];
$firstName = $nameParts[0] ?? '';
$lastName = $nameParts[1] ?? '';
$utmParts = array_filter([
    $utmSource !== '' ? "zdroj={$utmSource}" : '',
    $utmMedium !== '' ? "médium={$utmMedium}" : '',
    $utmCampaign !== '' ? "kampaň={$utmCampaign}" : '',
]);

// Kontroly jsou záměrně stejně volné jako v prohlížeči (pole jen povinná) —
// přísnější server by odmítl poptávku, kterou formulář pustil, a ta by se ztratila.
$valid = $name !== ''
    && preg_match_all('/\d/', $phone) >= 6
    && ($hasEmail || ($phoneOnly && $email === ''))
    && in_array($area, INTEREST_AREAS, true)
    && (!$isReferral || $referredBy !== '');

if (!$valid) {
    respond(false, 400, $wantsJson);
}

$encode = static fn (string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

$subject = $encode(match (true) {
    $isTool => "Na kolik dosáhnu (web): {$name}",
    $isRefix => "Konec fixace (web): {$name}",
    $isReferral => "Doporučení (web): {$name} od {$referredBy}",
    default => "Nová poptávka z webu: {$area} — {$name}",
});

$sentAt = (new DateTimeImmutable('now', new DateTimeZone('Europe/Prague')))->format('j. n. Y H:i');

$body = implode("\n", [
    match (true) {
        $isTool => 'Nová poptávka z nástroje „Na kolik dosáhnete?“ na patrikgajdadzis.cz',
        $isRefix => 'Nová poptávka ze stránky „Končí vám fixace?“ na patrikgajdadzis.cz',
        $isReferral => 'Nové doporučení ze stránky „Děkuji“ – klient byl požádán, ať dotyčnému dá vědět, že se ozvete.',
        default => 'Nová poptávka z formuláře na patrikgajdadzis.cz',
    },
    '',
    "Jméno a příjmení: {$name}",
    "Telefon: {$phone}",
    'E-mail: ' . ($hasEmail ? $email : '(nevyplněno)'),
    "Oblast zájmu: {$area}",
    ...($isReferral ? ["Doporučil/a: {$referredBy}"] : []),
    // Formulář Končí vám fixace? otázku nemá (zdroj je reklama/odkaz).
    ...(!$isRefix && !$isReferral ? ['Jak se o mně dozvěděl/a: ' . ($heardFrom !== '' ? $heardFrom : '(neuvedeno)')] : []),
    ...($isRefix ? ['Konec fixace: ' . ($fixationEnd !== '' ? $fixationEnd : '(nevyplněno)')] : []),
    '',
    'Situace:',
    $situation !== '' ? $situation : '(nevyplněno)',
    '',
    "Zdroj z webu: {$sourceCode}",
    ...($gclid !== '' ? ["gclid: {$gclid}"] : []),
    ...($utmParts ? ['UTM: ' . implode(', ', $utmParts)] : []),
    '',
    // Strojově čitelný blok pro CRM: každý údaj na vlastním řádku s pevným popiskem.
    '--- Pro CRM ---',
    "Jméno: {$firstName}",
    "Příjmení: {$lastName}",
    'E-mail: ' . ($hasEmail ? $email : ''),
    "Telefon: {$phone}",
    "Zdroj: {$crmSource}",
    ...($isReferral ? ["Doporučil: {$referredBy}"] : []),
    "Téma: {$area}",
    '',
    '—',
    'Odesláno ' . $sentAt,
    $hasEmail ? 'Odpovědí na tento e-mail napíšete přímo klientovi.' : 'Klient e-mail nevyplnil — ozvěte se mu telefonicky.',
]);

// Přehledná HTML verze pro Patrika (10. 11. 2026, šablona upozorneni-email.html):
// jen vyplněné údaje, tlačítko Zavolat / Napsat e-mail. Textová verze ($body,
// včetně bloku „--- Pro CRM ---“) jde v e-mailu jako alternativa – čte ji
// hlídač poptávek. Když se šablona nenačte, odejde jen text jako dřív.
$h = static fn (string $text): string => htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
$fontCss = 'font-family:Manrope,Arial,Helvetica,sans-serif;';
$telHref = 'tel:' . preg_replace('/[^\d+]/', '', $phone);
$rowHtml = static fn (string $label, string $valueHtml): string =>
    '<tr><td style="' . $fontCss . 'padding:12px 12px 12px 0;border-bottom:1px solid #E4E9EF;width:34%;font-size:14px;line-height:22px;color:#7A8AA0;vertical-align:top;">' . $label . '</td>'
    . '<td style="' . $fontCss . 'padding:12px 0;border-bottom:1px solid #E4E9EF;font-size:16px;line-height:22px;color:#0F2747;font-weight:bold;vertical-align:top;">' . $valueHtml . '</td></tr>';
$linkHtml = static fn (string $href, string $text): string =>
    '<a class="odkaz" href="' . $href . '" style="color:#0F2747;text-decoration:underline;text-decoration-color:#1E7A5C;">' . $text . '</a>';
$buttonHtml = static fn (string $href, string $text, bool $fill): string =>
    '<td style="padding:0 10px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
    . '<td class="' . ($fill ? 'btn' : 'btn-obrys') . '" align="center" bgcolor="' . ($fill ? '#1E7A5C' : '#FFFFFF') . '" style="border-radius:14px;' . ($fill ? '' : 'border:1px solid #1E7A5C;') . '">'
    . '<a href="' . $href . '" style="display:inline-block;padding:' . ($fill ? '18px 30px' : '17px 29px') . ';' . $fontCss . 'font-size:16px;line-height:20px;font-weight:bold;color:' . ($fill ? '#FFFFFF' : '#1E7A5C') . ';text-decoration:none;border-radius:14px;">' . $text . '</a>'
    . '</td></tr></table></td>';

$rows = [$rowHtml('Telefon', $linkHtml($h($telHref), $h($phone)))];
if ($hasEmail) {
    $rows[] = $rowHtml('E-mail', $linkHtml('mailto:' . $h($email), $h($email)));
}
if ($isReferral) {
    if ($situation !== '') {
        $rows[] = $rowHtml('S čím', nl2br($h($situation)));
    }
    $rows[] = $rowHtml('Doporučil/a', $h($referredBy));
} else {
    $rows[] = $rowHtml('Téma', $h($area));
    if ($situation !== '') {
        $rows[] = $rowHtml('Situace', nl2br($h($situation)));
    }
    if ($isRefix && $fixationEnd !== '') {
        $rows[] = $rowHtml('Konec fixace', $h($fixationEnd));
    }
    if ($heardFrom !== '') {
        $rows[] = $rowHtml('Dozvěděl/a se', $h($heardFrom));
    }
}
$buttons = '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
    . $buttonHtml($h($telHref), 'Zavolat', true)
    . ($hasEmail ? $buttonHtml('mailto:' . $h($email), 'Napsat e-mail', false) : '')
    . '</tr></table>';
$kind = match (true) {
    $isTool => 'Na kolik dosáhnu',
    $isRefix => 'Konec fixace',
    $isReferral => 'Nové doporučení',
    default => 'Nová poptávka',
};
$origin = match (true) {
    $isTool => 'Nástroj Na kolik dosáhnete?',
    $isRefix => 'Stránka Končí vám fixace?',
    $isReferral => 'Stránka Děkuji',
    default => 'Formulář na webu',
};
$preview = $isReferral ? 'Doporučil/a ' . $referredBy : $area . ' · ' . $phone;

$notifyTemplate = @file_get_contents(__DIR__ . '/upozorneni-email.html');
$headerLines = array_filter([
    'From: ' . $encode(SENDER_NAME) . ' <' . SENDER . '>',
    $hasEmail ? 'Reply-To: ' . $encode($name) . ' <' . $email . '>' : '',
    'MIME-Version: 1.0',
]);
if ($notifyTemplate !== false) {
    $notifyHtml = str_replace(
        ['{{NADPIS}}', '{{NAHLED}}', '{{JMENO}}', '{{RADKY}}', '{{TLACITKA}}', '{{PATA}}'],
        [$h($kind), $h($preview), $h($name), implode('', $rows), $buttons, $h($origin . ' · zdroj ' . $crmSource . ' · ' . $sentAt)],
        $notifyTemplate
    );
    $notifyBoundary = 'pg-' . bin2hex(random_bytes(12));
    $headerLines[] = 'Content-Type: multipart/alternative; boundary="' . $notifyBoundary . '"';
    $mailBody = implode("\r\n", [
        '--' . $notifyBoundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($body)),
        '--' . $notifyBoundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($notifyHtml)),
        '--' . $notifyBoundary . '--',
        '',
    ]);
} else {
    $headerLines[] = 'Content-Type: text/plain; charset=UTF-8';
    $headerLines[] = 'Content-Transfer-Encoding: 8bit';
    $mailBody = $body;
}
$headers = implode("\r\n", $headerLines);

// Dvě samostatná odeslání: selhání jednoho nesmí shodit druhé. Pro klienta
// je poptávka odeslaná, pokud dorazila aspoň jedna kopie.
$sentMain = mail(RECIPIENT, $subject, $mailBody, $headers, '-f' . SENDER);
$sentBackup = mail(BACKUP_RECIPIENT, $subject, $mailBody, $headers, '-f' . SENDER);
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
        'Konzultace je nezávazná a celá služba je bez poplatků. Schůzka trvá zhruba 30 minut. Můžeme se potkat v kanceláři v Ostravě-Porubě, nebo online.',
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
