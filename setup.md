# Amazon Filtration Website - Setup Guide

## 🚀 Quick Setup Instructions

### 1. Frontend Setup (React + Tailwind)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 2. Backend Setup (Django + MySQL)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create database (MySQL)
# Create database: amazon_filtration

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`
Admin panel: `http://localhost:8000/admin`

### 3. Database Configuration

Update `backend/amazon_filtration/settings.py` with your MySQL credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'amazon_filtration',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 4. Environment Variables

Create a `.env` file in the backend directory:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=amazon_filtration
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

## 📁 Project Structure

```
amazon-filtration-website/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Navbar, Footer
│   │   ├── pages/          # All page components
│   │   ├── App.js          # Main app
│   │   └── index.css       # Tailwind styles
│   └── package.json
├── backend/                 # Django backend
│   ├── amazon_filtration/  # Django settings
│   ├── api/               # API models, views, serializers
│   └── manage.py
├── requirements.txt        # Python dependencies
└── README.md
```

## 🎨 Features Implemented

✅ **Homepage** - Hero banner, quick links, product categories
✅ **Products Page** - Filterable grid, search, product cards
✅ **Industries Page** - Industry applications and use cases
✅ **Services Page** - Service offerings and process
✅ **About Page** - Company history, team, values
✅ **Vision Page** - Mission, vision, strategic goals
✅ **Support Page** - FAQs, resources, downloads
✅ **Contact Page** - Contact form, company info, map
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **SEO Optimized** - Meta tags, alt text, structured data
✅ **Modern UI** - Tailwind CSS, smooth animations
✅ **Professional Design** - Industrial theme, blue/grey colors

## 🔧 Customization

### Adding Products

1. Go to Django admin: `http://localhost:8000/admin`
2. Login with superuser credentials
3. Add products in the Products section
4. Include high-quality images and descriptions

### Modifying Content

- All text content can be updated in the React components
- Images are sourced from Unsplash API
- Colors and styling in `tailwind.config.js`

### Adding New Pages

1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.js`
3. Add navigation link in `frontend/src/components/Navbar.js`

## 📱 Mobile Responsiveness

The website is fully responsive with:

- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and layouts
- Fast loading on mobile devices

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build: `npm run build`
2. Deploy `build` folder

### Backend (Heroku/DigitalOcean)

1. Set up MySQL database
2. Configure environment variables
3. Deploy Django app
4. Run migrations

## 📞 Support

For any issues or questions:

- Email: filterskenyaltd@gmail.com
- Phone: +254 720799363

---

**Ready to launch!** 🚀
