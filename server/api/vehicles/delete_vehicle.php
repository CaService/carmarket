<?php
// Abilita il reporting degli errori
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/vehicle_errors.log');

// CORS headers semplificati per sviluppo locale
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Log iniziale per debug
error_log("=== Nuova richiesta DELETE_VEHICLE ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Verifica metodo DELETE
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        throw new Exception('Metodo non permesso');
    }

    // Ottieni l'ID del veicolo da eliminare
    if (!isset($_GET['id'])) {
        throw new Exception('ID veicolo non specificato');
    }

    $vehicleId = intval($_GET['id']);
    
    // Connessione al database
    require_once '../../config/database.php';
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

    // Risposta di successo
    echo json_encode([
        'status' => 'success',
        'message' => 'Veicolo eliminato con successo'
    ]);

    $stmt->close();
    $conn->close();

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