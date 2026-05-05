<?php
/**
 * Contact Form API for Amazon Filtration
 * Handles contact form submissions
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
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and message are required']);
            exit;
        }
        
        // Insert contact submission
        $query = "INSERT INTO contact_submissions (name, email, phone, company, subject, message, inquiry_type) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? '',
            $data['company'] ?? '',
            $data['subject'] ?? '',
            $data['message'],
            $data['inquiryType'] ?? 'general'
        ]);
        
        if ($result) {
            // Send email notification (optional)
            sendEmailNotification($data);
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully. We will respond within 24 hours.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to send message. Please try again.']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

function sendEmailNotification($data) {
    // Email configuration
    $to = 'kimutaicosmas547@gmail.com';
    $subject = 'New Contact Form Submission - ' . ($data['subject'] ?? 'General Inquiry');
    
    $message = "
    New contact form submission from Amazon Filtration website:
    
    Name: {$data['name']}
    Email: {$data['email']}
    Phone: " . ($data['phone'] ?? 'Not provided') . "
    Company: " . ($data['company'] ?? 'Not provided') . "
    Subject: " . ($data['subject'] ?? 'General Inquiry') . "
    Inquiry Type: " . ($data['inquiryType'] ?? 'general') . "
    
    Message:
    {$data['message']}
    
    ---
    Sent from Amazon Filtration website contact form
    Time: " . date('Y-m-d H:i:s');
    
    $headers = "From: noreply@amazonfiltration.co.ke\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    mail($to, $subject, $message, $headers);
}
?>
