<?php
// Abilita il reporting degli errori
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/vehicle_errors.log');

// CORS headers
$allowedOrigins = [
    'http://localhost:5173',
    'https://carmarket-ayvens.com',
    'https://carmarket-ayvens.com/repositories/carmarket'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Log iniziale per debug
error_log("=== Nuova richiesta GET_VEHICLES ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Origin: " . $origin);

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Verifica metodo GET
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        throw new Exception('Metodo non permesso');
    }

    // Connessione al database usando percorso assoluto
    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        error_log("Errore di connessione al database: " . print_r($result, true));
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];

    // Prepara la query
    $query = "SELECT * FROM vehicles ORDER BY id DESC";
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        error_log("Errore nella preparazione della query: " . $conn->error);
        throw new Exception("Errore nella preparazione della query");
    }

    if (!$stmt->execute()) {
        error_log("Errore nell'esecuzione della query: " . $stmt->error);
        throw new Exception("Errore nell'esecuzione della query");
    }

    $result = $stmt->get_result();
    $vehicles = [];

    // Formatta i dati
    while ($row = $result->fetch_assoc()) {
        $vehicles[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'price' => $row['price'],
            'year' => $row['year'],
            'imageUrl' => $row['image_url'],
            'location' => $row['location'],
            'description' => $row['description'],
            'specs' => [
                'mileage' => $row['mileage'],
                'registrationDate' => $row['registration_date'],
                'fuel' => $row['fuel'],
                'transmission' => $row['transmission'],
            ],
            'pdf' => [
                'url' => $row['pdf_url'],
            ],
            'countryCode' => $row['country_code'],
            'auctionNumber' => $row['auction_number'],
        ];
    }

    // Risposta di successo
    echo json_encode([
        'status' => 'success',
        'vehicles' => $vehicles
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log("Errore in get_vehicles.php: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

// Log finale
error_log("=== Fine richiesta GET_VEHICLES ===\n");
?> 