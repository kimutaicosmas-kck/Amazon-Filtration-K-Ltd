<?php
/**
 * Admin Authentication Check
 * Custom credentials: Username: Cosmas, Password: Kimutai@44
 */
session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazon Filtration - Admin Panel</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #1e40af; margin: 0; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #1e40af; }
        .stat-number { font-size: 2em; font-weight: bold; color: #1e40af; }
        .stat-label { color: #64748b; margin-top: 5px; }
        .btn { background: #1e40af; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; margin: 5px; }
        .btn:hover { background: #1e3a8a; }
        .btn-success { background: #059669; }
        .btn-danger { background: #dc2626; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .table th { background: #f8fafc; font-weight: bold; }
        .status-active { color: #059669; font-weight: bold; }
        .status-inactive { color: #dc2626; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏭 Amazon Filtration - Admin Panel</h1>
            <p>Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?>! | 
               <a href="logout.php" style="color: #dc2626; text-decoration: none;">Logout</a>
            </p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number" id="total-products">-</div>
                <div class="stat-label">Total Products</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="active-products">-</div>
                <div class="stat-label">Active Products</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="total-contacts">-</div>
                <div class="stat-label">Contact Submissions</div>
            </div>
        </div>

        <div>
            <h2>Quick Actions</h2>
            <a href="products.php" class="btn">📦 Manage Products</a>
            <a href="contacts.php" class="btn">📧 View Contacts</a>
            <a href="settings.php" class="btn">⚙️ Settings</a>
            <a href="../api/products.php" class="btn btn-success" target="_blank">🔗 API Endpoint</a>
        </div>

        <div>
            <h2>Recent Products</h2>
            <table class="table" id="recent-products">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Products will be loaded here -->
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // Load dashboard data
        async function loadDashboard() {
            try {
                // Load products
                const productsResponse = await fetch('../api/products.php');
                const productsData = await productsResponse.json();
                
                if (productsData.success) {
                    const products = productsData.products;
                    document.getElementById('total-products').textContent = products.length;
                    document.getElementById('active-products').textContent = products.filter(p => p.status === 'Active').length;
                    
                    // Show recent products
                    const recentProducts = products.slice(0, 5);
                    const tbody = document.querySelector('#recent-products tbody');
                    tbody.innerHTML = recentProducts.map(product => `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.code}</td>
                            <td>${product.category}</td>
                            <td>Ksh ${parseFloat(product.price).toLocaleString()}</td>
                            <td class="status-${product.status.toLowerCase()}">${product.status}</td>
                            <td>${new Date(product.created_at).toLocaleDateString()}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        }

        // Load dashboard on page load
        loadDashboard();
    </script>
</body>
</html>
