<?php
class Database {
    private $conn;
    // Credenziali database hardcoded
    private $host = 'localhost:3306';
    private $db_name = 'carmarke_carmarket_db';
    private $username = 'carmarke_admin';
    private $password = 'n$Bt?ztXvNzt';

    public function connect() {
        try {
            // Log dei parametri di connessione (solo per debug)
            error_log("Tentativo di connessione al database con host: " . $this->host);
            error_log("Nome database: " . $this->db_name);
            error_log("Utente database: " . $this->username);

            $this->conn = new mysqli(
                $this->host,
                $this->username,
                $this->password,
                $this->db_name
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