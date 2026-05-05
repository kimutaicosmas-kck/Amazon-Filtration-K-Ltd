<?php
/**
 * Test single product API
 */
header('Content-Type: application/json');

require_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get product ID from URL
$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;

$query = "SELECT * FROM products WHERE id = ?";
$stmt = $db->prepare($query);
$stmt->execute([$product_id]);
$product = $stmt->fetch();

if ($product) {
    echo json_encode([
        'success' => true,
        'product' => $product
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Product not found'
    ]);
}
?>
