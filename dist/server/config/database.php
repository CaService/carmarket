<?php
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    require __DIR__ . '/../vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
} else {
    error_log("File .env non trovato in: " . $envPath);
}

class Database {
    private $conn;

    public function connect() {
        try {
            // Log dei parametri di connessione (solo per debug)
            error_log("Tentativo di connessione al database con host: " . ($_ENV['DB_HOST'] ?? 'non definito'));
            error_log("Nome database: " . ($_ENV['DB_NAME'] ?? 'non definito'));
            error_log("Utente database: " . ($_ENV['DB_USER'] ?? 'non definito'));

            if (!isset($_ENV['DB_HOST']) || !isset($_ENV['DB_USER']) || !isset($_ENV['DB_PASS']) || !isset($_ENV['DB_NAME'])) {
                throw new Exception("Parametri di connessione al database mancanti nel file .env");
            }

            $this->conn = new mysqli(
                $_ENV['DB_HOST'],
                $_ENV['DB_USER'],
                $_ENV['DB_PASS'],
                $_ENV['DB_NAME']
            );

            if ($this->conn->connect_error) {
                error_log("Errore di connessione al database: " . $this->conn->connect_error);
                return [
                    "status" => "error",
                    "message" => "Connection failed: " . $this->conn->connect_error,
                    "connection" => null
                ];
            }

            return [
                "status" => "success",
                "message" => "Connected successfully to database",
                "connection" => $this->conn
            ];

        } catch (Exception $e) {
            error_log("Eccezione durante la connessione al database: " . $e->getMessage());
            return [
                "status" => "error",
                "message" => "Connection error: " . $e->getMessage(),
                "connection" => null
            ];
        }
    }

    public function getConnection() {
        return $this->conn;
    }
}

// Test della connessione se il file viene chiamato direttamente
if (basename($_SERVER['PHP_SELF']) == 'database.php') {
    $database = new Database();
    $result = $database->connect();
    header('Content-Type: application/json');
    echo json_encode($result);
}
?> 