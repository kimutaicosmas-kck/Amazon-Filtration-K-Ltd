# Amazon Filtration (K) Ltd - Website

A modern, professional website for Amazon Filtration (K) Ltd, a manufacturer and supplier of filtration products. Built with React.js frontend and Django backend.

## 🌟 Features

### Frontend (React + Tailwind CSS)

- **Modern Design**: Clean, industrial-modern design with blue/grey/white color scheme
- **Responsive**: Mobile-first responsive design that works on all devices
- **SEO Optimized**: Meta tags, structured data, and optimized images
- **Interactive Components**: Smooth animations and hover effects
- **Professional Pages**:
  - Homepage with hero banner and quick links
  - Products page with filtering and search
  - Industries served page
  - Services page
  - About Us and Vision pages
  - Support/Resources page with FAQs
  - Contact page with form and map

### Backend (Django + MySQL)

- **RESTful API**: Django REST Framework for API endpoints
- **Database Models**: Products, Industries, Services, Contact Requests, Testimonials
- **Admin Interface**: Django admin for content management
- **CORS Support**: Configured for frontend-backend communication

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MySQL database

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 📁 Project Structure

```
amazon-filtration-website/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json
├── backend/                 # Django backend
│   ├── amazon_filtration/  # Django project settings
│   ├── api/               # API app
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API views
│   │   └── serializers.py # Data serializers
│   └── manage.py
└── requirements.txt        # Python dependencies
```

## 🎨 Design System

### Colors

- **Primary Blue**: #3b82f6 (Trust, reliability)
- **Industrial Grey**: #64748b (Professional, industrial)
- **White**: #ffffff (Clean, modern)

### Typography

- **Primary Font**: Montserrat
- **Secondary Font**: Roboto
- **Fallback**: Open Sans

### Components

- Modern card-based layouts
- Smooth hover animations
- Professional button styles
- Responsive grid systems

## 📱 Pages Overview

### Homepage

- Hero banner with call-to-action buttons
- Quick links to main sections
- Product categories showcase
- Company features and benefits

### Products

- Filterable product grid
- Search functionality
- Category-based filtering
- Product detail modals

### Industries

- Industry-specific applications
- Visual cards with descriptions
- Product recommendations per industry

### Services

- Service offerings with detailed descriptions
- Process workflow
- Certifications and standards

### About & Vision

- Company history and milestones
- Team information
- Core values and commitments
- Strategic goals

### Support

- FAQ section with expandable answers
- Download center for resources
- Blog articles
- Multiple contact methods

### Contact

- Contact form with validation
- Company information
- Interactive map placeholder
- Quick action buttons

## 🔧 API Endpoints

### Products

- `GET /api/products/` - List all products
- `GET /api/products/?category=Oil` - Filter by category
- `GET /api/products/search/?q=filter` - Search products

### Industries

- `GET /api/industries/` - List all industries

### Services

- `GET /api/services/` - List all services

### Contact

- `POST /api/contact-requests/` - Submit contact form

### Testimonials

- `GET /api/testimonials/` - List testimonials

## 🗄️ Database Schema

### Products Table

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category ENUM('Oil','Fuel','Air','Hydraulic','Coolant','Cabin'),
  description TEXT,
  image_url VARCHAR(500),
  datasheet_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Requests Table

```sql
CREATE TABLE contact_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/DigitalOcean)

1. Set up MySQL database
2. Configure environment variables
3. Deploy Django application
4. Run migrations: `python manage.py migrate`

## 📈 SEO Features

- Meta tags for all pages
- Structured data markup
- Optimized images with alt text
- Semantic HTML structure
- Fast loading times
- Mobile-friendly design

## 🛠️ Customization

### Adding New Products

1. Use Django admin interface
2. Add product through `/admin/` panel
3. Include high-quality images
4. Write descriptive content

### Modifying Design

1. Update Tailwind classes in components
2. Modify color scheme in `tailwind.config.js`
3. Add new components in `src/components/`

### Content Management

- All content is manageable through Django admin
- Easy to update text, images, and product information
- No coding required for content updates

## 📞 Support

For technical support or questions about this website:

- Email: filterskenyaltd@gmail.com
- Phone: +254 720799363

## 📄 License

This project is proprietary to Amazon Filtration (K) Ltd.

---

**Amazon Filtration (K) Ltd** - Reliable Filtration Solutions for Machines & Industry
