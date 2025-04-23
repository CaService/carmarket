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
            <img src='data:image/png;base64,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f3eTHmG4FUpUBupZHpyyTzcn0Y58PZnlc67sjfI1t3JoPIaCh1qmkTd2nPNulIe8xTvQ4r9zWT63zgG00/xeS3tV8WHaoj8ZRcyemfz9YTTSaOXq+SL5njnn0o6IPTppe4thdF83ox2F+BDL5ut5RUd7tkdRugHdl61Rul3QM3QBEu6LctoEevkNIZPK2uQvCjLqWLBNPzkIhb1nueFNQL2aQ5AI/RWJ0jjU23ox8XDmFh8hvs5li8XoRz4N/dC3R2lkt0rO372Qw5rJ54uRUK9FfkqB+1A+D2gLSR4X0F4RJm3Vk8dYfmmrzjzjt3Wcs7t9DyHz089o97RbzEa5NWDZOYdx6EU5DWVtfA8aOayKzDs3IPPU08nfeesrnkE733Z3UqolSZvXpm3CWA2JZ2vBgY2T9rwJmaR2RYL9GPpOOu/Z2uhFspjlF/eYxLJJzU5B39FzyTWdlHMdo44F2/STO1AWutPJnxBaA5kGyvIVtBxZEbZAL4cfINPERCQkq6Af75Wohz0b2BLZPN+NftSnoDUGj0S979egF1GnDbyblZHIXFXiemYmx3UuDHwCMgOMR0K2MdkZI1dDo4Frkr+Hkenlvei6s/KOrINGNA+inm5rZPD95BrOTz67mfYSZ9egBZ+/kvy9SbJvizST0dZJezp75ScgE9nhSLS36jrmEuCz6N5cjZ6Ve5Lzno5s5/cCb0PP0MFonuJhZE45J2nbASj3dYu9qCcPy4hhwTb9pjWU/hb1ezccz7LD/zzuQQmvPooEah5aaaZlS941qe9Q9EN+O23hOyzZ9zBkJrgdLVcHyo39NBKNe1je1t4S7MeR7bmTy1AGw06+w7KC/T1kXvlX1KOdi3q989FLcVbXORcm7b6Edo/yCjQS2Tz5+0Ykrp3H3ZJcU2eu7w+iTIJbAC9B5qk/dZRPR5OZafUdi0YPB3Zd3/EsK9hfRvfuYNSrv5N2Vsw/0k4ZfAsyyeyftOEU9B1+JDnupuRetLLw7YYmSM9JPjuIdu7xS6gvRe6I4eRPZqTYGdmriy71FOMR4GOo12fMCoMF24wkq6De7YfQsL4sC5F72wlUj5Q0prFYsM1oMIS8PnZGNsct0QRft5vpw2h4fB0yK1xFfLFYY8Y0FmwzSExGE0pPoIm+fi4HZkzjsGAbY0xDcKSjMcY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0BAu2McY0hP8H4H66Bv9bQlcAAAAASUVORK5CYII=' alt='Ayvens Logo' style='max-width: 200px; height: auto;'>
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