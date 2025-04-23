<?php
require '/home/carmarke/public_html/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/purchase_errors.log');

error_log("=== Inizio richiesta conferma acquisto ===");

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

    // Validazione dei dati ricevuti
    if (
        !isset($input['userEmail']) || !filter_var($input['userEmail'], FILTER_VALIDATE_EMAIL) ||
        !isset($input['auctionNumber']) || empty($input['auctionNumber']) ||
        !isset($input['vehicleTitle']) || empty($input['vehicleTitle']) ||
        !isset($input['vehiclePrice']) || !is_numeric($input['vehiclePrice'])
    ) {
        throw new Exception('Dati mancanti o non validi.');
    }

    // Configurazione PHPMailer
    $mail = new PHPMailer(true);
    
    error_log("Configurazione SMTP...");
    
    // Debug più dettagliato
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
    
    // Aggiungiamo queste configurazioni per migliorare la deliverability
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->DKIM_domain = 'carmarket-ayvens.com';
    $mail->DKIM_private = '-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvXXxR... v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz/wyPweKieLkUGh1B60+tgUHyBodI9N8Ke8Kf1LVKCg8BUU0pkaKfAKQmsPrJVuRb24x9SkJ69t0q2z67hkIfWH5DPzkCg7A++mmvqwdqH1l+0gFV3FB7b+Aid8bQsmym2rnKUKE7trLJ3nVE/00ST0ftnWkcbZr2H8f2KwKQ1V6Ac/p7m6t/AJqlTXkLQbiXZmGMFWvpNX2t0+U8Xd4W43rsfdld2Lz1uzxpd2XqClL2/i6wWjjGic3TZNbig1EeXcAqJZmL05WeyetEJ+S8UOPLIFbncXVuIu6UqDNUV6kRspIjvSP6er6NXGoER0xuTaimCusFlzLaTdzB2gizwIDAQAB; ...rS7Q==
-----END RSA PRIVATE KEY-----'; // Chiave privata DKIM
    $mail->DKIM_selector = 'default';
    $mail->DKIM_passphrase = '';
    $mail->DKIM_identity = $mail->From;
    
    error_log("Impostazione mittente e destinatario...");
    $mail->setFrom('noreply@carmarket-ayvens.com', 'Carmarket Ayvens', true);
    $mail->addCustomHeader('List-Unsubscribe', '<mailto:unsubscribe@carmarket-ayvens.com>');
    $mail->addCustomHeader('Feedback-ID', 'carmarket-ayvens:purchase-confirmation');
    $mail->addReplyTo('info@carmarket-ayvens.com', 'Carmarket Ayvens Support');
    $mail->addAddress($input['userEmail']);
    $mail->addCC('vendite@carmarket-ayvens.com', 'Carmarket Ayvens Vendite');
    $mail->isHTML(true);
    $mail->Subject = 'Conferma Acquisto Ordine #' . $input['auctionNumber'];
    
    // Corpo dell'email in HTML con migliori pratiche anti-spam
    $mail->Body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Conferma Ordine</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .banner {
                background-color: #0F3549;
                padding: 20px;
                text-align: center;
                margin-bottom: 30px;
            }
            .banner img {
                max-width: 200px;
                height: auto;
                display: block;
                margin: 0 auto;
            }
            .banner-text {
                color: #FFFFFF !important;
                font-family: Arial, sans-serif;
                font-size: 12px;
                margin-top: 10px;
                text-align: center;
            }
            .header { text-align: center; margin-bottom: 30px; }
            .checkmark { font-size: 48px; margin-bottom: 20px; }
            .content { padding: 20px; }
            .order-table { width: 100%; background: #000; color: white; margin: 20px 0; }
            .order-table th { padding: 10px; text-align: left; }
            .order-table td { padding: 10px; background: white; color: #333; }
            .price-row { margin: 10px 0; }
            .address-section { display: flex; justify-content: space-between; margin-top: 30px; }
            .address-block { width: 48%; }
            .footer { margin-top: 30px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='banner'>
            <img src='https://carmarket-ayvens.com/public/images/logo-ayvens-white.png' alt='Ayvens' style='max-width: 200px; height: auto; display: block; margin: 0 auto;'>
            <div class='banner-text' style='color: #FFFFFF !important; font-family: Arial, sans-serif; font-size: 12px; margin-top: 10px; text-align: center;'>
                SOCIETE GENERALE GROUP
            </div>
        </div>
        <div class='container'>
            <div class='header'>
                <div class='checkmark'>✓</div>
                <h1>Conferma ordine</h1>
            </div>
            <div class='content'>
                <p>Congratulazioni! Acquisto completato.</p>

                <table class='order-table'>
                    <tr>
                        <th>Articolo</th>
                        <th>Prezzo</th>
                    </tr>
                    <tr>
                        <td>1 x {$input['vehicleTitle']}</td>
                        <td>€ {$input['vehiclePrice']},00</td>
                    </tr>
                </table>

                <div class='price-row'>
                    <strong>Importo totale</strong>
                    <span style='float: right'>€ {$input['vehiclePrice']},00</span>
                </div>
                <div class='price-row'>
                    <span>Incluso 22% IVA su € " . number_format($input['vehiclePrice']/1.22, 2, ',', '.') . "</span>
                    <span style='float: right'>€ " . number_format($input['vehiclePrice'] - ($input['vehiclePrice']/1.22), 2, ',', '.') . "</span>
                </div>

                <div style='margin: 30px 0;'>
                    <p><strong>Ordine #{$input['auctionNumber']}</strong></p>
                    
                    <p><strong>Metodo di pagamento:</strong><br>
                    Bonifico bancario.</p>

                    <p>Congratulazioni, avete concluso l'acquisto con successo.</p>
                    
                    <p style='color: #5b5bff;'>Riceverete comunicazione via e-mail con la fattura proforma per procedere al saldo</p>
                    
                    <p>Amministrazione acquisti veicoli</p>
                    <p><em>Ayvens Carmarket Buy Now</em></p>
                </div>

                <div class='address-section'>
                    <div class='address-block'>
                        <h3>Indirizzo di pagamento</h3>
                        <p>maurizio ballarin<br>
                        aerrecar s.r.l.<br>
                        VIA SAN FRANCESCO D&#039;ASSISI 60<br>
                        34133 TRIESTE TS<br>
                        Italia</p>
                        
                        <p>Email: f.ballarin@aerrecar.com<br>
                        Telefono: +39040637484<br>
                        IVA: IT00605220326<br>
                        Codice Fiscale: IT00605220326</p>
                    </div>
                    
                    <div class='address-block'>
                        <h3>Indirizzo di spedizione</h3>
                        <p>maurizio ballarin<br>
                        aerrecar s.r.l.<br>
                        VIA SAN FRANCESCO D&#039;ASSISI 60<br>
                        34133 TRIESTE TS<br>
                        Italia</p>
                    </div>
                </div>

                <div class='footer'>
                    <p><a href='#'>Visualizza il tuo ordine online</a> per aggiornamenti.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Aggiorna anche la versione testuale
    $mail->AltBody = "
Conferma ordine

Congratulazioni! Acquisto completato.

Articolo:
1 x {$input['vehicleTitle']}
Prezzo: € {$input['vehiclePrice']},00

Importo totale: € {$input['vehiclePrice']},00
Incluso 22% IVA su € " . number_format($input['vehiclePrice']/1.22, 2, ',', '.') . ": € " . number_format($input['vehiclePrice'] - ($input['vehiclePrice']/1.22), 2, ',', '.') . "

Ordine #{$input['auctionNumber']}

Metodo di pagamento:
Bonifico bancario.

Congratulazioni, avete concluso l'acquisto con successo.

Riceverete comunicazione via e-mail con la fattura proforma per procedere al saldo

Amministrazione acquisti veicoli
Ayvens Carmarket Buy Now

Indirizzo di pagamento:
maurizio ballarin
aerrecar s.r.l.
VIA SAN FRANCESCO D'ASSISI 60
34133 TRIESTE TS
Italia

Email: f.ballarin@aerrecar.com
Telefono: +39040637484
IVA: IT00605220326
Codice Fiscale: IT00605220326

Indirizzo di spedizione:
maurizio ballarin
aerrecar s.r.l.
VIA SAN FRANCESCO D'ASSISI 60
34133 TRIESTE TS
Italia

Visualizza il tuo ordine online per aggiornamenti.";

    error_log("Tentativo di invio email...");
    $mail->send();
    error_log("Email inviata con successo tramite PHPMailer");
    echo json_encode(['status' => 'success', 'message' => 'Email di conferma inviata con successo.']);

} catch (Exception $e) {
    $errorMessage = isset($mail) ? $mail->ErrorInfo : $e->getMessage();
    error_log("Errore nell'invio dell'email: " . $errorMessage);
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => "Impossibile inviare l'email: " . $errorMessage
    ]);
}

error_log("=== Fine richiesta conferma acquisto ===");
?> 