<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
ini_set('display_errors', '0');
ini_set('log_errors', '1');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Diese Anfrage wird nicht unterstützt.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originHost = parse_url($origin, PHP_URL_HOST);
$originPort = parse_url($origin, PHP_URL_PORT);
$originAuthority = is_string($originHost)
    ? strtolower($originHost . ($originPort !== null ? ':' . $originPort : ''))
    : '';
$requestHost = strtolower($_SERVER['HTTP_HOST'] ?? '');

if ($originAuthority === '' || $requestHost === '' || !hash_equals($requestHost, $originAuthority)) {
    respond(403, ['success' => false, 'message' => 'Die Anfrage konnte nicht bestätigt werden.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 20000) {
    respond(413, ['success' => false, 'message' => 'Die Nachricht ist zu groß.']);
}

$configPath = __DIR__ . '/private/feedback-mail.php';
if (!is_file($configPath) || !is_readable($configPath)) {
    error_log('Kontaktformular: private/feedback-mail.php fehlt oder ist nicht lesbar.');
    respond(503, ['success' => false, 'message' => 'Der E-Mail-Versand ist noch nicht vollständig eingerichtet.']);
}

define('BAHNBERGE_FEEDBACK_CONFIG', true);
$config = require $configPath;
if (!is_array($config)) {
    error_log('Kontaktformular: Die Mailkonfiguration hat ein ungültiges Format.');
    respond(503, ['success' => false, 'message' => 'Der E-Mail-Versand ist noch nicht vollständig eingerichtet.']);
}

$recipient = $config['recipient'] ?? null;
$sender = $config['sender'] ?? null;
if (
    !is_string($recipient) ||
    filter_var($recipient, FILTER_VALIDATE_EMAIL) === false ||
    !is_string($sender) ||
    filter_var($sender, FILTER_VALIDATE_EMAIL) === false ||
    strtolower(substr(strrchr($sender, '@') ?: '', 1)) !== 'bahnberge.de'
) {
    error_log('Kontaktformular: Empfänger oder IONOS-Absenderadresse ist ungültig.');
    respond(503, ['success' => false, 'message' => 'Der E-Mail-Versand ist noch nicht vollständig eingerichtet.']);
}

if (!empty($_POST['botcheck'])) {
    respond(400, ['success' => false, 'message' => 'Die Anfrage konnte nicht verarbeitet werden.']);
}

$nameValue = $_POST['name'] ?? null;
$emailValue = $_POST['email'] ?? null;
$messageValue = $_POST['message'] ?? null;
if (!is_string($nameValue) || !is_string($emailValue) || !is_string($messageValue)) {
    respond(422, ['success' => false, 'message' => 'Bitte fülle Name, E-Mail-Adresse und Kommentar aus.']);
}

$name = trim($nameValue);
$email = trim($emailValue);
$message = trim($messageValue);

if ($name === '' || strlen($name) > 400 || preg_match('/[\r\n]/', $name)) {
    respond(422, ['success' => false, 'message' => 'Bitte gib einen gültigen Namen ein.']);
}

if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, ['success' => false, 'message' => 'Bitte gib eine gültige E-Mail-Adresse ein.']);
}

if ($message === '' || strlen($message) > 10000) {
    respond(422, ['success' => false, 'message' => 'Der Kommentar darf nicht leer und nicht zu lang sein.']);
}

$subject = '=?UTF-8?B?' . base64_encode('Neuer Kommentar von Bahnberge.de') . '?=';
$body = "Kommentar:\n{$message}\n\nName: {$name}\nE-Mail-Adresse: {$email}\n";
$headers = [
    'From: Bahnberge.de <' . $sender . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: quoted-printable'
];

$mailOptions = '-f' . escapeshellarg($sender);
if (!mail($recipient, $subject, quoted_printable_encode($body), implode("\r\n", $headers), $mailOptions)) {
    error_log('Kontaktformular: IONOS-PHP-mail() konnte die Nachricht nicht annehmen.');
    respond(502, ['success' => false, 'message' => 'IONOS konnte die Nachricht nicht annehmen. Bitte versuche es später erneut.']);
}

respond(200, ['success' => true, 'message' => 'Die Nachricht wurde an den E-Mail-Dienst übergeben.']);
