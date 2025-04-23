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
            <svg width='200' height='76' viewBox='0 0 108 41' fill='none' xmlns='http://www.w3.org/2000/svg' style='max-width: 200px; height: auto;'>
                <path d='M25.4242 32.9914C25.4242 37.2117 28.8444 40.632 33.0647 40.632H99.8502C104.071 40.632 107.491 37.2117 107.491 32.9914V25.3509H25.4242V32.9914Z' fill='white'/>
                <path d='M13.7113 15.8182H20.3773V0.631958H16.1266C16.1266 5.92156 15.2773 11.0481 13.7075 15.8182H13.7113Z' fill='white'/>
                <path d='M11.5082 0.631958L0 15.913C8.36477 15.913 15.2432 9.00052 15.2432 0.631958H11.5082Z' fill='white'/>
                <path d='M102.315 13.9375C100.73 13.9375 99.4483 13.073 99.2511 11.6927H96.521C96.7182 14.1764 98.8795 16.0912 102.341 16.0912C106.016 16.0912 107.491 13.9602 107.491 11.9544C107.491 7.37004 99.7251 8.65168 99.7251 6.03911C99.7251 5.13286 100.461 4.63234 101.924 4.63234C103.471 4.63234 104.381 5.36416 104.412 6.48275H107.013C106.903 3.8626 104.821 2.47858 101.977 2.47858C99.1336 2.47858 97.0708 3.98773 97.0708 6.3197C97.0708 10.832 104.723 9.46692 104.723 12.2084C104.723 13.2322 103.915 13.9375 102.315 13.9375Z' fill='white'/>
                <path d='M88.8653 18.8365V20.9865H90.7005V20.6301H89.2634V18.8327H88.8653V18.8365Z' fill='white'/>
                <path d='M92.9377 19.193V18.8365H90.9811V20.9865H93.006V20.6301H91.3793V20.0689H92.5927V19.7124H91.3793V19.193H92.9377Z' fill='white'/>
                <path d='M102.683 18.8365V20.1144C102.683 20.6528 103.088 21.051 103.767 21.051C104.446 21.051 104.852 20.6604 104.852 20.1144V18.8365H104.454V20.0689C104.454 20.4291 104.234 20.6794 103.767 20.6794C103.301 20.6794 103.081 20.4253 103.081 20.0689V18.8365H102.683Z' fill='white'/>
                <path d='M86.0518 20.9865H86.4802L86.7267 20.4632H87.887L88.1335 20.9865H88.562L87.5116 18.8365H87.0945L86.048 20.9865H86.0518Z' fill='white'/>
                <path d='M87.724 20.1144H86.8935L87.3107 19.2423L87.724 20.1144Z' fill='white'/>
                <path d='M106.759 18.8365H105.428V20.9865H105.826V20.2623H106.759C107.229 20.2623 107.525 20.0082 107.525 19.5646C107.525 19.1209 107.229 18.8327 106.759 18.8327V18.8365Z' fill='white'/>
                <path d='M106.782 19.9096H105.822V19.193H106.755C106.983 19.193 107.112 19.3636 107.112 19.5721C107.112 19.7655 106.983 19.9058 106.778 19.9058L106.782 19.9096Z' fill='white'/>
                <path d='M85.8735 19.5229C85.8735 19.1171 85.5892 18.8365 85.1303 18.8365H83.7463V20.9865H84.1445V20.194H84.7853L85.392 20.9865H85.8887L85.2517 20.1826C85.5892 20.1333 85.8698 19.9058 85.8698 19.5191L85.8735 19.5229Z' fill='white'/>
                <path d='M85.0886 19.8376H84.1483V19.193H85.1341C85.3578 19.193 85.4792 19.3181 85.4792 19.5229C85.4792 19.7087 85.3389 19.8376 85.0886 19.8376Z' fill='white'/>
                <path d='M99.7061 19.9096C99.7061 20.5921 100.275 21.0472 100.957 21.0472C101.64 21.0472 102.205 20.5921 102.205 19.9096C102.205 19.2271 101.644 18.7721 100.957 18.7721C100.271 18.7721 99.7061 19.2385 99.7061 19.9096Z' fill='white'/>
                <path d='M101.792 19.9096C101.792 20.3533 101.469 20.6832 100.957 20.6832C100.446 20.6832 100.119 20.3533 100.119 19.9096C100.119 19.466 100.461 19.1399 100.957 19.1399C101.454 19.1399 101.792 19.4773 101.792 19.9096Z' fill='white'/>
                <path d='M85.4109 9.08015C85.4109 6.59651 86.6357 4.84089 88.9715 4.84089C91.0304 4.84089 92.0618 6.09598 92.0618 8.60997V15.8182H94.8109V8.32179C94.8109 4.12803 92.604 2.48237 89.7602 2.48237C87.8984 2.48237 86.0214 3.49858 85.2744 4.98877V2.79709H82.6391V15.8182H85.4147V9.08015H85.4109Z' fill='white'/>
                <path d='M99.3459 19.5229C99.3459 19.1171 99.0615 18.8365 98.6027 18.8365H97.2225V20.9865H97.6206V20.194H98.2615L98.8681 20.9865H99.3649L98.7278 20.1826C99.0653 20.1333 99.3459 19.9058 99.3459 19.5191V19.5229Z' fill='white'/>
                <path d='M98.561 19.8376H97.6206V19.193H98.6027C98.8264 19.193 98.9478 19.3181 98.9478 19.5229C98.9478 19.7087 98.8075 19.8376 98.5572 19.8376H98.561Z' fill='white'/>
                <path d='M94.3824 19.9058C94.3824 20.5884 94.9246 21.0434 95.6451 21.0434C96.0129 21.0434 96.3921 20.9296 96.6613 20.7476V19.9134H96.2745V20.5391C96.1039 20.6187 95.8764 20.668 95.6603 20.668C95.1332 20.668 94.8033 20.3495 94.8033 19.9058C94.8033 19.4622 95.1294 19.1399 95.6565 19.1513C95.9864 19.1513 96.2366 19.2536 96.4338 19.4053L96.6461 19.0906C96.3731 18.8896 96.0622 18.7721 95.6451 18.7721C94.936 18.7721 94.3824 19.2385 94.3824 19.9058Z' fill='white'/>
                <path d='M57.0632 20.6718C56.7296 20.6718 56.4224 20.5921 56.0925 20.4063L55.9371 20.7438C56.3125 20.9448 56.6385 21.032 57.0594 21.032C57.7647 21.032 58.1174 20.7438 58.1174 20.3684C58.1174 19.4622 56.4035 19.8034 56.4035 19.3788C56.4035 19.2309 56.5968 19.1475 56.9798 19.1475C57.2452 19.1475 57.5372 19.2233 57.814 19.3446L57.9733 19.0223C57.6699 18.8707 57.3514 18.7872 56.9722 18.7872C56.3428 18.7872 55.9901 19.0413 55.9901 19.4053C55.9901 20.2547 57.7041 19.9058 57.7041 20.3722C57.7041 20.5504 57.4803 20.6718 57.0632 20.6718Z' fill='white'/>
                <path d='M46.7874 16.0875C48.7022 16.0875 50.018 15.0447 50.4806 14.1536V16.1671C50.4806 18.3853 49.8588 20.0689 47.4509 20.0689C45.6612 20.0689 44.7436 19.4849 44.3834 17.8772H41.5698C41.9338 20.6983 43.97 22.2757 47.1969 22.2757C51.5196 22.2757 53.1766 19.5873 53.1766 15.9851V2.79709H50.3782V9.47071C50.3782 12.1591 49.5023 13.7631 47.4092 13.7631C45.3161 13.7631 44.3303 12.47 44.3303 9.96365V2.80088H41.5129V10.1457C41.5129 14.62 43.97 16.0912 46.7874 16.0912V16.0875Z' fill='white'/>
                <path d='M62.6334 19.1475C62.9633 19.1475 63.2136 19.2574 63.4108 19.4091L63.6231 19.0944C63.3501 18.8934 63.0467 18.7721 62.6221 18.7721C61.9092 18.7721 61.3594 19.2385 61.3594 19.9058C61.3594 20.5732 61.9016 21.0434 62.6221 21.0434C63.0467 21.0434 63.369 20.9296 63.6383 20.7287L63.4259 20.4139C63.2287 20.5656 62.9671 20.6718 62.6372 20.6718C62.1102 20.6718 61.7803 20.3495 61.7803 19.9058C61.7803 19.4622 62.1064 19.1437 62.6296 19.1437L62.6334 19.1475Z' fill='white'/>
                <path d='M58.47 19.9134C58.47 20.5959 59.0388 21.051 59.7213 21.051C60.4038 21.051 60.9688 20.5959 60.9688 19.9134C60.9688 19.2309 60.4114 18.7759 59.7213 18.7759C59.0312 18.7759 58.47 19.2423 58.47 19.9134Z' fill='white'/>
                <path d='M60.5593 19.9134C60.5593 20.3571 60.237 20.6869 59.7251 20.6869C59.2132 20.6869 58.8833 20.3571 58.8833 19.9134C58.8833 19.4698 59.2246 19.1437 59.7251 19.1437C60.2256 19.1437 60.5593 19.4811 60.5593 19.9134Z' fill='white'/>
                <path d='M64.4838 20.9903V18.8403H64.0857V20.9903H64.4838Z' fill='white'/>
                <path d='M67.0282 19.1968V18.8403H65.0716V20.9903H67.1002V20.6339H65.4735V20.0727H66.6869V19.7162H65.4735V19.1968H67.032H67.0282Z' fill='white'/>
                <path d='M83.3027 20.6339H81.676V20.0727H82.8894V19.7162H81.676V19.1968H83.2344V18.8403H81.2779V20.9903H83.3027V20.6339Z' fill='white'/>
                <path d='M31.8969 16.095C33.6828 16.095 35.4688 15.3139 36.4433 13.8086V15.8182H39.1127V2.79709H36.4433V4.70059C35.5256 3.26728 33.6828 2.48237 31.8969 2.48237C28.579 2.48237 25.4166 4.96602 25.4166 9.2887C25.4166 13.6114 28.5752 16.095 31.8969 16.095Z' fill='white'/>
                <path d='M32.314 4.82572C34.4336 4.82572 36.4433 6.52825 36.4433 9.2887C36.4433 12.0492 34.4336 13.7517 32.314 13.7517C30.1943 13.7517 28.1316 12.1326 28.1316 9.2887C28.1316 6.44483 30.1412 4.82572 32.314 4.82572Z' fill='white'/>
                <path d='M74.1682 16.095C77.0045 16.095 79.3478 14.4646 80.11 11.8027H77.3685C76.9059 13.236 75.7342 13.7934 74.1644 13.7934C71.9424 13.7934 70.4939 12.1212 70.3422 10.0129H80.4474C80.4929 9.55792 80.5005 9.23183 80.5005 8.71235C80.5005 5.21628 77.9221 2.48237 74.1909 2.48237C70.1299 2.48237 67.6197 5.37933 67.6197 9.34179C67.6197 12.9895 70.0123 16.095 74.1644 16.095H74.1682Z' fill='white'/>
                <path d='M74.1682 4.65509C76.3712 4.65509 77.7211 6.11874 77.7628 8.05636H70.3991C70.5773 6.01636 71.9841 4.65509 74.1682 4.65509Z' fill='white'/>
                <path d='M62.5538 15.8144L67.396 2.7933H64.5862L60.9726 13.1677L57.359 2.7933H54.3824L59.2511 15.8144H62.55H62.5538Z' fill='white'/>
                <path d='M77.9827 19.193V18.8365H76.0262V20.9865H78.051V20.6301H76.4243V20.0689H77.6377V19.7124H76.4243V19.193H77.9827Z' fill='white'/>
                <path d='M80.2768 20.9865H80.6787V18.8365H80.2882V19.3977C80.2882 19.7162 80.2882 20.0461 80.3147 20.4518H80.3071L78.9042 18.8365H78.4946V20.9865H78.8852V20.4253C78.8852 20.2433 78.8852 19.6859 78.87 19.3712H78.8738L80.2692 20.9903L80.2768 20.9865Z' fill='white'/>
                <path d='M74.4601 19.1475C74.79 19.1475 75.0403 19.2498 75.2375 19.4015L75.4498 19.0868C75.1768 18.8858 74.8659 18.7683 74.4488 18.7683C73.7359 18.7683 73.1861 19.2347 73.1861 19.902C73.1861 20.5694 73.7283 21.0396 74.4488 21.0396C74.8204 21.0396 75.1958 20.9258 75.4688 20.7438V19.9096H75.082V20.5353C74.9114 20.6149 74.6877 20.6642 74.4677 20.6642C73.9407 20.6642 73.6108 20.3457 73.6108 19.902C73.6108 19.4584 73.9369 19.1361 74.4639 19.1475H74.4601Z' fill='white'/>
                <path d='M68.5639 20.9865V19.1892H69.4398V18.8365H67.2898V19.1892H68.1657V20.9865H68.5639Z' fill='white'/>
                <path d='M71.7414 19.193V18.8365H69.7848V20.9865H71.8134V20.6301H70.1868V20.0689H71.4001V19.7124H70.1868V19.193H71.7452H71.7414Z' fill='white'/>
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