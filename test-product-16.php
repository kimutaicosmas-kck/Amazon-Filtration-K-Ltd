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
    
    // Test product ID 16 specifically
    $id = 16;
    $query = "SELECT * FROM products WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$id]);
    
    $product = $stmt->fetch();
    
    if ($product) {
        echo json_encode([
            'success' => true,
            'product' => $product,
            'message' => 'Product 16 found'
        ]);
    } else {
        // Check what products exist
        $query = "SELECT id, name FROM products ORDER BY id DESC LIMIT 10";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $allProducts = $stmt->fetchAll();
        
        echo json_encode([
            'success' => false,
            'message' => 'Product 16 not found',
            'available_products' => $allProducts
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
