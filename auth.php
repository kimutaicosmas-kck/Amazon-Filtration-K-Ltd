<?php
/**
 * Authentication API for Amazon Filtration Admin
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['username']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password are required']);
        exit;
    }
    
    try {
        $query = "SELECT id, username, password, email FROM admin_users WHERE username = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$data['username']]);
        
        $user = $stmt->fetch();
        
        if ($user && password_verify($data['password'], $user['password'])) {
            // Generate session token (simple implementation)
            $token = bin2hex(random_bytes(32));
            
            // Store token in session or database (for production, use proper session management)
            session_start();
            $_SESSION['admin_token'] = $token;
            $_SESSION['admin_user_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid username or password']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
