<?php
require_once __DIR__ . '/../config/api_config.php';
setupAPI();

echo json_encode([
    'status' => 'success',
    'message' => 'API funzionante',
    'timestamp' => date('Y-m-d H:i:s'),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'request_uri' => $_SERVER['REQUEST_URI']
]); 