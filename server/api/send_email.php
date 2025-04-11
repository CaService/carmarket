<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Assicurati che il percorso sia corretto

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
    // Verifica metodo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    // Ottieni i dati dal corpo della richiesta
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Errore nella decodifica JSON: ' . json_last_error_msg());
    }

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $message = $data['message'] ?? '';

    // Configura PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Cambia con il tuo host SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'tuoindirizzo@gmail.com'; // Il tuo indirizzo email
    $mail->Password = 'tuapassword'; // La tua password o app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Imposta il mittente e il destinatario
    $mail->setFrom($email, 'Nome Mittente');
    $mail->addAddress('ca.management2025@proton.me', 'Admin');

    // Contenuto dell'email
    $mail->isHTML(true);
    $mail->Subject = 'Nuovo messaggio dal modulo di contatto';
    $mail->Body    = "Nome: $name<br>Email: $email<br>Messaggio: $message";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email inviata con successo']);
} catch (Exception $e) {
    error_log("Errore nell'invio dell'email: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Errore nell\'invio dell\'email: ' . $e->getMessage()]);
}
?> 