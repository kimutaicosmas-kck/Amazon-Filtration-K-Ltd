<?php
/**
 * Debug Email Script for Amazon Filtration
 * This will help us find out why emails aren't being received
 */

echo "<h2>Email Debug Information</h2>";

// Check current email configuration
$to_email = 'kimutaicosmas547@gmail.com';
$from_email = 'noreply@amazonfiltration.co.ke';

echo "<h3>1. Email Configuration Check</h3>";
echo "<p><strong>To Email:</strong> $to_email</p>";
echo "<p><strong>From Email:</strong> $from_email</p>";

// Test with different email addresses
echo "<h3>2. Test Different Email Addresses</h3>";

$test_emails = [
    'kimutaicosmas547@gmail.com',
    'info@amazonfiltration.co.ke',
    'filterskenyaltd@gmail.com'
];

foreach ($test_emails as $email) {
    $subject = "Debug Test - $email - " . date('H:i:s');
    $message = "This is a debug test email sent to: $email\nTime: " . date('Y-m-d H:i:s');
    
    $headers = "From: Amazon Filtration <$from_email>\r\n";
    $headers .= "Reply-To: $from_email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $result = mail($email, $subject, $message, $headers);
    echo "<p>Test to <strong>$email</strong>: " . ($result ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";
}

// Test with different from addresses
echo "<h3>3. Test Different From Addresses</h3>";

$from_emails = [
    'noreply@amazonfiltration.co.ke',
    'info@amazonfiltration.co.ke',
    'admin@amazonfiltration.co.ke'
];

foreach ($from_emails as $from) {
    $subject = "Debug Test From - $from - " . date('H:i:s');
    $message = "This is a debug test email from: $from\nTime: " . date('Y-m-d H:i:s');
    
    $headers = "From: Amazon Filtration <$from>\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $result = mail($to_email, $subject, $message, $headers);
    echo "<p>Test from <strong>$from</strong>: " . ($result ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";
}

// Check server mail logs
echo "<h3>4. Server Mail Information</h3>";
echo "<p><strong>Sendmail Path:</strong> " . ini_get('sendmail_path') . "</p>";
echo "<p><strong>SMTP Host:</strong> " . ini_get('SMTP') . "</p>";
echo "<p><strong>SMTP Port:</strong> " . ini_get('smtp_port') . "</p>";

// Check if we can write to mail log
$mail_log = ini_get('mail.log');
echo "<p><strong>Mail Log:</strong> " . ($mail_log ? $mail_log : 'Not configured') . "</p>";

// Test contact form API directly
echo "<h3>5. Test Contact Form API</h3>";
echo "<p>Testing the contact form API directly...</p>";

$test_data = [
    'name' => 'Debug Test User',
    'email' => 'debug@example.com',
    'phone' => '+254 700 000 000',
    'company' => 'Debug Company',
    'subject' => 'Debug Test Subject',
    'message' => 'This is a debug test message from the contact form.',
    'inquiryType' => 'general'
];

// Simulate the contact form submission
$post_data = json_encode($test_data);
$url = 'https://amazonfiltration.co.ke/backend-php/api/contact.php';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p><strong>API Response:</strong> $response</p>";
echo "<p><strong>HTTP Code:</strong> $http_code</p>";

// Check error logs
echo "<h3>6. Check Error Logs</h3>";
$error_log_path = '/home2/amazonf1/public_html/backend-php/api/error_log';
if (file_exists($error_log_path)) {
    $error_log = file_get_contents($error_log_path);
    $recent_errors = array_slice(explode("\n", $error_log), -20); // Last 20 lines
    echo "<p><strong>Recent Error Log Entries:</strong></p>";
    echo "<pre style='background: #f5f5f5; padding: 10px; max-height: 200px; overflow-y: scroll;'>";
    foreach ($recent_errors as $error) {
        if (trim($error)) {
            echo htmlspecialchars($error) . "\n";
        }
    }
    echo "</pre>";
} else {
    echo "<p>Error log not found at: $error_log_path</p>";
}

// Alternative email methods
echo "<h3>7. Alternative Solutions</h3>";
echo "<p>If emails still don't work, try these alternatives:</p>";
echo "<ol>";
echo "<li><strong>Check Gmail Settings:</strong> Make sure emails aren't being filtered</li>";
echo "<li><strong>Check Spam Folder:</strong> Emails might be going to spam</li>";
echo "<li><strong>Use Different Email:</strong> Try a different email address</li>";
echo "<li><strong>Contact Hosting Provider:</strong> Ask about email configuration</li>";
echo "<li><strong>Use SMTP:</strong> Configure SMTP instead of PHP mail()</li>";
echo "</ol>";

// Create a simple contact form test
echo "<h3>8. Direct Contact Form Test</h3>";
echo "<form method='post' style='border: 1px solid #ccc; padding: 20px; margin: 20px 0;'>";
echo "<h4>Test Contact Form</h4>";
echo "<p><label>Name: <input type='text' name='test_name' value='Test User' required></label></p>";
echo "<p><label>Email: <input type='email' name='test_email' value='$to_email' required></label></p>";
echo "<p><label>Message: <textarea name='test_message' required>This is a test message from the debug form.</textarea></label></p>";
echo "<p><input type='submit' name='test_submit' value='Send Test Email' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 5px;'></p>";
echo "</form>";

if (isset($_POST['test_submit'])) {
    $name = $_POST['test_name'];
    $email = $_POST['test_email'];
    $message = $_POST['test_message'];
    
    $subject = "Direct Test Email from Debug Form";
    $email_message = "Name: $name\nEmail: $email\nMessage: $message\nTime: " . date('Y-m-d H:i:s');
    
    $headers = "From: Amazon Filtration <$from_email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $result = mail($to_email, $subject, $email_message, $headers);
    echo "<p><strong>Direct Test Result:</strong> " . ($result ? "<span style='color: green;'>SUCCESS</span>" : "<span style='color: red;'>FAILED</span>") . "</p>";
    echo "<p>Check your email inbox for: <strong>$subject</strong></p>";
}
?>
