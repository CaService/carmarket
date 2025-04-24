<?php
require '/home/carmarke/public_html/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/signup_errors.log');

error_log("=== Inizio richiesta email di registrazione ===");

try {
    // Verifica se PHPMailer è installato
    if (!file_exists('/home/carmarke/public_html/vendor/autoload.php')) {
        error_log("ERRORE: PHPMailer non è installato. Composer autoload.php non trovato.");
        throw new Exception("Configurazione email non disponibile sul server");
    }

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

    // Leggi i dati JSON inviati dal frontend
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Dati ricevuti: " . print_r($input, true));

    // Configurazione PHPMailer
    $mail = new PHPMailer(true);
    
    error_log("Configurazione SMTP...");
    
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = function($str, $level) {
        error_log("PHPMailer DEBUG: $str");
    };

    $mail->isSMTP();
    $mail->Host       = 'mail.carmarket-ayvens.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@carmarket-ayvens.com';
    $mail->Password   = '4sWQVuofhi7i';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    
    error_log("Impostazione mittente e destinatario...");
    $mail->setFrom('noreply@carmarket-ayvens.com', 'Carmarket Ayvens');
    $mail->addAddress('amministrazione@carmarket-ayvens.com', 'Amministrazione');
    
    $mail->isHTML(true);
    $mail->Subject = 'Nuova Registrazione Utente - Carmarket Ayvens';
    
    // Corpo dell'email in HTML
    $mail->Body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Nuova Registrazione Utente</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; }
            .header { background-color: #004165; padding: 20px; text-align: center; }
            .header h1 { color: white; margin: 0; }
            .content { padding: 20px; background: #f9f9f9; border-radius: 5px; }
            .footer { margin-top: 30px; font-size: 14px; color: #666; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nuova Registrazione Utente</h1>
            </div>
            <div class='content'>
                <h2 style='color: #004165;'>Dettagli Utente:</h2>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Paese:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['country']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Società:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['company_name']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Partita IVA:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['vat_number']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Indirizzo:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['address']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>CAP:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['postal_code']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Città:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['city']}</td>
                    </tr>
                    <tr>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'><strong>Email:</strong></td>
                        <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$input['email']}</td>
                    </tr>
                </table>
            </div>
            <div class='footer'>
                <p>Questa è una notifica automatica dal sistema di registrazione di Carmarket Ayvens.</p>
            </div>
        </div>
    </body>
    </html>";

    // Versione testuale
    $mail->AltBody = "
Nuova Registrazione Utente - Carmarket Ayvens

Dettagli Utente:
----------------
Paese: {$input['country']}
Società: {$input['company_name']}
Partita IVA: {$input['vat_number']}
Indirizzo: {$input['address']}
CAP: {$input['postal_code']}
Città: {$input['city']}
Email: {$input['email']}

Questa è una notifica automatica dal sistema di registrazione di Carmarket Ayvens.";

    error_log("Tentativo di invio email...");
    $mail->send();
    error_log("Email inviata con successo");
    
    echo json_encode(['status' => 'success', 'message' => 'Email di notifica inviata con successo']);

} catch (Exception $e) {
    $errorMessage = isset($mail) ? $mail->ErrorInfo : $e->getMessage();
    error_log("Errore nell'invio dell'email: " . $errorMessage);
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => "Impossibile inviare l'email: " . $errorMessage
    ]);
}

error_log("=== Fine richiesta email di registrazione ===");
?> 