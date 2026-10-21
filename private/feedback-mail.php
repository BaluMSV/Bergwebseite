<?php
declare(strict_types=1);

if (!defined('BAHNBERGE_FEEDBACK_CONFIG')) {
    http_response_code(404);
    exit;
}

return [
    'recipient' => 'info@bahnberge.de',
    'sender' => 'info@bahnberge.de'
];
