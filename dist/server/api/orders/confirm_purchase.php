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
            .banner { background-color: #0F3549; padding: 20px; text-align: center; margin-bottom: 30px; }
            .banner img { max-width: 200px; height: auto; }
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
            <svg width='200' height='76' viewBox='0 0 200 76' fill='none' xmlns='http://www.w3.org/2000/svg' style='max-width: 200px; height: auto;'>
                <!-- Logo principale Ayvens -->
                <path d='M25.4242 32.9914C25.4242 37.2117 28.8444 40.632 33.0647 40.632H99.8502C104.071 40.632 107.491 37.2117 107.491 32.9914V25.3509H25.4242V32.9914Z' fill='white'/>
                <path d='M13.7113 15.8182H20.3773V0.631958H16.1266C16.1266 5.92156 15.2773 11.0481 13.7075 15.8182H13.7113Z' fill='white'/>
                <path d='M11.5082 0.631958L0 15.913C8.36477 15.913 15.2432 9.00052 15.2432 0.631958H11.5082Z' fill='white'/>
                <path d='M102.315 13.9375C100.73 13.9375 99.4483 13.073 99.2511 11.6927H96.521C96.7182 14.1764 98.8795 16.0912 102.341 16.0912C106.016 16.0912 107.491 13.9602 107.491 11.9544C107.491 7.37004 99.7251 8.65168 99.7251 6.03911C99.7251 5.13286 100.461 4.63234 101.924 4.63234C103.471 4.63234 104.381 5.36416 104.412 6.48275H107.013C106.903 3.8626 104.821 2.47858 101.977 2.47858C99.1336 2.47858 97.0708 3.98773 97.0708 6.3197C97.0708 10.832 104.723 9.46692 104.723 12.2084C104.723 13.2322 103.915 13.9375 102.315 13.9375Z' fill='white'/>
                <path d='M85.4109 9.08015C85.4109 6.59651 86.6357 4.84089 88.9715 4.84089C91.0304 4.84089 92.0618 6.09598 92.0618 8.60997V15.8182H94.8109V8.32179C94.8109 4.12803 92.604 2.48237 89.7602 2.48237C87.8984 2.48237 86.0214 3.49858 85.2744 4.98877V2.79709H82.6391V15.8182H85.4147V9.08015H85.4109Z' fill='white'/>
                <path d='M31.8969 16.095C33.6828 16.095 35.4688 15.3139 36.4433 13.8086V15.8182H39.1127V2.79709H36.4433V4.70059C35.5256 3.26728 33.6828 2.48237 31.8969 2.48237C28.579 2.48237 25.4166 4.96602 25.4166 9.2887C25.4166 13.6114 28.5752 16.095 31.8969 16.095Z' fill='white'/>
                <path d='M32.314 4.82572C34.4336 4.82572 36.4433 6.52825 36.4433 9.2887C36.4433 12.0492 34.4336 13.7517 32.314 13.7517C30.1943 13.7517 28.1316 12.1326 28.1316 9.2887C28.1316 6.44483 30.1412 4.82572 32.314 4.82572Z' fill='white'/>
                <path d='M74.1682 16.095C77.0045 16.095 79.3478 14.4646 80.11 11.8027H77.3685C76.9059 13.236 75.7342 13.7934 74.1644 13.7934C71.9424 13.7934 70.4939 12.1212 70.3422 10.0129H80.4474C80.4929 9.55792 80.5005 9.23183 80.5005 8.71235C80.5005 5.21628 77.9221 2.48237 74.1909 2.48237C70.1299 2.48237 67.6197 5.37933 67.6197 9.34179C67.6197 12.9895 70.0123 16.095 74.1644 16.095H74.1682Z' fill='white'/>
                <path d='M74.1682 4.65509C76.3712 4.65509 77.7211 6.11874 77.7628 8.05636H70.3991C70.5773 6.01636 71.9841 4.65509 74.1682 4.65509Z' fill='white'/>
                <path d='M62.5538 15.8144L67.396 2.7933H64.5862L60.9726 13.1677L57.359 2.7933H54.3824L59.2511 15.8144H62.55H62.5538Z' fill='white'/>
                <!-- Testo SOCIETE GENERALE GROUP -->
                <text x='50' y='65' fill='white' font-family='Arial' font-size='10' text-anchor='middle'>SOCIETE GENERALE GROUP</text>
            </svg>
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