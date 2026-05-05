<?php
/**
 * Email Configuration Checker
 * This will help identify email delivery issues
 */

echo "<h2>Amazon Filtration Email Configuration Check</h2>";

// Check if we can send emails
$to = 'kimutaicosmas547@gmail.com';
$subject = 'Configuration Test - ' . date('Y-m-d H:i:s');
$message = "This is a configuration test email.\n\nTime: " . date('Y-m-d H:i:s') . "\nServer: " . $_SERVER['SERVER_NAME'];

$headers = "From: Amazon Filtration <noreply@amazonfiltration.co.ke>\r\n";
$headers .= "Reply-To: noreply@amazonfiltration.co.ke\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$result = mail($to, $subject, $message, $headers);

echo "<h3>Email Test Result</h3>";
echo "<p>Test email sent: " . ($result ? "<span style='color: green; font-weight: bold;'>SUCCESS</span>" : "<span style='color: red; font-weight: bold;'>FAILED</span>") . "</p>";

if ($result) {
    echo "<p style='color: green;'>✓ Email was sent successfully from the server</p>";
    echo "<p><strong>Next steps:</strong></p>";
    echo "<ol>";
    echo "<li>Check your email inbox: <strong>kimutaicosmas547@gmail.com</strong></li>";
    echo "<li>Check your spam/junk folder</li>";
    echo "<li>Wait 5-10 minutes for email delivery</li>";
    echo "<li>If still no email, the issue is with email delivery, not the server</li>";
    echo "</ol>";
} else {
    echo "<p style='color: red;'>✗ Email sending failed</p>";
    echo "<p><strong>Possible issues:</strong></p>";
    echo "<ul>";
    echo "<li>Server email configuration problem</li>";
    echo "<li>PHP mail() function disabled</li>";
    echo "<li>Sendmail not configured properly</li>";
    echo "</ul>";
}

// Check server configuration
echo "<h3>Server Configuration</h3>";
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_NAME'] . "</p>";
echo "<p><strong>Mail Function:</strong> " . (function_exists('mail') ? 'Available' : 'Not Available') . "</p>";
echo "<p><strong>Sendmail Path:</strong> " . ini_get('sendmail_path') . "</p>";

// Check if we can write to logs
$log_dir = '../logs';
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}

$log_file = $log_dir . '/email_test.log';
$log_entry = date('Y-m-d H:i:s') . " - Email test result: " . ($result ? 'SUCCESS' : 'FAILED') . "\n";
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);

echo "<p><strong>Log Entry Created:</strong> $log_file</p>";

// Provide troubleshooting steps
echo "<h3>Troubleshooting Steps</h3>";
echo "<ol>";
echo "<li><strong>Check Gmail Settings:</strong>";
echo "<ul>";
echo "<li>Go to Gmail → Settings → Filters and Blocked Addresses</li>";
echo "<li>Check if there are any filters blocking emails</li>";
echo "<li>Look for emails from 'noreply@amazonfiltration.co.ke'</li>";
echo "</ul>";
echo "</li>";

echo "<li><strong>Check Spam Folder:</strong>";
echo "<ul>";
echo "<li>Open Gmail</li>";
echo "<li>Click on 'Spam' folder</li>";
echo "<li>Look for emails from Amazon Filtration</li>";
echo "<li>If found, mark as 'Not Spam'</li>";
echo "</ul>";
echo "</li>";

echo "<li><strong>Try Different Email:</strong>";
echo "<ul>";
echo "<li>Test with a different email address</li>";
echo "<li>Use a different email provider (Yahoo, Outlook, etc.)</li>";
echo "</ul>";
echo "</li>";

echo "<li><strong>Contact Hosting Provider:</strong>";
echo "<ul>";
echo "<li>Ask about email delivery issues</li>";
echo "<li>Request email logs</li>";
echo "<li>Ask about SMTP configuration</li>";
echo "</ul>";
echo "</li>";
echo "</ol>";

// Create a simple test form
echo "<h3>Quick Test Form</h3>";
echo "<form method='post' style='border: 1px solid #ddd; padding: 15px; background: #f9f9f9;'>";
echo "<p><label><strong>Test Email Address:</strong><br>";
echo "<input type='email' name='test_email' value='kimutaicosmas547@gmail.com' style='width: 300px; padding: 5px;'></label></p>";
echo "<p><input type='submit' name='send_test' value='Send Test Email' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;'></p>";
echo "</form>";

if (isset($_POST['send_test'])) {
    $test_email = $_POST['test_email'];
    $test_subject = 'Manual Test Email - ' . date('H:i:s');
    $test_message = "This is a manual test email sent to: $test_email\nTime: " . date('Y-m-d H:i:s');
    
    $test_headers = "From: Amazon Filtration <noreply@amazonfiltration.co.ke>\r\n";
    $test_headers .= "Reply-To: noreply@amazonfiltration.co.ke\r\n";
    $test_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $test_result = mail($test_email, $test_subject, $test_message, $test_headers);
    
    echo "<div style='background: " . ($test_result ? '#d4edda' : '#f8d7da') . "; border: 1px solid " . ($test_result ? '#c3e6cb' : '#f5c6cb') . "; padding: 10px; margin: 10px 0;'>";
    echo "<p><strong>Manual Test Result:</strong> " . ($test_result ? "SUCCESS" : "FAILED") . "</p>";
    echo "<p>Email sent to: <strong>$test_email</strong></p>";
    echo "<p>Subject: <strong>$test_subject</strong></p>";
    echo "</div>";
}
?>
