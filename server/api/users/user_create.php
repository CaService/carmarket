<?php
// Abilita il reporting degli errori all'inizio del file
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers standardizzati
$allowedOrigins = [
    'http://localhost:5173',
    'https://carmarket-ayvens.com'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Gestisci la richiesta OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Log per debug
    error_log("Metodo richiesta: " . $_SERVER['REQUEST_METHOD']);
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    // Log dei dati ricevuti
    $input = file_get_contents('php://input');
    error_log("Dati ricevuti: " . $input);

    // Decodifica JSON
    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON: ' . json_last_error_msg());
    }

    // Connessione al database
    require_once '../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    // Verifica la connessione
    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database: " . $result['message']);
    }

    $conn = $result['connection'];
    
    // Validazione dati
    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception('Email e password sono obbligatori');
    }

    // Validazione lunghezza password
    if (strlen($data['password']) > 15) {
        throw new Exception('La password non può superare i 15 caratteri');
    }

    // Verifica se l'email esiste già
    $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$checkEmail) {
        throw new Exception("Errore nella preparazione della query: " . $conn->error);
    }
    
    $checkEmail->bind_param("s", $data['email']);
    $checkEmail->execute();
    $result = $checkEmail->get_result();
    
    if ($result->num_rows > 0) {
        throw new Exception('Email già registrata');
    }

    // Hash della password
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    // Preparazione query di inserimento
    $insertQuery = "INSERT INTO users (
        country, company_name, vat_number, 
        address, postal_code, city, 
        email, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($insertQuery);
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query di inserimento: " . $conn->error);
    }

    // Binding dei parametri
    $stmt->bind_param("ssssssss",
        $data['country'],
        $data['company_name'],
        $data['vat_number'],
        $data['address'],
        $data['postal_code'],
        $data['city'],
        $data['email'],
        $hashedPassword
    );

    // Esecuzione query
    if (!$stmt->execute()) {
        throw new Exception("Errore durante l'inserimento: " . $stmt->error);
    }

    // Risposta di successo
    echo json_encode([
        'status' => 'success',
        'message' => 'Utente registrato con successo',
        'user_id' => $conn->insert_id
    ]);

} catch (Exception $e) {
    error_log("Errore in user_create.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>