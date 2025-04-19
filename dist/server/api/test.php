<?php
require_once __DIR__ . '/../config/api_config.php';
require_once __DIR__ . '/../config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connesso',
        'env_vars' => [
            'host' => getenv('DB_HOST'),
            'user' => getenv('DB_USER'),
            'db' => getenv('DB_NAME')
        ],
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} catch(Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'env_vars' => [
            'host' => getenv('DB_HOST'),
            'user' => getenv('DB_USER'),
            'db' => getenv('DB_NAME')
        ],
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} 