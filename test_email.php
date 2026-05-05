<?php
/**
 * Email Test Script for Amazon Filtration
 * Use this to test if emails are working
 */

// Configuration
$to_email = 'kimutaicosmas547@gmail.com';
$from_email = 'noreply@amazonfiltration.co.ke';

echo "<h2>Amazon Filtration Email Test</h2>";

// Test 1: Basic PHP mail function
echo "<h3>Test 1: Basic PHP Mail Function</h3>";
$subject = 'Test Email from Amazon Filtration - ' . date('Y-m-d H:i:s');
$message = "This is a test email to verify that the contact form emails are working.\n\n";
$message .= "Time: " . date('Y-m-d H:i:s') . "\n";
$message .= "Server: " . $_SERVER['SERVER_NAME'] . "\n";
$message .= "PHP Version: " . phpversion() . "\n";

$headers = "From: Amazon Filtration <$from_email>\r\n";
$headers .= "Reply-To: $from_email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$result1 = mail($to_email, $subject, $message, $headers);
echo "<p>Result: " . ($result1 ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";

// Test 2: Enhanced headers
echo "<h3>Test 2: Enhanced Headers</h3>";
$subject2 = 'Enhanced Test Email from Amazon Filtration - ' . date('Y-m-d H:i:s');
$message2 = "This is an enhanced test email with better headers.\n\n";
$message2 .= "This should have better deliverability.\n";

$headers2 = "From: Amazon Filtration <$from_email>\r\n";
$headers2 .= "Reply-To: $from_email\r\n";
$headers2 .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers2 .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers2 .= "MIME-Version: 1.0\r\n";
$headers2 .= "X-Priority: 3\r\n";

$result2 = mail($to_email, $subject2, $message2, $headers2);
echo "<p>Result: " . ($result2 ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";

// Test 3: Contact form simulation
echo "<h3>Test 3: Contact Form Simulation</h3>";
$test_data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+254 700 000 000',
    'company' => 'Test Company',
    'subject' => 'Test Inquiry',
    'message' => 'This is a test message from the contact form.',
    'inquiryType' => 'general'
];

$subject3 = 'New Contact Form Submission - ' . $test_data['subject'];
$message3 = "
New contact form submission from Amazon Filtration website:

Name: {$test_data['name']}
Email: {$test_data['email']}
Phone: {$test_data['phone']}
Company: {$test_data['company']}
Subject: {$test_data['subject']}
Inquiry Type: {$test_data['inquiryType']}

Message:
{$test_data['message']}

---
Sent from Amazon Filtration website contact form
Time: " . date('Y-m-d H:i:s');

$headers3 = "From: Amazon Filtration <$from_email>\r\n";
$headers3 .= "Reply-To: {$test_data['email']}\r\n";
$headers3 .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers3 .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$result3 = mail($to_email, $subject3, $message3, $headers3);
echo "<p>Result: " . ($result3 ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";

// Server information
echo "<h3>Server Information</h3>";
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_NAME'] . "</p>";
echo "<p><strong>Mail Function:</strong> " . (function_exists('mail') ? 'Available' : 'Not Available') . "</p>";

// Check if mail function is working
if (function_exists('mail')) {
    echo "<p style='color: green;'>✓ PHP mail() function is available</p>";
} else {
    echo "<p style='color: red;'>✗ PHP mail() function is not available</p>";
}

// Check sendmail configuration
$sendmail_path = ini_get('sendmail_path');
echo "<p><strong>Sendmail Path:</strong> " . ($sendmail_path ? $sendmail_path : 'Not configured') . "</p>";

// Check SMTP settings
$smtp_host = ini_get('SMTP');
$smtp_port = ini_get('smtp_port');
echo "<p><strong>SMTP Host:</strong> " . ($smtp_host ? $smtp_host : 'Not configured') . "</p>";
echo "<p><strong>SMTP Port:</strong> " . ($smtp_port ? $smtp_port : 'Not configured') . "</p>";

echo "<h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>Check your email inbox (including spam folder) for the test emails</li>";
echo "<li>If no emails arrive, contact your hosting provider about email configuration</li>";
echo "<li>Consider using a third-party email service like SendGrid or Mailgun</li>";
echo "<li>Check server error logs for email-related errors</li>";
echo "</ol>";

echo "<h3>Troubleshooting:</h3>";
echo "<ul>";
echo "<li><strong>No emails received:</strong> Check spam folder, contact hosting provider</li>";
echo "<li><strong>PHP mail() not working:</strong> Server may not be configured for email</li>";
echo "<li><strong>Emails going to spam:</strong> Add SPF, DKIM records to your domain</li>";
echo "</ul>";

// Test the enhanced contact API
echo "<h3>Test Enhanced Contact API</h3>";
echo "<p><a href='backend-php/api/contact_enhanced.php?test_email=1' target='_blank'>Test Enhanced Contact API</a></p>";
?>
