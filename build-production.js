#!/usr/bin/env node

/**
 * Production Build Script for Amazon Filtration Website
 * This script prepares the application for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build process...');

// 1. Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Creating from env.example...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created. Please update with your production values.');
  } else {
    console.log('❌ env.example file not found. Please create .env manually.');
  }
} else {
  console.log('✅ .env file found.');
}

// 2. Create robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://amazonfiltration.co.ke/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsContent);
console.log('✅ robots.txt created.');

// 3. Create sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://amazonfiltration.co.ke/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://amazonfiltration.co.ke/products</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://amazonfiltration.co.ke/industries</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://amazonfiltration.co.ke/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://amazonfiltration.co.ke/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://amazonfiltration.co.ke/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
console.log('✅ sitemap.xml created.');

// 4. Create deployment checklist
const checklistContent = `# Amazon Filtration Website - Production Deployment Checklist

## Pre-Deployment
- [ ] Update .env file with production values
- [ ] Test all functionality locally
- [ ] Optimize images (compress if needed)
- [ ] Run npm run build and test build locally
- [ ] Check all links and forms work correctly

## Environment Variables to Set
- NODE_ENV=production
- REACT_APP_ENV=production
- REACT_APP_API_URL=https://your-api-domain.com/api
- REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
- REACT_APP_CONTACT_EMAIL=filterskenyaltd@gmail.com

## Post-Deployment
- [ ] Test website on production domain
- [ ] Verify Google Maps integration
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Verify admin panel access
- [ ] Test all product images load correctly
- [ ] Check page load speeds
- [ ] Verify SEO meta tags

## Security Checklist
- [ ] Remove admin link from navbar (already done)
- [ ] Ensure admin panel is only accessible via direct URL
- [ ] Verify contact form has proper validation
- [ ] Check that sensitive data is not exposed in client code

## Performance Checklist
- [ ] Images are optimized and compressed
- [ ] CSS and JS are minified
- [ ] Gzip compression is enabled on server
- [ ] CDN is configured for static assets
- [ ] Browser caching is properly configured

## Monitoring Setup
- [ ] Google Analytics is configured
- [ ] Error tracking is set up
- [ ] Uptime monitoring is configured
- [ ] Performance monitoring is active

## Backup Strategy
- [ ] Database backups are automated
- [ ] File uploads are backed up
- [ ] Code repository is properly versioned
- [ ] Environment configuration is documented

## Go Live Checklist
- [ ] DNS is pointing to production server
- [ ] SSL certificate is installed and working
- [ ] All subdomains are configured
- [ ] Email is working correctly
- [ ] Contact form emails are being received
- [ ] Admin panel is accessible and functional

## Post-Launch
- [ ] Monitor website performance for 24-48 hours
- [ ] Check error logs for any issues
- [ ] Verify all integrations are working
- [ ] Test on different devices and browsers
- [ ] Gather initial user feedback

---
Generated on: ${new Date().toISOString()}
`;

fs.writeFileSync(path.join(__dirname, 'DEPLOYMENT_CHECKLIST.md'), checklistContent);
console.log('✅ DEPLOYMENT_CHECKLIST.md created.');

console.log('🎉 Production build preparation complete!');
console.log('📋 Please review DEPLOYMENT_CHECKLIST.md before going live.');
console.log('🔧 Run "npm run build" to create the production build.');
