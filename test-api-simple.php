<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple test to check if API is working
echo json_encode([
    'success' => true,
    'message' => 'API is working',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_NAME']
]);
?>
