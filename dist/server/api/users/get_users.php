<?php
require_once __DIR__ . '/../../config/api_config.php';
setupAPI();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        throw new Exception('Metodo non permesso');
    }

    require_once __DIR__ . '/../../config/database.php';
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
    logError("Errore in get_users.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Errore nel recupero degli utenti'
    ]);
}
?> 