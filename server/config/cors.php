<?php
// Abilita error reporting per il debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log dell'origine della richiesta per debug
error_log("Origin: " . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 'none'));

// In produzione, permetti solo carmarket.pages.dev
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: https://carmarket.pages.dev");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 3600");
    header("Vary: Origin");
}

// Gestisci le richieste preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Imposta il content type per JSON
header("Content-Type: application/json; charset=UTF-8"); 