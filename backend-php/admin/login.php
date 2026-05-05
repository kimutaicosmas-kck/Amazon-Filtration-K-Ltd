<?php
/**
 * Admin Authentication for Amazon Filtration
 * Custom credentials: Username: Cosmas, Password: Kimutai@44
 */

session_start();

// Check if user is already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    // User is logged in, continue to admin panel
    return;
}

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Your custom credentials
    if ($username === 'Cosmas' && $password === 'Kimutai@44') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Invalid username or password';
    }
}

// If not logged in, show login form
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazon Filtration - Admin Login</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-container { 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        .login-header { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .login-header h1 { 
            color: #1e40af; 
            margin: 0; 
            font-size: 28px;
        }
        .login-header p { 
            color: #64748b; 
            margin: 10px 0 0 0; 
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            color: #374151; 
            font-weight: 500;
        }
        .form-group input { 
            width: 100%; 
            padding: 12px; 
            border: 2px solid #e5e7eb; 
            border-radius: 8px; 
            font-size: 16px;
            transition: border-color 0.3s;
        }
        .form-group input:focus { 
            outline: none; 
            border-color: #1e40af; 
        }
        .btn-login { 
            width: 100%; 
            background: #1e40af; 
            color: white; 
            padding: 12px; 
            border: none; 
            border-radius: 8px; 
            font-size: 16px; 
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn-login:hover { 
            background: #1e3a8a; 
        }
        .error { 
            background: #fef2f2; 
            color: #dc2626; 
            padding: 12px; 
            border-radius: 8px; 
            margin-bottom: 20px;
            border: 1px solid #fecaca;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🏭 Amazon Filtration</h1>
            <p>Admin Panel Login</p>
        </div>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" name="login" class="btn-login">Login</button>
        </form>
        
        <div class="footer">
            <p>© 2024 Amazon Filtration (K) Ltd</p>
        </div>
    </div>
</body>
</html>
