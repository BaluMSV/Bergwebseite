<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$file = __DIR__ . '/besucher-zaehler.txt';
$handle = fopen($file, 'c+');

if ($handle === false || !flock($handle, LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['error' => 'counter unavailable']);
    exit;
}

$count = (int) trim((string) stream_get_contents($handle));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $count++;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) $count);
    fflush($handle);
} elseif ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    flock($handle, LOCK_UN);
    fclose($handle);
    http_response_code(405);
    header('Allow: GET, POST');
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

flock($handle, LOCK_UN);
fclose($handle);

echo json_encode(['count' => $count]);
