<?php
require_once '../../config/database.php';
require_once '../../config/cors.php';  

error_reporting(E_ALL);
ini_set('display_errors', 0); // Disabilita la visualizzazione degli errori ma continua a loggarli

header('Content-Type: application/json');
// ... altri headers CORS ...

try {
    // Log della richiesta
    error_log("Richiesta ricevuta in get_users.php");
    
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