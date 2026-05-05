<?php
/**
 * Database connection for Amazon Filtration
 * Compatible with Hostnali MySQL hosting.
 *
 * Optional local overrides: copy database.local.php.example to database.local.php
 * (same directory) and set XAMPP credentials — avoids changing production defaults.
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'amazonf1_amazon_filtration';
    private $username = 'amazonf1_amazon_admin';
    private $password = 'Kimutai@44!';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        $local = __DIR__ . '/database.local.php';
        if (is_readable($local)) {
            $override = require $local;
            if (is_array($override)) {
                foreach (['host', 'db_name', 'username', 'password'] as $key) {
                    if (array_key_exists($key, $override) && $override[$key] !== null) {
                        $this->{$key} = $override[$key];
                    }
                }
            }
        }

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
        } catch (PDOException $exception) {
            // Never echo here — API endpoints must return only JSON; plaintext breaks response.json() in the SPA.
            error_log('Amazon DB connection error: ' . $exception->getMessage());
        }

        return $this->conn;
    }
}

