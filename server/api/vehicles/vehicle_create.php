<?php
// Abilita il reporting degli errori all'inizio del file
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/vehicle_errors.log');

// Log iniziale per debug
error_log("=== Nuova richiesta ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Origin: " . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 'none'));

// CORS headers semplificati per sviluppo locale
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Verifica metodo POST
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

    // Log dei dati decodificati
    error_log("Dati decodificati: " . print_r($data, true));

    // Validazione dei dati richiesti
    if (empty($data['title'])) {
        throw new Exception('Il titolo è obbligatorio');
    }
    if (!isset($data['price']) || !is_numeric($data['price'])) {
        throw new Exception('Il prezzo deve essere un numero valido');
    }

    // Connessione al database
    require_once '../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        error_log("Errore di connessione al database: " . print_r($result, true));
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];

    // Prepara la query
    $query = "INSERT INTO vehicles (
        title, price, year, mileage, location, description, 
        image_url, end_date, fuel, transmission, 
        registration_date, pdf_url, country_code, auction_number
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        error_log("Errore nella preparazione della query: " . $conn->error);
        throw new Exception("Errore nella preparazione della query");
    }

    // Estrai e valida i dati
    $endDate = !empty($data['endDate']) ? date('Y-m-d H:i:s', $data['endDate'] / 1000) : null;
    $mileage = isset($data['specs']['mileage']) ? $data['specs']['mileage'] : null;
    $fuel = isset($data['specs']['fuel']) ? $data['specs']['fuel'] : null;
    $transmission = isset($data['specs']['transmission']) ? $data['specs']['transmission'] : null;
    $registrationDate = isset($data['specs']['registrationDate']) ? $data['specs']['registrationDate'] : null;
    $pdfUrl = isset($data['pdf']['url']) ? $data['pdf']['url'] : null;

    // Bind dei parametri
    $stmt->bind_param(
        "sdisssssssssss",
        $data['title'],
        $data['price'],
        $data['year'],
        $mileage,
        $data['location'],
        $data['description'],
        $data['imageUrl'],
        $endDate,
        $fuel,
        $transmission,
        $registrationDate,
        $pdfUrl,
        $data['countryCode'],
        $data['auctionNumber']
    );

    // Log pre-esecuzione
    error_log("Query pronta per l'esecuzione");

    if (!$stmt->execute()) {
        error_log("Errore nell'esecuzione della query: " . $stmt->error);
        throw new Exception("Errore nell'esecuzione della query: " . $stmt->error);
    }

    // Log post-esecuzione
    error_log("Query eseguita con successo. ID inserito: " . $conn->insert_id);

    // Risposta di successo
    $response = [
        'status' => 'success',
        'message' => 'Veicolo aggiunto con successo',
        'vehicle_id' => $conn->insert_id
    ];
    
    error_log("Invio risposta: " . json_encode($response));
    echo json_encode($response);

} catch (Exception $e) {
    error_log("Errore in vehicle_create.php: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(500);
    $errorResponse = [
        'status' => 'error',
        'message' => $e->getMessage()
    ];
    echo json_encode($errorResponse);
}

// Log finale
error_log("=== Fine richiesta ===\n");
?> 