<?php
// server/config/api_config.php
function setupAPI() {
    // Configurazione ambiente
    $isProd = true; // In produzione sempre true
    
    // Configurazione errori
    error_reporting($isProd ? 0 : E_ALL);
    ini_set('display_errors', $isProd ? 0 : 1);
    
    // CORS
    $allowedOrigins = [
        'https://carmarket-ayvens.com'
    ];
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    if (in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    
    // Headers standard
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
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
}

function logError($message) {
    $logFile = __DIR__ . '/../logs/api_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    error_log("[$timestamp] $message\n", 3, $logFile);
}