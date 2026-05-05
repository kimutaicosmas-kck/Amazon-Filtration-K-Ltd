<?php
/**
 * Products API for Amazon Filtration
 * Handles CRUD operations for products
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// Get product ID from URL if present
// Debug: Log the URL parsing
error_log("Request URI: " . $request_uri);
error_log("Path: " . $path);
error_log("Path parts: " . print_r($path_parts, true));

// Check different possible positions for product ID
$product_id = null;
if (isset($path_parts[2])) {
    $product_id = (int)$path_parts[2];
} elseif (isset($path_parts[3])) {
    $product_id = (int)$path_parts[3];
} elseif (isset($_GET['id'])) {
    $product_id = (int)$_GET['id'];
}

error_log("Product ID extracted: " . $product_id);

switch ($method) {
    case 'GET':
        if ($product_id) {
            // Get single product
            getProduct($db, $product_id);
        } else {
            // Get all products
            getProducts($db);
        }
        break;
        
    case 'POST':
        // Create new product
        createProduct($db);
        break;
        
    case 'PUT':
        // Update product
        if ($product_id) {
            updateProduct($db, $product_id);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Product ID required for update']);
        }
        break;
        
    case 'DELETE':
        // Delete product
        if ($product_id) {
            deleteProduct($db, $product_id);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Product ID required for deletion']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getProducts($db) {
    try {
        $query = "SELECT * FROM products
                  WHERE status IN ('Active', 'active')
                     OR status IS NULL
                     OR TRIM(COALESCE(status, '')) = ''
                  ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $products = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'products' => $products,
            'count' => count($products)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch products: ' . $e->getMessage()]);
    }
}

function getProduct($db, $id) {
    try {
        $query = "SELECT * FROM products WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$id]);
        
        $product = $stmt->fetch();
        
        if ($product) {
            echo json_encode([
                'success' => true,
                'product' => $product
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch product: ' . $e->getMessage()]);
    }
}

function createProduct($db) {
    try {
        // Handle both JSON and FormData requests
        $data = [];
        
        // Check if it's a FormData request (multipart/form-data)
        if (strpos($_SERVER['CONTENT_TYPE'], 'multipart/form-data') !== false) {
            // FormData request (from React admin with image)
            $data = $_POST;
        } elseif ($_SERVER['CONTENT_TYPE'] === 'application/json') {
            // JSON request
            $data = json_decode(file_get_contents('php://input'), true);
        } else {
            // Default to POST data
            $data = $_POST;
        }
        
        // Validate required fields
        $required_fields = ['name', 'code', 'category', 'price'];
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Field '$field' is required"]);
                return;
            }
        }
        
        // Handle image upload
        $image_path = '';
        
        // Debug: Log what we're receiving
        error_log("Content-Type: " . $_SERVER['CONTENT_TYPE']);
        error_log("FILES data: " . print_r($_FILES, true));
        error_log("POST data: " . print_r($_POST, true));
        
        // Handle file upload from FormData (React admin)
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = '../uploads/';
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            
            $file_extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $file_name = uniqid() . '_' . time() . '.' . $file_extension;
            $upload_path = $upload_dir . $file_name;
            
            if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_path)) {
                $image_path = 'uploads/' . $file_name;
                error_log("Image uploaded successfully: " . $image_path);
            } else {
                error_log("Failed to move uploaded file");
            }
        } elseif (isset($data['image']) && is_string($data['image']) && !empty($data['image'])) {
            // If image is already a string path
            $image_path = $data['image'];
        } else {
            error_log("No image data received - FILES: " . (isset($_FILES['image']) ? 'exists' : 'not set') . ", POST: " . (isset($data['image']) ? 'exists' : 'not set'));
        }
        
        $query = "INSERT INTO products (name, code, category, price, description, image, specifications, applications, status) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            $data['name'],
            $data['code'],
            $data['category'],
            $data['price'],
            $data['description'] ?? '',
            $image_path,
            $data['specifications'] ?? '',
            $data['applications'] ?? '',
            $data['status'] ?? 'Active'
        ]);
        
        if ($result) {
            $product_id = $db->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'Product created successfully',
                'product_id' => $product_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create product']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create product: ' . $e->getMessage()]);
    }
}

function updateProduct($db, $id) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $query = "UPDATE products SET 
                  name = ?, code = ?, category = ?, price = ?, description = ?, 
                  image = ?, specifications = ?, applications = ?, status = ?
                  WHERE id = ?";
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            $data['name'],
            $data['code'],
            $data['category'],
            $data['price'],
            $data['description'] ?? '',
            $data['image'] ?? '',
            $data['specifications'] ?? '',
            $data['applications'] ?? '',
            $data['status'] ?? 'Active',
            $id
        ]);
        
        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Product updated successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update product']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update product: ' . $e->getMessage()]);
    }
}

function deleteProduct($db, $id) {
    try {
        // Debug logging
        error_log("Attempting to delete product with ID: " . $id);
        
        // Hard delete - actually remove the product
        $query = "DELETE FROM products WHERE id = ?";
        $stmt = $db->prepare($query);
        $result = $stmt->execute([$id]);
        
        $rowsAffected = $stmt->rowCount();
        error_log("Delete query executed. Rows affected: " . $rowsAffected);
        
        if ($result && $rowsAffected > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found or already deleted']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete product: ' . $e->getMessage()]);
    }
}
?>
