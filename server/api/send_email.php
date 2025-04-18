<?php
require_once __DIR__ . '/../../config/api_config.php';
setupAPI();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

// Abilita il reporting degli errori
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/email_errors.log');

// CORS headers per sviluppo locale
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON');
    }

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $message = $data['message'] ?? '';

    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Tutti i campi sono obbligatori');
    }

    // Carica configurazione email da file esterno
    require_once __DIR__ . '/../../config/email_config.php';
    
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress(ADMIN_EMAIL, ADMIN_NAME);

    $mail->isHTML(true);
    $mail->Subject = 'Nuovo messaggio dal modulo di contatto';
    $mail->Body = "
        <h2>Nuovo messaggio da: $name</h2>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Messaggio:</strong><br>$message</p>
    ";

    $mail->send();
    echo json_encode([
        'status' => 'success',
        'message' => 'Email inviata con successo'
    ]);
    
} catch (Exception $e) {
    logError("Errore in send_email.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Errore nell\'invio dell\'email'
    ]);
}
?> 