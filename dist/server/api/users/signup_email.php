<?php
require_once '../../../vendor/autoload.php';
require_once '../../../config/cors.php';
require_once '../../../config/smtp.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Gestione CORS
cors();

// Ricezione e decodifica dei dati JSON
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Dati non validi']);
    exit;
}

try {
    $mail = new PHPMailer(true);
    
    // Configurazione del server SMTP
    setupSMTP($mail);
    
    // Impostazioni email
    $mail->setFrom('noreply@carmarket-ayvens.com', 'Carmarket Ayvens');
    $mail->addAddress('amministrazione@carmarket-ayvens.com', 'Amministrazione');
    
    $mail->isHTML(true);
    $mail->Subject = 'Nuova Registrazione Utente - Carmarket Ayvens';
    
    // Creazione del corpo HTML dell'email
    $htmlBody = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background-color: #004165; padding: 20px; text-align: center;'>
            <h1 style='color: white; margin: 0;'>Nuova Registrazione Utente</h1>
        </div>
        <div style='padding: 20px; background-color: #f5f5f5;'>
            <h2 style='color: #004165;'>Dettagli Utente:</h2>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Paese:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['country']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Società:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['company_name']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Partita IVA:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['vat_number']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Indirizzo:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['address']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>CAP:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['postal_code']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Città:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['city']}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Email:</strong></td>
                    <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$data['email']}</td>
                </tr>
            </table>
        </div>
        <div style='padding: 20px; text-align: center; color: #666;'>
            <p>Questa è una notifica automatica dal sistema di registrazione di Carmarket Ayvens.</p>
        </div>
    </div>
    ";
    
    $textBody = "
    Nuova Registrazione Utente - Carmarket Ayvens
    
    Dettagli Utente:
    ----------------
    Paese: {$data['country']}
    Società: {$data['company_name']}
    Partita IVA: {$data['vat_number']}
    Indirizzo: {$data['address']}
    CAP: {$data['postal_code']}
    Città: {$data['city']}
    Email: {$data['email']}
    ";
    
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    
    $mail->send();
    
    echo json_encode(['status' => 'success', 'message' => 'Email di notifica inviata con successo']);
    
} catch (Exception $e) {
    error_log("Errore nell'invio dell'email di notifica: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Errore nell\'invio dell\'email di notifica']);
}
?> 