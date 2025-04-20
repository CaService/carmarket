<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

// Leggi i dati JSON inviati dal frontend
$input = json_decode(file_get_contents('php://input'), true);
error_log("Dati ricevuti: " . print_r($input, true));

// Validazione semplice dei dati ricevuti
if (
    !isset($input['userEmail']) || !filter_var($input['userEmail'], FILTER_VALIDATE_EMAIL) ||
    !isset($input['auctionNumber']) || empty($input['auctionNumber']) ||
    !isset($input['vehicleTitle']) || empty($input['vehicleTitle']) ||
    !isset($input['vehiclePrice']) || !is_numeric($input['vehiclePrice'])
) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti o non validi.']);
    exit;
}

try {
    $mail = new PHPMailer(true);
    
    // Configurazione Server
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  // Esempio con Gmail
    $mail->SMTPAuth   = true;
    $mail->Username   = 'tuo-email@gmail.com'; // Il tuo indirizzo email
    $mail->Password   = 'la-tua-password-app'; // Password dell'app Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    
    // Destinatari
    $mail->setFrom('noreply@carmarket-ayvens.com', 'Carmarket Ayvens');
    $mail->addAddress($input['userEmail']);
    
    // Contenuto
    $mail->isHTML(true);
    $mail->Subject = 'Conferma Acquisto Ordine #' . $input['auctionNumber'];
    $mail->Body    = "
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

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email di conferma inviata con successo.']);

} catch (Exception $e) {
    error_log("Errore nell'invio dell'email: " . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Impossibile inviare l\'email di conferma. Riprova più tardi.'
    ]);
}

error_log("=== Fine richiesta conferma acquisto ===");
?> 