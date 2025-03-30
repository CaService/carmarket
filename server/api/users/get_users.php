<?php
require_once '../../config/database.php';

// CORS headers standardizzati
header('Access-Control-Allow-Origin: https://carmarket.pages.dev');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expose-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];
    
    $query = "SELECT id, country, company_name, vat_number, address, postal_code, city, email 
             FROM users 
             ORDER BY id DESC";
    $result = $conn->query($query);
    
    if (!$result) {
        throw new Exception("Errore nell'esecuzione della query");
    }
    
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode([
        'status' => 'success',
        'data' => $users
    ]);

} catch (Exception $e) {
    error_log("Errore in get_users.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?> 