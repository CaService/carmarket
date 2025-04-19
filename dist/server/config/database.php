<?php
class Database {
    private $conn;
    // Credenziali database hardcoded
    private $host = 'localhost';
    private $db_name = 'carmarke_carmarket_db';
    private $username = 'root';
    private $password = '';

    public function connect() {
        try {
            // Log dettagliato pre-connessione
            error_log("=== Tentativo di connessione al database ===");
            error_log("Host: " . $this->host);
            error_log("Database: " . $this->db_name);
            error_log("Username: " . $this->username);
            error_log("PHP version: " . PHP_VERSION);
            error_log("MySQLi enabled: " . (extension_loaded('mysqli') ? 'yes' : 'no'));
            
            // Imposta error reporting per mysqli
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

            $this->conn = new mysqli(
                $this->host,
                $this->username,
                $this->password,
                $this->db_name
            );

            // Log post-connessione
            error_log("Connessione stabilita");
            error_log("Server info: " . $this->conn->server_info);
            error_log("Server version: " . $this->conn->server_version);

            // Imposta il charset
            if (!$this->conn->set_charset("utf8mb4")) {
                error_log("Error loading character set utf8mb4: " . $this->conn->error);
            } else {
                error_log("Character set corrente: " . $this->conn->character_set_name());
            }

            if ($this->conn->connect_error) {
                error_log("Errore di connessione dettagliato: " . $this->conn->connect_error);
                error_log("Errno: " . $this->conn->connect_errno);
                return [
                    "status" => "error",
                    "message" => "Connection failed: " . $this->conn->connect_error,
                    "errno" => $this->conn->connect_errno,
                    "connection" => null
                ];
            }

            return [
                "status" => "success",
                "message" => "Connected successfully to database",
                "server_info" => $this->conn->server_info,
                "connection" => $this->conn
            ];

        } catch (Exception $e) {
            error_log("=== Eccezione durante la connessione ===");
            error_log("Messaggio: " . $e->getMessage());
            error_log("File: " . $e->getFile());
            error_log("Linea: " . $e->getLine());
            error_log("Trace: " . $e->getTraceAsString());
            return [
                "status" => "error",
                "message" => "Connection error: " . $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine(),
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
    echo json_encode($result, JSON_PRETTY_PRINT);
}
?> 