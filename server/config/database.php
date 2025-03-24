<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

class Database {
    private $conn;

    public function connect() {
        try {
            $this->conn = new mysqli(
                $_ENV['DB_HOST'],
                $_ENV['DB_USER'],
                $_ENV['DB_PASS'],
                $_ENV['DB_NAME']
            );

            if ($this->conn->connect_error) {
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