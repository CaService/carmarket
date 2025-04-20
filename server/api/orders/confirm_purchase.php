<?php
// Modifica gli header CORS
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

// Gestione richiesta OPTIONS per preflight CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/purchase_errors.log');

error_log("=== Inizio richiesta conferma acquisto ===");

try {
    // Leggi i dati JSON inviati dal frontend
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Dati ricevuti: " . print_r($input, true));

    // Validazione dei dati ricevuti
    if (
        !isset($input['userEmail']) || !filter_var($input['userEmail'], FILTER_VALIDATE_EMAIL) ||
        !isset($input['auctionNumber']) || empty($input['auctionNumber']) ||
        !isset($input['vehicleTitle']) || empty($input['vehicleTitle']) ||
        !isset($input['vehiclePrice']) || !is_numeric($input['vehiclePrice'])
    ) {
        throw new Exception('Dati mancanti o non validi.');
    }

    $to = $input['userEmail'];
    $subject = 'Conferma Acquisto Ordine #' . $input['auctionNumber'];
    
    // Intestazioni per l'email HTML
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Carmarket Ayvens <carmarke@carmarket-ayvens.com>\r\n";
    $headers .= "Reply-To: carmarke@carmarket-ayvens.com\r\n";
    
    // Log dei dettagli email
    error_log("Tentativo di invio email:");
    error_log("To: " . $to);
    error_log("Subject: " . $subject);
    error_log("Headers: " . print_r($headers, true));
    
    // Verifica se la funzione mail è disponibile
    if (!function_exists('mail')) {
        error_log("ERRORE: La funzione mail() non è disponibile sul server");
        throw new Exception("Configurazione email non disponibile sul server");
    }

    // Corpo dell'email in HTML
    $message = "
    <html>
    <head>
        <title>Conferma Acquisto</title>
    </head>
    <body>
        <h1>Conferma Acquisto</h1>
        <p>Gentile utente,</p>
        <p>Grazie per aver confermato l'acquisto per l'ordine <strong>#{$input['auctionNumber']}</strong>.</p>
        <p><strong>Dettagli Veicolo:</strong></p>
        <ul>
            <li>Titolo: {$input['vehicleTitle']}</li>
            <li>Prezzo: € {$input['vehiclePrice']}</li>
        </ul>
        <p>Riceverai ulteriori dettagli a breve.</p>
        <p>Cordiali saluti,<br>Il Team Carmarket Ayvens</p>
    </body>
    </html>
    ";

    // Invia l'email
    $mailSent = mail($to, $subject, $message, $headers);
    
    if ($mailSent) {
        error_log("mail() ha restituito true, ma verifica i log del mail server");
        echo json_encode(['status' => 'success', 'message' => 'Email di conferma inviata con successo.']);
    } else {
        error_log("ERRORE: mail() ha restituito false. Errore: " . error_get_last()['message']);
        throw new Exception("Impossibile inviare l'email: " . error_get_last()['message']);
    }

} catch (Exception $e) {
    error_log("Errore durante l'elaborazione della richiesta: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

error_log("=== Fine richiesta conferma acquisto ===");
?> 