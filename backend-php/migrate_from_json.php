<?php
/**
 * Migration script to move from JSON file system to MySQL database
 * Run this once to migrate existing products from products.json to MySQL
 */

require_once 'database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    die("Database connection failed");
}

// Read existing products from JSON file
$json_file = '../public/data/products.json';
if (!file_exists($json_file)) {
    die("Products JSON file not found");
}

$json_data = file_get_contents($json_file);
$data = json_decode($json_data, true);

if (!$data || !isset($data['products'])) {
    die("Invalid JSON data");
}

$products = $data['products'];
$migrated_count = 0;
$error_count = 0;

echo "<h2>Migrating Products from JSON to MySQL</h2>";

foreach ($products as $product) {
    try {
        // Check if product already exists
        $check_query = "SELECT id FROM products WHERE code = ?";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->execute([$product['code']]);
        
        if ($check_stmt->fetch()) {
            echo "<p>⚠️ Product '{$product['name']}' (Code: {$product['code']}) already exists, skipping...</p>";
            continue;
        }
        
        // Insert product
        $query = "INSERT INTO products (name, code, category, price, description, image, specifications, applications, status, created_at) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            $product['name'],
            $product['code'],
            $product['category'],
            $product['price'],
            $product['description'] ?? '',
            $product['image'] ?? '',
            $product['specifications'] ?? '',
            $product['applications'] ?? '',
            $product['status'] ?? 'Active',
            $product['created_at'] ?? date('Y-m-d H:i:s')
        ]);
        
        if ($result) {
            $migrated_count++;
            echo "<p>✅ Migrated: {$product['name']} (Code: {$product['code']})</p>";
        } else {
            $error_count++;
            echo "<p>❌ Failed to migrate: {$product['name']} (Code: {$product['code']})</p>";
        }
    } catch (Exception $e) {
        $error_count++;
        echo "<p>❌ Error migrating {$product['name']}: " . $e->getMessage() . "</p>";
    }
}

echo "<hr>";
echo "<h3>Migration Summary</h3>";
echo "<p><strong>Total products processed:</strong> " . count($products) . "</p>";
echo "<p><strong>Successfully migrated:</strong> {$migrated_count}</p>";
echo "<p><strong>Errors:</strong> {$error_count}</p>";

if ($migrated_count > 0) {
    echo "<p><strong>✅ Migration completed successfully!</strong></p>";
    echo "<p>You can now update your frontend to use the PHP API endpoints.</p>";
} else {
    echo "<p><strong>⚠️ No products were migrated. Please check the errors above.</strong></p>";
}
?>
