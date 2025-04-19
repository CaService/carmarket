<?php
require_once __DIR__ . '/../../config/api_config.php';
setupAPI();

try {
    // Aggiungiamo debug all'inizio del file
    echo json_encode([
        'status' => 'debug',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'env_test' => [
            'file_exists' => file_exists(__DIR__ . '/../../.env'),
            'db_host' => getenv('DB_HOST'),
            'db_name' => getenv('DB_NAME'),
            'db_user' => getenv('DB_USER'),
            'current_dir' => __DIR__,
            'parent_dir' => dirname(__DIR__, 2)
        ]
    ]);
    exit;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    $input = file_get_contents('php://input');
    logError("Dati ricevuti in user_create: " . $input);

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON: ' . json_last_error_msg());
    }

    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        throw new Exception("Errore di connessione al database: " . $result['message']);
    }

    $conn = $result['connection'];
    
    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception('Email e password sono obbligatori');
    }

    if (strlen($data['password']) > 15) {
        throw new Exception('La password non può superare i 15 caratteri');
    }

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

    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $insertQuery = "INSERT INTO users (
        country, company_name, vat_number, 
        address, postal_code, city, 
        email, password
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($insertQuery);
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query di inserimento: " . $conn->error);
    }

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

    if (!$stmt->execute()) {
        throw new Exception("Errore durante l'inserimento: " . $stmt->error);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Utente registrato con successo',
        'user_id' => $conn->insert_id
    ]);

} catch (Exception $e) {
    logError("Errore in user_create.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Errore: ' . $e->getMessage(),
        'debug_info' => [
            'file' => __FILE__,
            'line' => __LINE__,
            'db_host' => getenv('DB_HOST'),
            'db_name' => getenv('DB_NAME'),
            'db_user' => getenv('DB_USER')
        ]
    ]);
}
?>