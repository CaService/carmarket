<?php
// Abilita il reporting degli errori all'inizio del file
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers standardizzati
header('Access-Control-Allow-Origin: https://carmarket.pages.dev');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expose-Headers: Content-Type');
header('Content-Type: application/json');

// Gestisci la richiesta OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Log per debug
    error_log("Metodo richiesta: " . $_SERVER['REQUEST_METHOD']);
    
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        throw new Exception('Metodo non permesso');
    }

    if (!isset($_GET['id'])) {
        throw new Exception('ID utente non specificato');
    }

    require_once '../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database: " . $result['message']);
    }

    $conn = $result['connection'];
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query: " . $conn->error);
    }

    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Utente eliminato con successo'
            ]);
        } else {
            throw new Exception('Utente non trovato');
        }
    } else {
        throw new Exception("Errore durante l'eliminazione: " . $stmt->error);
    }

} catch (Exception $e) {
    error_log("Errore nell'API delete: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>