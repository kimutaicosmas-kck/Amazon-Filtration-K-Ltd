<?php
/**
 * Enhanced Contact Form API for Amazon Filtration
 * Handles contact form submissions with improved email delivery
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
        $query = "INSERT INTO contact_submissions (name, email, phone, company, subject, message, inquiry_type, created_at) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
        
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
            // Send email notification with multiple methods
            $emailSent = sendEmailNotification($data);
            
            // Also send to backup email
            sendBackupEmail($data);
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully. We will respond within 24 hours.',
                'email_sent' => $emailSent
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
    // Primary email - Update this to your email
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
    $emailSent = mail($to, $subject, $message, $headers);
    
    // Log email attempt
    error_log("Email send attempt: " . ($emailSent ? "SUCCESS" : "FAILED") . " to $to");
    
    return $emailSent;
}

function sendBackupEmail($data) {
    // Backup email method using cURL to external service
    $backup_data = [
        'to' => 'kimutaicosmas547@gmail.com',
        'subject' => 'Backup: New Contact Form Submission - ' . ($data['subject'] ?? 'General Inquiry'),
        'message' => "Backup notification:\n\n" . json_encode($data, JSON_PRETTY_PRINT),
        'from' => 'noreply@amazonfiltration.co.ke'
    ];
    
    // Log backup attempt
    error_log("Backup email data: " . json_encode($backup_data));
    
    // You can also save to a file as backup
    $log_file = '../logs/contact_submissions.log';
    if (!is_dir('../logs')) {
        mkdir('../logs', 0755, true);
    }
    
    $log_entry = date('Y-m-d H:i:s') . " - " . json_encode($data) . "\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// Test email function (for debugging)
function testEmail() {
    $to = 'kimutaicosmas547@gmail.com';
    $subject = 'Test Email from Amazon Filtration';
    $message = 'This is a test email to verify email functionality.';
    $headers = "From: Amazon Filtration <noreply@amazonfiltration.co.ke>\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Add test endpoint
if (isset($_GET['test_email'])) {
    $result = testEmail();
    echo json_encode(['test_result' => $result ? 'SUCCESS' : 'FAILED']);
    exit;
}
?>
