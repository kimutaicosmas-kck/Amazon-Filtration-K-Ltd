# PHP Backend for Amazon Filtration

## 🚀 **Complete PHP + MySQL Backend Solution**

This is a production-ready PHP backend system designed specifically for Hostnali hosting.

## 📋 **Setup Instructions**

### **Step 1: Database Setup**

1. **Login to Hostnali cPanel**
2. **Go to phpMyAdmin**
3. **Create database** (if not exists): `amazonf1_amazon_filtration`
4. **Run the SQL script**: Copy and paste `create_tables.sql` into phpMyAdmin
5. **Verify tables created**: products, admin_users, contact_submissions

### **Step 2: Upload PHP Files**

1. **Upload all files** from `backend-php/` to your hosting
2. **Recommended structure**:
   ```
   public_html/
   ├── backend-php/
   │   ├── database.php
   │   ├── api/
   │   │   ├── products.php
   │   │   ├── auth.php
   │   │   └── contact.php
   │   └── create_tables.sql
   ```

### **Step 3: Configure Database**

1. **Edit `database.php`** with your Hostnali credentials:
   ```php
   private $db_name = 'amazonf1_amazon_filtration';
   private $username = 'amazonf1_amazon_filtration';
   private $password = 'your_mysql_password';
   ```

### **Step 4: Test the API**

1. **Test products API**: `https://amazonfiltration.co.ke/backend-php/api/products.php`
2. **Test contact API**: `https://amazonfiltration.co.ke/backend-php/api/contact.php`
3. **Test auth API**: `https://amazonfiltration.co.ke/backend-php/api/auth.php`

## 🔧 **API Endpoints**

### **Products API**

- **GET** `/backend-php/api/products.php` - Get all products
- **GET** `/backend-php/api/products.php/{id}` - Get single product
- **POST** `/backend-php/api/products.php` - Create product
- **PUT** `/backend-php/api/products.php/{id}` - Update product
- **DELETE** `/backend-php/api/products.php/{id}` - Delete product

### **Authentication API**

- **POST** `/backend-php/api/auth.php` - Admin login

### **Contact API**

- **POST** `/backend-php/api/contact.php` - Submit contact form

## 🛡️ **Security Features**

- ✅ **Password hashing** - Secure password storage
- ✅ **SQL injection protection** - Prepared statements
- ✅ **Input validation** - Required field checking
- ✅ **CORS headers** - Cross-origin request handling
- ✅ **Error handling** - Proper error responses

## 📊 **Database Schema**

### **Products Table**

```sql
- id (Primary Key)
- name (Product name)
- code (Product code)
- category (Product category)
- price (Product price)
- description (Product description)
- image (Image URL)
- specifications (Technical specs)
- applications (Use cases)
- status (Active/Inactive/Discontinued)
- created_at (Creation timestamp)
- updated_at (Update timestamp)
```

### **Admin Users Table**

```sql
- id (Primary Key)
- username (Admin username)
- password (Hashed password)
- email (Admin email)
- created_at (Creation timestamp)
```

### **Contact Submissions Table**

```sql
- id (Primary Key)
- name (Customer name)
- email (Customer email)
- phone (Customer phone)
- company (Customer company)
- subject (Message subject)
- message (Message content)
- inquiry_type (Type of inquiry)
- created_at (Submission timestamp)
```

## 🔄 **Frontend Integration**

### **Update React Components**

1. **Change API endpoints** from JSON files to PHP APIs
2. **Update ProductsPage.js** to use `/backend-php/api/products.php`
3. **Update AdminDashboard.js** to use PHP APIs
4. **Update ContactPage.js** to use `/backend-php/api/contact.php`

### **Example API Call**

```javascript
// Get products
const response = await fetch("/backend-php/api/products.php");
const data = await response.json();
console.log(data.products);

// Create product
const response = await fetch("/backend-php/api/products.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(productData),
});
```

## 🚀 **Benefits of PHP + MySQL**

### **Reliability**

- ✅ **Production-ready** - Used by millions of websites
- ✅ **Stable** - Mature technology with proven track record
- ✅ **Hostnali optimized** - Native support, no configuration needed

### **Performance**

- ✅ **Fast** - Optimized for web hosting
- ✅ **Scalable** - Can handle thousands of products
- ✅ **Efficient** - Low resource usage

### **Maintenance**

- ✅ **Easy backups** - cPanel backup tools work perfectly
- ✅ **Easy updates** - Standard web technologies
- ✅ **Easy debugging** - Well-documented and supported

### **Security**

- ✅ **Secure** - Built-in security features
- ✅ **Regular updates** - Security patches available
- ✅ **Best practices** - Industry standard implementation

## 📞 **Support**

If you need help with setup or have questions:

- **Email**: filterskenyaltd@gmail.com
- **Phone**: +254 720799363

This PHP backend will provide a much more reliable and scalable solution for your Amazon Filtration website!
