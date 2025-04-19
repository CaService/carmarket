<?php
require_once __DIR__ . '/../../config/api_config.php';
setupAPI();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        http_response_code(405);
        throw new Exception('Metodo non permesso');
    }

    if (!isset($_GET['id'])) {
        throw new Exception('ID utente non specificato');
    }

    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query");
    }

    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Utente eliminato con successo'
            ]);
        } else {
            http_response_code(404);
            throw new Exception('Utente non trovato');
        }
    } else {
        throw new Exception("Errore durante l'eliminazione");
    }

} catch (Exception $e) {
    logError("Errore in user_delete.php: " . $e->getMessage());
    if (http_response_code() === 200) {
        http_response_code(500);
    }
    echo json_encode([
        'status' => 'error',
        'message' => 'Operazione non riuscita'
    ]);
}
?>