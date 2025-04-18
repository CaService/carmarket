<?php
require_once __DIR__ . '/../../config/api_config.php';
setupAPI();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    $input = file_get_contents('php://input');
    logError("Tentativo di login ricevuto");

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON');
    }

    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];
    
    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception('Email e password sono obbligatori');
    }

    $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ?");
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query");
    }
    
    $stmt->bind_param("s", $data['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Credenziali non valide');
    }

    $user = $result->fetch_assoc();
    
    if (!password_verify($data['password'], $user['password'])) {
        throw new Exception('Credenziali non valide');
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Login effettuato con successo',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email']
        ]
    ]);

} catch (Exception $e) {
    logError("Errore in user_login.php: " . $e->getMessage());
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Credenziali non valide'
    ]);
}
?> 