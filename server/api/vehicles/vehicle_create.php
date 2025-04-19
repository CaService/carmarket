<?php
// Abilita il reporting degli errori all'inizio del file
error_reporting(E_ALL);
ini_set('display_errors', 0); // Non mostrare errori agli utenti in produzione
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/vehicle_errors.log'); // Assicurati che questa cartella sia scrivibile dal server web

// Log iniziale per debug
error_log("=== Nuova richiesta (vehicle_create - FormData) ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content-Type: " . (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 'none'));

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
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Definisci i percorsi corretti per il server di produzione
define('IMAGE_UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] . '/images/Vehicles/');
define('PDF_UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] . '/static/pdf/');

// Gestione dell'immagine
if (!isset($_FILES['imageFile'])) {
    error_log("Nessun file immagine ricevuto: " . print_r($_FILES, true));
    throw new Exception('File immagine non ricevuto');
}

$imageFile = $_FILES['imageFile'];
$imageName = uniqid('vehicle_', true) . '_' . basename($imageFile['name']);
$imageDestinationPath = IMAGE_UPLOAD_DIR . $imageName;

// Salva l'immagine
if (!move_uploaded_file($imageFile['tmp_name'], $imageDestinationPath)) {
    error_log("Errore nel salvare l'immagine in: " . $imageDestinationPath);
    throw new Exception('Errore nel salvataggio dell\'immagine');
}

// Genera l'URL relativo per il database
$imageUrl = '/images/Vehicles/' . $imageName;

// Gestione del PDF
if (!isset($_FILES['pdfFile'])) {
    error_log("Nessun file PDF ricevuto: " . print_r($_FILES, true));
    throw new Exception('File PDF non ricevuto');
}

$pdfFile = $_FILES['pdfFile'];
$pdfName = uniqid('vehicle_', true) . '_' . basename($pdfFile['name']);
$pdfDestinationPath = PDF_UPLOAD_DIR . $pdfName;

// Salva il PDF
if (!move_uploaded_file($pdfFile['tmp_name'], $pdfDestinationPath)) {
    error_log("Errore nel salvare il PDF in: " . $pdfDestinationPath);
    // Se fallisce il PDF, rimuovi anche l'immagine caricata
    if (file_exists($imageDestinationPath)) {
        unlink($imageDestinationPath);
    }
    throw new Exception('Errore nel salvataggio del PDF');
}

// Genera l'URL relativo per il database
$pdfUrl = '/static/pdf/' . $pdfName;

// --- Accesso ai dati del form da $_POST ---
$title = isset($_POST['title']) ? trim($_POST['title']) : null;
$price = isset($_POST['price']) ? filter_var($_POST['price'], FILTER_VALIDATE_FLOAT) : null;
$year = isset($_POST['year']) ? filter_var($_POST['year'], FILTER_VALIDATE_INT) : null;
$mileage = isset($_POST['mileage']) ? filter_var($_POST['mileage'], FILTER_VALIDATE_INT) : null;
$location = isset($_POST['location']) ? trim($_POST['location']) : null;
$description = isset($_POST['description']) ? trim($_POST['description']) : null;
$fuel = isset($_POST['fuel']) ? trim($_POST['fuel']) : null;
$transmission = isset($_POST['transmission']) ? trim($_POST['transmission']) : null;
$registrationDate = isset($_POST['registrationDate']) ? trim($_POST['registrationDate']) : null; // Validare formato data se necessario
$countryCode = isset($_POST['countryCode']) ? trim($_POST['countryCode']) : 'IT';
$auctionNumber = isset($_POST['auctionNumber']) ? trim($_POST['auctionNumber']) : null;


// Validazione dei dati principali
if (empty($title)) throw new Exception('Il titolo è obbligatorio');
if ($price === false || $price < 0) throw new Exception('Il prezzo non è valido');
if ($year === false || $year < 1900 || $year > date('Y') + 1) throw new Exception('Anno non valido');
if ($mileage === false || $mileage < 0) throw new Exception('Chilometraggio non valido');
if (empty($location)) throw new Exception('Località obbligatoria');
if (empty($description)) throw new Exception('Descrizione obbligatoria');
if (empty($fuel)) throw new Exception('Carburante obbligatorio');
if (empty($transmission)) throw new Exception('Trasmissione obbligatoria');
if (empty($registrationDate)) throw new Exception('Data immatricolazione obbligatoria');
if (empty($auctionNumber)) throw new Exception('Numero asta obbligatorio');

// Connessione al database
require_once __DIR__ . '/../../config/database.php';
$database = new Database();
$db_result = $database->connect(); // Rinominato per evitare conflitto con $result

if ($db_result['status'] !== 'success') {
    error_log("Errore di connessione al database: " . $db_result['message']);
    // Cancella il file caricato se la connessione al DB fallisce
    if (isset($pdfDestinationPath) && file_exists($pdfDestinationPath)) {
        unlink($pdfDestinationPath);
        error_log("File PDF caricato ($pdfName) cancellato a causa di errore connessione DB.");
    }
    if (isset($imageDestinationPath) && file_exists($imageDestinationPath)) {
        unlink($imageDestinationPath);
        error_log("Immagine caricata ($imageName) cancellata a causa di errore connessione DB.");
    }
    throw new Exception("Errore di connessione al database: " . $db_result['message']);
}
$conn = $db_result['connection'];

// Prepara la query
$query = "INSERT INTO vehicles (
    title, price, year, mileage, location, description, 
    image_url, fuel, transmission, 
    registration_date, pdf_url, country_code, auction_number
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($query);
if (!$stmt) {
    $dbError = $conn->error;
    error_log("Errore nella preparazione della query: " . $dbError);
    // Cancella il file caricato
    if (isset($pdfDestinationPath) && file_exists($pdfDestinationPath)) {
        unlink($pdfDestinationPath);
        error_log("File PDF caricato ($pdfName) cancellato a causa di errore preparazione query.");
    }
    if (isset($imageDestinationPath) && file_exists($imageDestinationPath)) {
        unlink($imageDestinationPath);
        error_log("Immagine caricata ($imageName) cancellata a causa di errore preparazione query.");
    }
    $conn->close();
    throw new Exception("Errore nella preparazione della query: " . $dbError);
}

// Bind dei parametri (controlla i tipi: s=string, d=double/float, i=integer)
$stmt->bind_param(
    "sdiiissssssss",
    $title,
    $price,
    $year,
    $mileage,
    $location,
    $description,
    $imageUrl,     // URL relativo dell'immagine
    $fuel,
    $transmission,
    $registrationDate,
    $pdfUrl,       // URL relativo del PDF
    $countryCode,
    $auctionNumber
);

error_log("Esecuzione query con parametri: title=$title, price=$price, year=$year, mileage=$mileage, pdfUrl=$pdfUrl ...");

if (!$stmt->execute()) {
    $stmtError = $stmt->error;
    error_log("Errore nell'esecuzione della query: " . $stmtError);
    // Cancella il file caricato
    if (isset($pdfDestinationPath) && file_exists($pdfDestinationPath)) {
        unlink($pdfDestinationPath);
        error_log("File PDF caricato ($pdfName) cancellato a causa di errore esecuzione query.");
    }
    if (isset($imageDestinationPath) && file_exists($imageDestinationPath)) {
        unlink($imageDestinationPath);
        error_log("Immagine caricata ($imageName) cancellata a causa di errore esecuzione query.");
    }
    $stmt->close();
    $conn->close();
    throw new Exception("Errore nel salvataggio dei dati nel database: " . $stmtError);
}

$insertedId = $conn->insert_id;
error_log("Query eseguita con successo. ID inserito: " . $insertedId);

// Risposta di successo, includendo l'URL del PDF
$response = [
    'status' => 'success',
    'message' => 'Veicolo aggiunto con successo',
    'vehicle_id' => $insertedId,
    'pdfUrl' => $pdfUrl, // Invia l'URL del PDF al frontend
    'imageUrl' => $imageUrl // Invia l'URL dell'immagine al frontend
];
    
error_log("Invio risposta JSON di successo: " . json_encode($response));
echo json_encode($response);

$stmt->close();
$conn->close();

// Log finale
error_log("=== Fine richiesta (vehicle_create - FormData) ===\n");
?> 