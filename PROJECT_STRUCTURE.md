# Amazon Filtration (K) Ltd - Project Structure

## 📁 **Professional Project Organization**

```
amazon-filtration-website/
├── 📁 src/                          # React Frontend Source Code
│   ├── 📁 components/               # Reusable UI Components
│   │   ├── ErrorBoundary.js        # Error handling component
│   │   ├── Footer.js               # Site footer
│   │   ├── LoadingSpinner.js       # Loading states
│   │   ├── Logo.js                 # Company logo component
│   │   └── Navbar.js               # Navigation bar
│   ├── 📁 pages/                   # Page Components
│   │   ├── AboutPage.js            # About us page
│   │   ├── AdminDashboard.js       # Admin panel dashboard
│   │   ├── AdminLogin.js           # Admin login page
│   │   ├── AdminProductForm.js     # Product management form
│   │   ├── ContactPage.js          # Contact page
│   │   ├── HomePage.js             # Homepage
│   │   ├── IndustriesPage.js       # Industries served
│   │   ├── NotFoundPage.js         # 404 error page
│   │   ├── ProductsPage.js         # Products catalog
│   │   ├── ServicesPage.js         # Company services
│   │   ├── SupportPage.js          # Support & resources
│   │   └── VisionPage.js           # Company vision
│   ├── 📁 services/                # Business Logic Services
│   │   └── emailService.js         # Email integration
│   ├── App.js                      # Main React app
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── 📁 public/                      # Static Assets
│   ├── 📁 images/                  # Image Assets
│   │   ├── 📁 about/               # About page images
│   │   ├── 📁 industries/          # Industry images
│   │   ├── 📁 services/            # Service images
│   │   ├── 📁 support/             # Support page images
│   │   ├── 📁 team/                # Team member photos
│   │   └── [product images]        # Product photos
│   ├── favicon.svg                 # Site favicon
│   ├── index.html                  # HTML template
│   ├── logo.svg                    # Company logo
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # SEO robots file
│   └── sitemap.xml                 # SEO sitemap
├── 📁 backend/                     # Django Backend (Optional)
│   ├── 📁 amazon_filtration/       # Django project
│   ├── 📁 api/                     # API endpoints
│   └── manage.py                   # Django management
├── 📄 Configuration Files
│   ├── package.json                # Node.js dependencies
│   ├── package-lock.json           # Dependency lock file
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config
│   ├── netlify.toml                # Netlify deployment config
│   └── .netlifyignore              # Netlify ignore file
├── 📄 Documentation
│   ├── README.md                   # Project documentation
│   ├── EMAIL_INTEGRATION_GUIDE.md  # Email setup guide
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── setup.md                    # Setup instructions
├── 📄 Environment & Build
│   ├── env.example                 # Environment variables template
│   ├── build-production.js         # Production build script
│   └── requirements.txt            # Python dependencies
└── 📄 Git & Deployment
    ├── .gitignore                  # Git ignore rules
    └── .netlifyignore              # Netlify ignore rules
```

## 🎯 **Key Features**

### **Frontend (React + Tailwind CSS)**
- ✅ **Modern Component Architecture** - Reusable, maintainable components
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Professional UI/UX** - Clean, industrial design
- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
- ✅ **Performance Optimized** - Lazy loading, code splitting

### **Backend (Django - Optional)**
- ✅ **RESTful API** - Clean API endpoints
- ✅ **Database Models** - Products, industries, services
- ✅ **Admin Interface** - Content management
- ✅ **CORS Support** - Frontend-backend communication

### **Deployment Ready**
- ✅ **Netlify Configuration** - One-click deployment
- ✅ **Production Build** - Optimized for performance
- ✅ **Environment Variables** - Secure configuration
- ✅ **Static Asset Optimization** - Compressed images, minified code

## 🚀 **Quick Start**

### **Development**
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### **Deployment**
```bash
# Deploy to Netlify
# 1. Connect GitHub repository
# 2. Set build command: npm run build
# 3. Set publish directory: build
# 4. Deploy!
```

## 📱 **Pages Overview**

- **Homepage** - Hero section, quick links, product categories
- **Products** - Filterable product catalog with search
- **Industries** - Industry applications and solutions
- **Services** - Company services and capabilities
- **About** - Company information and team
- **Contact** - Contact form and company details
- **Support** - Resources and FAQ
- **Admin** - Product management system

## 🎨 **Design System**

- **Colors** - Professional blue/grey/white palette
- **Typography** - Montserrat/Roboto font stack
- **Components** - Consistent, reusable UI elements
- **Layout** - Grid-based responsive design
- **Animations** - Smooth, professional transitions

---

**Amazon Filtration (K) Ltd** - Professional Website Structure
