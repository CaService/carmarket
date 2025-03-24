<?php
require_once '../../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Metodo non permesso']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$database = new Database();
$conn = $database->connect()['connection'];

if (empty($data['user_id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'ID utente richiesto']);
    exit;
}

try {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $data['user_id']);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Utente eliminato con successo'
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Utente non trovato'
            ]);
        }
    } else {
        throw new Exception("Errore durante l'eliminazione");
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>