<?php
/**
 * Product order request — sends plain-text emails to admin and customer.
 * POST JSON: { "name": "...", "email": "...", "productId": 1, "quantity": 2 }
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../database.php';

$adminEmail = getenv('AMAZON_ORDER_ADMIN_EMAIL') ?: 'filterskenyaltd@gmail.com';
$fromLine = 'Amazon Filtration <noreply@amazonfiltration.co.ke>';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server temporarily unavailable. Please try again later.']);
    exit;
}

try {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
        exit;
    }

    $name = isset($data['name']) ? trim((string) $data['name']) : '';
    $email = isset($data['email']) ? trim((string) $data['email']) : '';
    $productId = isset($data['productId']) ? (int) $data['productId'] : 0;
    $quantity = isset($data['quantity']) ? (int) $data['quantity'] : 1;

    if ($name === '' || mb_strlen($name) > 200) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please enter your full name.']);
        exit;
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
        exit;
    }

    if ($productId <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid product.']);
        exit;
    }

    if ($quantity < 1 || $quantity > 999) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Quantity must be between 1 and 999.']);
        exit;
    }

    $stmt = $db->prepare('SELECT id, name, code, category, price, description, status FROM products WHERE id = ? LIMIT 1');
    $stmt->execute([$productId]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product || ($product['status'] ?? '') !== 'Active') {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Product not found or unavailable.']);
        exit;
    }

    $safePlain = static function ($s) {
        return str_replace(["\r", "\n", "\0"], [' ', ' ', ''], (string) $s);
    };

    $safeName = $safePlain($name);
    $safeEmail = $safePlain($email);
    $code = $safePlain($product['code']);
    $pname = $safePlain($product['name']);
    $cat = $safePlain($product['category']);
    $price = number_format((float) $product['price'], 0, '.', ',');
    $when = date('Y-m-d H:i:s T');

    $orderBlock = "Product code: {$code}\n"
        . "Product name: {$pname}\n"
        . "Category: {$cat}\n"
        . "Unit price (KES): {$price}/=\n"
        . "Quantity: {$quantity}\n"
        . "Line total (KES): " . number_format((float) $product['price'] * $quantity, 0, '.', ',') . "/=\n";

    $subjectAdmin = 'New product order: ' . $product['code'];
    $bodyAdmin = "A customer submitted an order request from the website.\n\n"
        . "Customer name: {$safeName}\n"
        . "Customer email: {$safeEmail}\n\n"
        . "--- Order ---\n{$orderBlock}\n"
        . "---\nTime: {$when}\n";

    $subjectClient = 'Your order request — Amazon Filtration (K) Ltd';
    $bodyClient = "Hello {$safeName},\n\n"
        . "Thank you. We received your order request with the following details:\n\n"
        . "{$orderBlock}\n"
        . "We will follow up using this email address: {$safeEmail}\n\n"
        . "If you did not submit this request, please ignore this message or contact us.\n\n"
        . "— Amazon Filtration (K) Ltd\n"
        . "Time: {$when}\n";

    $headersAdmin = "From: {$fromLine}\r\n"
        . "Reply-To: {$email}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "MIME-Version: 1.0\r\n"
        . 'X-Mailer: PHP/' . phpversion() . "\r\n";

    $headersClient = "From: {$fromLine}\r\n"
        . "Reply-To: {$adminEmail}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "MIME-Version: 1.0\r\n"
        . 'X-Mailer: PHP/' . phpversion() . "\r\n";

    $okAdmin = @mail($adminEmail, $subjectAdmin, $bodyAdmin, $headersAdmin);
    $okClient = @mail($email, $subjectClient, $bodyClient, $headersClient);

    if (!$okAdmin || !$okClient) {
        error_log('product-order mail: admin=' . ($okAdmin ? '1' : '0') . ' client=' . ($okClient ? '1' : '0'));
        http_response_code(503);
        echo json_encode([
            'success' => false,
            'error' => 'We could not send the confirmation emails. Please try again in a few minutes or call +254 714 752 613.',
        ]);
        exit;
    }

    try {
        $msg = "Product order (web)\n\n" . $orderBlock;
        $ins = $db->prepare(
            'INSERT INTO contact_submissions (name, email, phone, company, subject, message, inquiry_type) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $ins->execute([
            $name,
            $email,
            '',
            '',
            'Order: ' . $product['code'],
            $msg,
            'order',
        ]);
    } catch (Throwable $e) {
        error_log('product-order DB log: ' . $e->getMessage());
    }

    echo json_encode([
        'success' => true,
        'message' => 'Order confirmation was sent to your email and to our team.',
    ]);
} catch (Throwable $e) {
    error_log('product-order: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Something went wrong. Please try again.']);
}
