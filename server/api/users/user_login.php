<?php
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
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    // Leggi i dati raw
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON: ' . json_last_error_msg());
    }

    // Validazione
    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception('Email e password sono obbligatori');
    }

    require_once '../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];

    // Cerca l'utente
    $stmt = $conn->prepare("SELECT id, email, password, company_name FROM users WHERE email = ?");
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

    // Verifica la password
    if (!password_verify($data['password'], $user['password'])) {
        throw new Exception('Credenziali non valide');
    }

    // Genera un token JWT o una sessione
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['company_name'] = $user['company_name'];

    // Rimuovi la password dai dati da inviare
    unset($user['password']);

    echo json_encode([
        'status' => 'success',
        'message' => 'Login effettuato con successo',
        'user' => $user
    ]);

} catch (Exception $e) {
    error_log("Errore nel login: " . $e->getMessage());
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?> 