<?php
// Abilita il reporting degli errori all'inizio del file
error_reporting(E_ALL);
ini_set('display_errors', 0); // Non mostrare errori agli utenti in produzione
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/vehicle_errors.log'); // Assicurati che questa cartella sia scrivibile dal server web

// Log iniziale per debug
error_log("=== Nuova richiesta (vehicle_create - FormData) ===");
error_log("Data e ora: " . date('Y-m-d H:i:s'));
error_log("Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content-Type: " . (isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : 'none'));

// CORS headers
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

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Definisci il percorso base per i file PDF relativo alla root del documento web
// Modifica '/../../../public/static/pdf/' se la struttura delle cartelle è diversa
define('UPLOAD_DIR', __DIR__ . '/../../../dist/static/pdf/');  // Percorso fisico
define('PDF_BASE_URL', '/static/pdf/');  // URL relativo

// Aggiungi questo dopo la definizione di UPLOAD_DIR
if (!file_exists(UPLOAD_DIR)) {
    if (!mkdir(UPLOAD_DIR, 0775, true)) {
        error_log("Errore: Impossibile creare la directory " . UPLOAD_DIR);
        throw new Exception("Errore nella configurazione del server per l'upload");
    }
}

// Aggiungi definizione per il percorso delle immagini
define('IMAGE_UPLOAD_DIR', __DIR__ . '/../../../public/images/Vehicles/');
define('IMAGE_BASE_URL', '/images/Vehicles/');

try {
    // Verifica metodo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Metodo non permesso');
    }

    // Log dei dati POST e FILES ricevuti
    error_log("Dati POST: " . print_r($_POST, true));
    error_log("Dati FILES: " . print_r($_FILES, true));

    // --- Gestione Upload File PDF ---
    if (!isset($_FILES['pdfFile'])) {
        error_log("Nessun file PDF ricevuto in _FILES: " . print_r($_FILES, true));
        throw new Exception('File PDF non ricevuto');
    }

    if ($_FILES['pdfFile']['error'] !== UPLOAD_ERR_OK) {
        $errorCode = $_FILES['pdfFile']['error'];
        error_log("Errore upload PDF. Codice: " . $errorCode);
        error_log("Dettagli file: " . print_r($_FILES['pdfFile'], true));
        // Mappa codici errore comuni a messaggi più leggibili
        $uploadErrors = [
            UPLOAD_ERR_INI_SIZE   => "Il file caricato eccede la direttiva upload_max_filesize in php.ini.",
            UPLOAD_ERR_FORM_SIZE  => "Il file caricato eccede la direttiva MAX_FILE_SIZE specificata nel modulo HTML.",
            UPLOAD_ERR_PARTIAL    => "Il file è stato caricato solo parzialmente.",
            UPLOAD_ERR_NO_FILE    => "Nessun file è stato caricato.",
            UPLOAD_ERR_NO_TMP_DIR => "Manca una cartella temporanea.",
            UPLOAD_ERR_CANT_WRITE => "Impossibile scrivere il file su disco.",
            UPLOAD_ERR_EXTENSION  => "Un'estensione PHP ha fermato il caricamento del file.",
        ];
        $message = isset($uploadErrors[$errorCode]) ? $uploadErrors[$errorCode] : 'Errore sconosciuto durante il caricamento del file PDF.';
        error_log("Errore Upload: " . $message . " (Codice: $errorCode)");
        throw new Exception('Errore durante il caricamento del file PDF: ' . $message);
    }

    $pdfFile = $_FILES['pdfFile'];
    $fileTmpPath = $pdfFile['tmp_name'];
    $fileName = basename($pdfFile['name']); // basename per sicurezza
    $fileSize = $pdfFile['size'];

    // Verifica tipo MIME effettivo
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $fileType = $finfo->file($fileTmpPath);

    // Validazione file
    $allowedMimeTypes = ['application/pdf'];
    if (!in_array($fileType, $allowedMimeTypes)) {
        error_log("Tipo MIME non valido: " . $fileType);
        throw new Exception('Tipo di file non permesso. Caricare solo PDF.');
    }

    // Limite dimensione (es. 10MB)
    $maxFileSize = 10 * 1024 * 1024;
    if ($fileSize > $maxFileSize) {
        throw new Exception('File troppo grande. Limite massimo: 10MB.');
    }
    if ($fileSize === 0) {
        throw new Exception('Il file caricato è vuoto.');
    }


    // Crea un nome univoco per il file per evitare sovrascritture
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $newFileName = uniqid('vehicle_pdf_', true) . '.' . $fileExtension;
    $destinationPath = rtrim(UPLOAD_DIR, '/') . '/' . $newFileName; // Assicura uno slash singolo

    // Verifica se la directory di upload esiste ed è scrivibile
    if (!is_dir(UPLOAD_DIR)) {
        if (!mkdir(UPLOAD_DIR, 0775, true)) { // Prova a crearla ricorsivamente
             error_log("Errore critico: Impossibile creare la directory di upload: " . UPLOAD_DIR);
             throw new Exception('Errore interno del server: Setup directory upload fallito.');
        }
         error_log("Directory di upload creata: " . UPLOAD_DIR);
    } elseif (!is_writable(UPLOAD_DIR)) {
        error_log("Errore critico: La directory di upload non è scrivibile: " . UPLOAD_DIR);
        throw new Exception('Errore interno del server: permessi directory upload insufficienti.');
    }

    // Sposta il file caricato
    if (!move_uploaded_file($fileTmpPath, $destinationPath)) {
        error_log("Errore nello spostamento del file da '$fileTmpPath' a '$destinationPath'");
        throw new Exception('Errore durante il salvataggio del file PDF sul server.');
    }

    // L'URL relativo per accedere al file dal web
    $pdfUrl = rtrim(PDF_BASE_URL, '/') . '/' . $newFileName; // Assicura uno slash singolo
    error_log("File PDF salvato con successo in: " . $destinationPath);
    error_log("URL PDF relativo generato: " . $pdfUrl);

    // --- Gestione Upload Immagine ---
    if (!isset($_FILES['imageFile'])) {
        error_log("Nessun file immagine ricevuto in _FILES: " . print_r($_FILES, true));
        throw new Exception('File immagine non ricevuto');
    }

    if ($_FILES['imageFile']['error'] !== UPLOAD_ERR_OK) {
        $errorCode = $_FILES['imageFile']['error'];
        error_log("Errore upload immagine. Codice: " . $errorCode);
        throw new Exception('Errore durante il caricamento dell\'immagine');
    }

    $imageFile = $_FILES['imageFile'];
    $imageTmpPath = $imageFile['tmp_name'];
    $imageFileName = basename($imageFile['name']);

    // Verifica tipo MIME per l'immagine
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $imageType = $finfo->file($imageTmpPath);

    // Validazione tipo immagine
    $allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($imageType, $allowedImageTypes)) {
        throw new Exception('Tipo di immagine non permesso. Utilizzare JPEG, PNG o GIF.');
    }

    // Crea un nome univoco per l'immagine
    $imageExtension = strtolower(pathinfo($imageFileName, PATHINFO_EXTENSION));
    $newImageName = uniqid('vehicle_', true) . '.' . $imageExtension;
    $imageDestinationPath = rtrim(IMAGE_UPLOAD_DIR, '/') . '/' . $newImageName;

    // Verifica/crea directory per le immagini
    if (!is_dir(IMAGE_UPLOAD_DIR)) {
        if (!mkdir(IMAGE_UPLOAD_DIR, 0775, true)) {
            throw new Exception('Errore nella creazione della directory per le immagini');
        }
    }

    // Sposta l'immagine
    if (!move_uploaded_file($imageTmpPath, $imageDestinationPath)) {
        throw new Exception('Errore durante il salvataggio dell\'immagine');
    }

    // URL relativo dell'immagine per il database
    $imageUrl = rtrim(IMAGE_BASE_URL, '/') . '/' . $newImageName;

    // --- Accesso ai dati del form da $_POST ---
    $title = isset($_POST['title']) ? trim($_POST['title']) : null;
    $price = isset($_POST['price']) ? filter_var($_POST['price'], FILTER_VALIDATE_FLOAT) : null;
    $year = isset($_POST['year']) ? filter_var($_POST['year'], FILTER_VALIDATE_INT) : null;
    $mileage = isset($_POST['mileage']) ? filter_var($_POST['mileage'], FILTER_VALIDATE_INT) : null;
    $location = isset($_POST['location']) ? trim($_POST['location']) : null;
    $description = isset($_POST['description']) ? trim($_POST['description']) : null;
    $fuel = isset($_POST['fuel']) ? trim($_POST['fuel']) : null;
    $transmission = isset($_POST['transmission']) ? trim($_POST['transmission']) : null;
    $registrationDate = isset($_POST['registrationDate']) ? trim($_POST['registrationDate']) : null; // Validare formato data se necessario
    $countryCode = isset($_POST['countryCode']) ? trim($_POST['countryCode']) : 'IT';
    $auctionNumber = isset($_POST['auctionNumber']) ? trim($_POST['auctionNumber']) : null;


    // Validazione dei dati principali
    if (empty($title)) throw new Exception('Il titolo è obbligatorio');
    if ($price === false || $price < 0) throw new Exception('Il prezzo non è valido');
    if ($year === false || $year < 1900 || $year > date('Y') + 1) throw new Exception('Anno non valido');
    if ($mileage === false || $mileage < 0) throw new Exception('Chilometraggio non valido');
    if (empty($location)) throw new Exception('Località obbligatoria');
    if (empty($description)) throw new Exception('Descrizione obbligatoria');
    if (empty($fuel)) throw new Exception('Carburante obbligatorio');
    if (empty($transmission)) throw new Exception('Trasmissione obbligatoria');
    if (empty($registrationDate)) throw new Exception('Data immatricolazione obbligatoria');
    if (empty($auctionNumber)) throw new Exception('Numero asta obbligatorio');

    // Connessione al database
    require_once __DIR__ . '/../../config/database.php';
    $database = new Database();
    $db_result = $database->connect(); // Rinominato per evitare conflitto con $result

    if ($db_result['status'] !== 'success') {
        error_log("Errore di connessione al database: " . $db_result['message']);
        // Cancella il file caricato se la connessione al DB fallisce
        if (isset($destinationPath) && file_exists($destinationPath)) {
            unlink($destinationPath);
            error_log("File PDF caricato ($newFileName) cancellato a causa di errore connessione DB.");
        }
        throw new Exception("Errore di connessione al database: " . $db_result['message']);
    }
    $conn = $db_result['connection'];

    // Prepara la query
    $query = "INSERT INTO vehicles (
        title, price, year, mileage, location, description, 
        image_url, fuel, transmission, 
        registration_date, pdf_url, country_code, auction_number
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        $dbError = $conn->error;
        error_log("Errore nella preparazione della query: " . $dbError);
        // Cancella il file caricato
        if (isset($destinationPath) && file_exists($destinationPath)) {
            unlink($destinationPath);
             error_log("File PDF caricato ($newFileName) cancellato a causa di errore preparazione query.");
        }
        $conn->close();
        throw new Exception("Errore nella preparazione della query: " . $dbError);
    }

    // Bind dei parametri (controlla i tipi: s=string, d=double/float, i=integer)
    $stmt->bind_param(
        "sdiiissssssss", // Prezzo (d), Anno (i), Chilometraggio (i)
        $title,
        $price,
        $year,
        $mileage,
        $location,
        $description,
        $imageUrl,
        $fuel,
        $transmission,
        $registrationDate,
        $pdfUrl, // Inserisce l'URL relativo del PDF salvato
        $countryCode,
        $auctionNumber
    );

    error_log("Esecuzione query con parametri: title=$title, price=$price, year=$year, mileage=$mileage, pdfUrl=$pdfUrl ...");

    if (!$stmt->execute()) {
        $stmtError = $stmt->error;
        error_log("Errore nell'esecuzione della query: " . $stmtError);
        // Cancella il file caricato
        if (isset($destinationPath) && file_exists($destinationPath)) {
            unlink($destinationPath);
            error_log("File PDF caricato ($newFileName) cancellato a causa di errore esecuzione query.");
        }
        $stmt->close();
        $conn->close();
        throw new Exception("Errore nel salvataggio dei dati nel database: " . $stmtError);
    }

    $insertedId = $conn->insert_id;
    error_log("Query eseguita con successo. ID inserito: " . $insertedId);

    // Risposta di successo, includendo l'URL del PDF
    $response = [
        'status' => 'success',
        'message' => 'Veicolo aggiunto con successo',
        'vehicle_id' => $insertedId,
        'pdfUrl' => $pdfUrl, // Invia l'URL del PDF al frontend
        'imageUrl' => $imageUrl // Invia l'URL dell'immagine al frontend
    ];
    
    error_log("Invio risposta JSON di successo: " . json_encode($response));
    echo json_encode($response);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log("!!! ECCEZIONE GESTITA in vehicle_create.php: " . $e->getMessage());
    error_log("File: " . $e->getFile() . " Linea: " . $e->getLine());
    // Non loggare lo stack trace completo nel log principale se non necessario, ma può essere utile per debug
    // error_log("Stack trace: " . $e->getTraceAsString());

    // Imposta codice di stato HTTP appropriato (es. 400 per errori di input, 500 per errori server)
    // Se l'eccezione è dovuta a input non valido potresti usare 400
    if (!headers_sent()) { // Evita errori se gli header sono già stati inviati
        http_response_code(500); // Default a Internal Server Error
    }

    $errorResponse = [
        'status' => 'error',
        'message' => $e->getMessage() // Messaggio di errore per il frontend
    ];
    // Assicurati di inviare comunque una risposta JSON valida in caso di errore
    if (!headers_sent()) { // Controlla di nuovo prima di inviare l'echo
    echo json_encode($errorResponse);
    } else {
         error_log("Impossibile inviare risposta JSON di errore: headers già inviati.");
    }
}

// Log finale
error_log("=== Fine richiesta (vehicle_create - FormData) ===\n");
?> 