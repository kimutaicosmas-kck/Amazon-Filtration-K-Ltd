<?php
/**
 * Contact Form API for Amazon Filtration
 * Handles contact form submissions
 */

ini_set('display_errors', '0');
ini_set('html_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
});

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
        if (!is_array($data)) {
            $data = [];
        }
        
        // Validate required fields
        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and message are required']);
            exit;
        }

        ensureContactSubmissionsTable($db);
        
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
            // Send email notification (optional, should not block successful form submission)
            try {
                sendEmailNotification($data);
            } catch (Throwable $mailError) {
                error_log('Contact submission saved but email notification failed: ' . $mailError->getMessage());
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully. We will respond within 24 hours.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to send message. Please try again.']);
        }
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

function sendEmailNotification($data) {
    // Email configuration - Update this to your email
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
    
    // Enhanced headers for better email delivery
    $headers = "From: Amazon Filtration <noreply@amazonfiltration.co.ke>\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    
    // Send email with error handling
    $emailSent = @mail($to, $subject, $message, $headers);
    
    // Log email attempt
    error_log("Email send attempt: " . ($emailSent ? "SUCCESS" : "FAILED") . " to $to");
    
    return $emailSent;
}

function ensureContactSubmissionsTable($db) {
    $sql = "CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(100),
        subject VARCHAR(200),
        message TEXT NOT NULL,
        inquiry_type VARCHAR(50) DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_contact_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    $db->exec($sql);
}
?>
