<?php
// Abilita il reporting degli errori
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disattivato in produzione
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
    header('Access-Control-Allow-Credentials: true');
} else {
    // Opzionale: se l'origine non è permessa, non inviare l'header o invia un'origine specifica/nulla
    // header('Access-Control-Allow-Origin: https://carmarket-ayvens.com'); // O non inviare nulla
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); // Includi DELETE
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept'); // Assicurati Accept sia presente
header('Content-Type: application/json; charset=UTF-8');

// Log iniziale per debug
error_log("=== Nuova richiesta DELETE_VEHICLE ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);

// Gestisci la richiesta OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content - standard per preflight
    exit();
}

try {
    // Verifica metodo DELETE
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        http_response_code(405); // Method Not Allowed
        echo json_encode(['status' => 'error', 'message' => 'Metodo non permesso. Richiesto DELETE.']);
        exit();
    }

    // Ottieni l'ID del veicolo da eliminare
    if (!isset($_GET['id'])) {
        throw new Exception('ID veicolo non specificato');
    }

    $vehicleId = intval($_GET['id']);
    
    // Connessione al database
    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $result = $database->connect();

    if ($result['status'] !== 'success') {
        error_log("Errore di connessione al database: " . print_r($result, true));
        throw new Exception("Errore di connessione al database");
    }

    $conn = $result['connection'];

    // Prepara la query per eliminare il veicolo
    $query = "DELETE FROM vehicles WHERE id = ?";
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        error_log("Errore nella preparazione della query: " . $conn->error);
        throw new Exception("Errore nella preparazione della query");
    }

    $stmt->bind_param("i", $vehicleId);

    if (!$stmt->execute()) {
        error_log("Errore nell'esecuzione della query: " . $stmt->error);
        throw new Exception("Errore nell'eliminazione del veicolo");
    }

    // Verifica che il veicolo sia stato effettivamente eliminato
    if ($stmt->affected_rows === 0) {
        throw new Exception("Veicolo non trovato o già eliminato");
    }

    // --- Logica per eliminare file associati (immagine, PDF) ---
    // 1. Trova gli URL dei file prima di eliminare dal DB
    $findStmt = $conn->prepare("SELECT image_url, pdf_url FROM vehicles WHERE id = ?");
    if(!$findStmt) throw new Exception("Prepare find failed: " . $conn->error);
    $findStmt->bind_param("i", $vehicleId);
    if(!$findStmt->execute()) throw new Exception("Execute find failed: " . $findStmt->error);
    $fileResult = $findStmt->get_result();
    $fileRow = $fileResult->fetch_assoc();
    $findStmt->close();

    // 2. Elimina il record dal DB
    $deleteStmt = $conn->prepare("DELETE FROM vehicles WHERE id = ?");
    if (!$deleteStmt) throw new Exception("Prepare delete failed: " . $conn->error);
    $deleteStmt->bind_param("i", $vehicleId);

    if ($deleteStmt->execute()) {
        $affectedRows = $deleteStmt->affected_rows;
        $deleteStmt->close(); // Chiudi lo statement qui

        if ($affectedRows > 0) {
            // 3. Se il record è stato eliminato, prova a eliminare i file fisici
            if ($fileRow) {
                // Definisci la base path della root del sito (potrebbe servire una costante globale)
                $basePath = realpath(__DIR__ . '/../../../'); // Assumendo che l'API sia 3 livelli sotto la root

                if ($fileRow['image_url']) {
                    // Estrai il percorso relativo dall'URL completo
                    $imageUrlPath = parse_url($fileRow['image_url'], PHP_URL_PATH);
                    // Rimuovi il base path (es. /repositories/carmarket) se presente nell'URL salvato
                    $relativePath = str_replace('/repositories/carmarket', '', $imageUrlPath);
                    $imagePath = $basePath . $relativePath;
                    if (file_exists($imagePath)) {
                        unlink($imagePath); // Elimina file immagine
                        error_log("Deleted image file: " . $imagePath);
                    } else {
                         error_log("Image file not found for deletion: " . $imagePath);
                    }
                }
                if ($fileRow['pdf_url']) {
                     $pdfUrlPath = parse_url($fileRow['pdf_url'], PHP_URL_PATH);
                     $relativePath = str_replace('/repositories/carmarket', '', $pdfUrlPath);
                     $pdfPath = $basePath . $relativePath;
                     if (file_exists($pdfPath)) {
                        unlink($pdfPath); // Elimina file PDF
                        error_log("Deleted PDF file: " . $pdfPath);
                     } else {
                         error_log("PDF file not found for deletion: " . $pdfPath);
                     }
                }
            }
            echo json_encode(['status' => 'success', 'message' => 'Veicolo e file associati eliminati con successo.']);

        } else {
            // Nessuna riga eliminata, veicolo non trovato
            http_response_code(404); // Not Found
            echo json_encode(['status' => 'error', 'message' => 'Veicolo non trovato o già eliminato.']);
        }
    } else {
         $deleteStmt->close(); // Chiudi anche in caso di errore execute
        throw new Exception("Errore durante l'eliminazione del veicolo: " . $deleteStmt->error);
    }

} catch (Exception $e) {
    error_log("Errore in delete_vehicle.php: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

// Log finale
error_log("=== Fine richiesta DELETE_VEHICLE ===\n");
?> 