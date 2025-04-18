<?php
// server/config/api_config.php

// Definizione costanti
define('BASE_PATH', '/repositories/carmarket');
define('IS_PRODUCTION', true);

function setupAPI() {
    // Configurazione ambiente
    $isProd = IS_PRODUCTION;
    
    // Configurazione errori
    error_reporting($isProd ? 0 : E_ALL);
    ini_set('display_errors', $isProd ? 0 : 1);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../logs/api_errors.log');
    
    // CORS
    $allowedOrigins = [
        'http://localhost:5173',
        'https://carmarket-ayvens.com',
        'https://carmarket-ayvens.com/repositories/carmarket'
    ];
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    if (in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    
    // Headers standard
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=UTF-8');
    
    // Headers di sicurezza
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    if ($isProd) {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }
    
    // Gestione OPTIONS
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Log della richiesta
    logError("=== Nuova richiesta API ===");
    logError("Method: " . $_SERVER['REQUEST_METHOD']);
    logError("URI: " . $_SERVER['REQUEST_URI']);
    logError("Origin: " . $origin);
}

function logError($message) {
    $logFile = __DIR__ . '/../logs/api_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    error_log("[$timestamp] $message\n", 3, $logFile);
}