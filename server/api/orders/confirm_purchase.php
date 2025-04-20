<?php

// Abilita CORS e imposta header JSON (adatta l'origine se necessario)
header("Access-Control-Allow-Origin: http://localhost:5173"); // La porta del tuo server Vite
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header('Content-Type: application/json');

// Gestione richiesta OPTIONS per preflight CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Includi l'autoloader di Composer per PHPMailer
require '../../vendor/autoload.php'; // Adatta il percorso se necessario

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Leggi i dati JSON inviati dal frontend
$input = json_decode(file_get_contents('php://input'), true);

// Validazione semplice dei dati ricevuti
if (
    !isset($input['userEmail']) || !filter_var($input['userEmail'], FILTER_VALIDATE_EMAIL) ||
    !isset($input['auctionNumber']) || empty($input['auctionNumber']) ||
    !isset($input['vehicleTitle']) || empty($input['vehicleTitle']) ||
    !isset($input['vehiclePrice']) || !is_numeric($input['vehiclePrice'])
) {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti o non validi.']);
    exit;
}

$userEmail = $input['userEmail'];
$auctionNumber = $input['auctionNumber'];
$vehicleTitle = $input['vehicleTitle'];
$vehiclePrice = $input['vehiclePrice'];

// --- Configurazione PHPMailer ---
// !! IMPORTANTE: NON mettere le credenziali direttamente qui in produzione.
//    Usa variabili d'ambiente o un file di configurazione sicuro.
define('SMTP_HOST', 'smtp.example.com');        // Sostituisci con l'host SMTP del tuo provider (es. smtp.gmail.com, o quello di itwebhost.info)
define('SMTP_PORT', 587);                      // Porta SMTP (587 per TLS, 465 per SSL)
define('SMTP_USERNAME', 'carmarke@carmarket-ayvens.com'); // Il tuo indirizzo email
define('SMTP_PASSWORD', 'LA_TUA_PASSWORD_EMAIL');   // La password del tuo account email
define('SMTP_SECURE', PHPMailer::ENCRYPTION_STARTTLS); // O PHPMailer::ENCRYPTION_SMTPS

$mail = new PHPMailer(true); // Abilita eccezioni

try {
    // Impostazioni Server SMTP
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8'; // Imposta la codifica

    // Mittente (dal tuo account)
    $mail->setFrom(SMTP_USERNAME, 'Carmarket Ayvens'); // Nome Mittente opzionale

    // Destinatario (dall'utente loggato)
    $mail->addAddress($userEmail);

    // Contenuto Email
    $mail->isHTML(true); // Imposta formato HTML
    $mail->Subject = 'Conferma Acquisto Ordine #' . $auctionNumber;
    $mail->Body    = "
        <h1>Conferma Acquisto</h1>
        <p>Gentile utente,</p>
        <p>Grazie per aver confermato l'acquisto per l'ordine <strong>#{$auctionNumber}</strong>.</p>
        <p><strong>Dettagli Veicolo:</strong></p>
        <ul>
            <li>Titolo: {$vehicleTitle}</li>
            <li>Prezzo: € {$vehiclePrice}</li>
        </ul>
        <p>Riceverai ulteriori dettagli a breve.</p>
        <p>Cordiali saluti,<br>Il Team Carmarket Ayvens</p>
    ";
    // Testo alternativo per client non-HTML
    $mail->AltBody = "Conferma Acquisto Ordine #{$auctionNumber}. Dettagli: {$vehicleTitle}, Prezzo: € {$vehiclePrice}. Grazie, Il Team Carmarket Ayvens";

    // Invia l'email
    $mail->send();

    // Risposta di successo al frontend
    echo json_encode(['status' => 'success', 'message' => 'Email di conferma inviata con successo.']);

} catch (Exception $e) {
    // Errore durante l'invio
    http_response_code(500); // Internal Server Error
    // Logga l'errore per debug (non mostrarlo direttamente all'utente in produzione)
    error_log("Errore PHPMailer: {$mail->ErrorInfo}");
    echo json_encode(['status' => 'error', 'message' => 'Impossibile inviare l\'email di conferma. Riprova più tardi.']);
}

?> 