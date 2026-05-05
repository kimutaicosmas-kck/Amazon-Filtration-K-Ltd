<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'backend-php/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
    
    // Test query
    $query = "SELECT COUNT(*) as count FROM products";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch();
    
    echo json_encode([
        'success' => true,
        'message' => 'Database connection working',
        'product_count' => $result['count'],
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
