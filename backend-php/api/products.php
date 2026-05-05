<?php
/**
 * Products API for Amazon Filtration (PHP backend)
 * Handles CRUD operations for products
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-cache, no-store, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

require_once '../database.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Database connection failed']);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

$productId = null;
if (isset($_GET['id']) && ctype_digit((string)$_GET['id'])) {
  $productId = (int)$_GET['id'];
} else {
  foreach (array_reverse($pathParts) as $part) {
    if (ctype_digit($part)) {
      $productId = (int)$part;
      break;
    }
  }
}

switch ($method) {
  case 'GET':
    if ($productId) {
      getProduct($db, $productId);
    } else {
      getProducts($db);
    }
    break;
  case 'POST':
    if ($productId) {
      updateProduct($db, $productId);
    } else {
      createProduct($db);
    }
    break;
  case 'PUT':
    if ($productId) {
      updateProduct($db, $productId);
    } else {
      http_response_code(400);
      echo json_encode(['error' => 'Product ID required for update']);
    }
    break;
  case 'DELETE':
    if ($productId) {
      deleteProduct($db, $productId);
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
    $category = isset($_GET['category']) ? trim((string) $_GET['category']) : '';

    if ($category !== '') {
      $page = max(1, (int) ($_GET['page'] ?? 1));
      $perPage = min(100, max(1, (int) ($_GET['per_page'] ?? 12)));
      $offset = ($page - 1) * $perPage;
      $perInt = (int) $perPage;
      $offInt = (int) $offset;

      $where = "WHERE status = 'Active' AND category = ?";
      $stmt = $db->prepare("SELECT COUNT(*) FROM products $where");
      $stmt->execute([$category]);
      $total = (int) $stmt->fetchColumn();

      $sql = "SELECT * FROM products $where ORDER BY created_at DESC LIMIT $perInt OFFSET $offInt";
      $stmt = $db->prepare($sql);
      $stmt->execute([$category]);
      $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $totalPages = $perPage > 0 ? (int) ceil($total / $perPage) : 0;

      echo json_encode([
        'success' => true,
        'products' => $products,
        'total' => $total,
        'page' => $page,
        'per_page' => $perPage,
        'total_pages' => $totalPages,
        'category' => $category,
      ]);
      return;
    }

    $query = "SELECT * FROM products ORDER BY created_at DESC";
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

function parseRequestData() {
  $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
  if (strpos($contentType, 'multipart/form-data') !== false) {
    return $_POST;
  }
  if (strpos($contentType, 'application/json') !== false) {
    return json_decode(file_get_contents('php://input'), true);
  }
  return $_POST;
}

function handleImageUpload($data, $existingImage = '') {
  if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/../uploads/';
    if (!file_exists($uploadDir)) {
      mkdir($uploadDir, 0755, true);
    }

    $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $fileName = uniqid() . '_' . time() . '.' . $fileExtension;
    $uploadPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
      return 'uploads/' . $fileName;
    }
  }

  if (isset($data['image']) && is_string($data['image']) && !empty($data['image'])) {
    return $data['image'];
  }

  return $existingImage;
}

function createProduct($db) {
  try {
    $data = parseRequestData();

    $requiredFields = ['name', 'code', 'category', 'price'];
    foreach ($requiredFields as $field) {
      if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        return;
      }
    }

    $imagePath = handleImageUpload($data);

    $query = "INSERT INTO products (name, code, category, price, description, image, specifications, applications, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $db->prepare($query);
    $result = $stmt->execute([
      $data['name'],
      $data['code'],
      $data['category'],
      $data['price'],
      $data['description'] ?? '',
      $imagePath,
      $data['specifications'] ?? '',
      $data['applications'] ?? '',
      $data['status'] ?? 'Active'
    ]);

    if ($result) {
      $productId = $db->lastInsertId();
      echo json_encode([
        'success' => true,
        'message' => 'Product created successfully',
        'product_id' => $productId
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
    $data = parseRequestData();

    $requiredFields = ['name', 'code', 'category', 'price'];
    foreach ($requiredFields as $field) {
      if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        return;
      }
    }

    $existingImage = '';
    $stmt = $db->prepare("SELECT image FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if ($existing && isset($existing['image'])) {
      $existingImage = $existing['image'];
    }

    $imagePath = handleImageUpload($data, $existingImage);

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
      $imagePath,
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
    $query = "DELETE FROM products WHERE id = ?";
    $stmt = $db->prepare($query);
    $result = $stmt->execute([$id]);

    if ($result && $stmt->rowCount() > 0) {
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