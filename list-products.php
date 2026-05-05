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
    
    // Get all products
    $query = "SELECT id, name, code, price, image FROM products ORDER BY id DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $products = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'products' => $products,
        'count' => count($products)
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
