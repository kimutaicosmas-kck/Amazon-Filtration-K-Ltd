<?php
/**
 * Database connection for Amazon Filtration
 * Compatible with Hostnali MySQL hosting and local XAMPP.
 *
 * Local: uses root with an empty password and database amazonf1_amazon_filtration
 * (create that DB in phpMyAdmin and import your SQL, or set DB_NAME / DB_USER / DB_PASS).
 * For CLI scripts without HTTP_HOST, set AMAZON_DB_LOCAL=1.
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        $this->applyConfig();
    }

    private function applyConfig() {
        if (getenv('DB_NAME')) {
            $this->host = getenv('DB_HOST') ?: 'localhost';
            $this->db_name = getenv('DB_NAME');
            $this->username = getenv('DB_USER') ?: 'root';
            $pass = getenv('DB_PASS');
            $this->password = $pass !== false ? $pass : '';
            return;
        }

        $hostHeader = $_SERVER['HTTP_HOST'] ?? '';
        $serverName = $_SERVER['SERVER_NAME'] ?? '';
        $docRoot = strtolower($_SERVER['DOCUMENT_ROOT'] ?? '');
        $isLocal = getenv('AMAZON_DB_LOCAL') === '1'
            || (stripos($hostHeader, 'localhost') !== false)
            || (stripos($hostHeader, '127.0.0.1') !== false)
            || in_array($serverName, ['localhost', '127.0.0.1'], true)
            || str_contains($docRoot, 'xampp')
            || str_contains($docRoot, 'wamp')
            || str_contains($docRoot, 'lampp');

        if ($isLocal) {
            $this->host = 'localhost';
            $this->db_name = 'amazonf1_amazon_filtration';
            $this->username = 'root';
            $this->password = '';
        } else {
            $this->host = 'localhost';
            $this->db_name = 'amazonf1_amazon_filtration';
            $this->username = 'amazonf1_amazon_admin';
            $this->password = 'Kimutai@44!';
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                )
            );
        } catch(PDOException $exception) {
            error_log('Database connection failed: ' . $exception->getMessage());
        }

        return $this->conn;
    }
}
?>
