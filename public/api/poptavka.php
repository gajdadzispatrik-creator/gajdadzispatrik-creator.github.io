<?php
/**
 * Příjem poptávky z kontaktního formuláře (ContactSection.astro) a odeslání
 * e-mailem. Běží na Wedos webhostingu (PHP), web je jinak čistě statický.
 *
 * Nic se neukládá na server — data odchází jen e-mailem na RECIPIENT.
 * Ochrana proti spamu bez CAPTCHA: skryté pole (honeypot) + minimální doba
 * vyplnění. Obojí při zásahu vrací „úspěch“, aby robot nepoznal, že neprošel.
 *
 * Lokálně (npm run dev) se PHP nespouští — otestovat až na hostingu.
 */

declare(strict_types=1);

const RECIPIENT = 'patrik@mintfinance.cz';
// Odesílatel musí být na doméně webu (SPF), jinak e-maily padají do spamu.
const SENDER = 'poptavka@patrikgajdadzis.cz';
const SENDER_NAME = 'Web patrikgajdadzis.cz';
const MIN_FILL_MS = 3000;

const INTEREST_AREAS = [
    'Finanční plán',
    'Hypotéka a bydlení',
    'Investice',
    'Pojištění',
    'Penze',
    'Kontrola současných financí',
    'Jiné',
];
const CONTACT_PREFERENCES = [
    'telefon' => 'Telefon',
    'email' => 'E-mail',
    'whatsapp' => 'WhatsApp',
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

$name = oneLine(field('jmeno', 100));
$phone = oneLine(field('telefon', 60));
$email = oneLine(field('email', 254));
$area = oneLine(field('oblast', 60));
$preference = oneLine(field('preferovany-kontakt', 20));
$situation = field('situace', 3000);

// Kontroly jsou záměrně stejně volné jako v prohlížeči (pole jen povinná) —
// přísnější server by odmítl poptávku, kterou formulář pustil, a ta by se ztratila.
$valid = $name !== ''
    && preg_match_all('/\d/', $phone) >= 6
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
    && in_array($area, INTEREST_AREAS, true)
    && array_key_exists($preference, CONTACT_PREFERENCES);

if (!$valid) {
    respond(false, 400, $wantsJson);
}

$encode = static fn (string $text): string => '=?UTF-8?B?' . base64_encode($text) . '?=';

$subject = $encode("Nová poptávka z webu: {$area} — {$name}");

$body = implode("\n", [
    'Nová poptávka z formuláře na patrikgajdadzis.cz',
    '',
    "Jméno a příjmení: {$name}",
    "Telefon: {$phone}",
    "E-mail: {$email}",
    "Oblast zájmu: {$area}",
    'Preferovaný kontakt: ' . CONTACT_PREFERENCES[$preference],
    '',
    'Situace:',
    $situation !== '' ? $situation : '(nevyplněno)',
    '',
    '—',
    'Odesláno ' . (new DateTimeImmutable('now', new DateTimeZone('Europe/Prague')))->format('j. n. Y H:i'),
    'Odpovědí na tento e-mail napíšete přímo klientovi.',
]);

$headers = implode("\r\n", [
    'From: ' . $encode(SENDER_NAME) . ' <' . SENDER . '>',
    'Reply-To: ' . $encode($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER);

respond($sent, $sent ? 200 : 500, $wantsJson);
