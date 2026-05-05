# Email Integration Guide for Amazon Filtration Website

## 📧 Current Email Setup

### **Where Emails Will Be Sent:**

- **Primary Email (Testing)**: `kimutaicosmas547@gmail.com`
- **Production Email**: `filterskenyaltd@gmail.com`
- **Backup Email**: `info@amazonfiltration.co.ke` (optional)
- **Phone**: `+254 720799363`

## 🔧 Email Integration Options

### **Option 1: EmailJS (Recommended - Easy Setup)**

**Best for**: Quick setup, no backend required

#### Setup Steps:

1. **Create EmailJS Account**:

   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for free account
   - Create a new service (Gmail, Outlook, etc.)

2. **Configure EmailJS**:

   - Add your Gmail account: `kimutaicosmas547@gmail.com` (for testing)
   - Get your Service ID, Template ID, and Public Key
   - Update the email service with your credentials

3. **Update Code**:
   ```javascript
   // In src/services/emailService.js
   const EMAILJS_CONFIG = {
     serviceId: "your_service_id",
     templateId: "your_template_id",
     publicKey: "your_public_key",
   };
   ```

#### Cost: Free for 200 emails/month, then $15/month

---

### **Option 2: Backend API (Professional)**

**Best for**: Full control, unlimited emails

#### Setup Steps:

1. **Create Backend Endpoint**:

   ```python
   # Django backend endpoint
   @api_view(['POST'])
   def send_contact_email(request):
       # Send email using Django's email backend
       # Configure SMTP settings
   ```

2. **Configure SMTP**:

   ```python
   # settings.py
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp.gmail.com'
   EMAIL_PORT = 587
   EMAIL_USE_TLS = True
   EMAIL_HOST_USER = 'filterskenyaltd@gmail.com'
   EMAIL_HOST_PASSWORD = 'your_app_password'
   ```

3. **Update Frontend**:
   ```javascript
   // Send to your Django API
   const response = await fetch("/api/contact/", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(formData),
   });
   ```

#### Cost: Free with Gmail, or $5-20/month for professional email service

---

### **Option 3: Third-Party Services (Enterprise)**

**Best for**: High volume, advanced features

#### Services:

- **SendGrid**: $15/month for 40,000 emails
- **Mailgun**: $35/month for 50,000 emails
- **AWS SES**: $0.10 per 1,000 emails

---

## 🚀 Quick Implementation (EmailJS)

### **Step 1: Sign up for EmailJS**

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Create account with `kimutaicosmas547@gmail.com` (for testing)
3. Verify your email

### **Step 2: Create Email Service**

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail"
4. Connect your Gmail account
5. Note down the Service ID

### **Step 3: Create Email Template**

1. Go to "Email Templates"
2. Create new template with this content:

```html
Subject: New Contact Form Submission - {{subject}} From: {{from_name}}
({{from_email}}) Phone: {{phone}} Company: {{company}} Inquiry Type:
{{inquiry_type}} Message: {{message}} --- Sent from Amazon Filtration website
Time: {{sent_at}}
```

3. Note down the Template ID

### **Step 4: Get Public Key**

1. Go to "Account" → "General"
2. Copy your Public Key

### **Step 5: Update Code**

Replace the email service with EmailJS integration:

```javascript
// Install EmailJS
npm install @emailjs/browser

// Update src/services/emailService.js
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceId: 'your_service_id_here',
  templateId: 'your_template_id_here',
  publicKey: 'your_public_key_here'
};

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      inquiry_type: formData.inquiryType,
      subject: formData.subject,
      message: formData.message,
      sent_at: new Date().toLocaleString()
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      result
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send email. Please try again or contact us directly.',
      error: error.message
    };
  }
};
```

## 📱 Testing Your Email Setup

### **Test the Contact Form:**

1. Go to your website's contact page
2. Fill out the form with test data
3. Submit the form
4. Check your Gmail inbox (`kimutaicosmas547@gmail.com`)
5. You should receive the email within a few seconds

### **Email Content You'll Receive:**

```
Subject: New Contact Form Submission - [Customer's Subject]

From: John Doe (john@example.com)
Phone: +254 123456789
Company: ABC Company
Inquiry Type: Product Inquiry

Message:
Hello, I'm interested in your air filters for my automotive business...

---
Sent from Amazon Filtration website
Time: 1/22/2025, 2:30:45 PM
```

## 🔒 Security Considerations

### **Email Security:**

- Use app-specific passwords for Gmail
- Never expose email credentials in frontend code
- Consider rate limiting to prevent spam
- Validate all form inputs

### **Spam Protection:**

- Add reCAPTCHA to contact form
- Implement rate limiting (max 5 emails per hour per IP)
- Validate email addresses
- Filter out common spam keywords

## 📊 Monitoring & Analytics

### **Track Email Performance:**

- Monitor email delivery rates
- Track response times
- Set up email notifications for new inquiries
- Create email templates for common responses

## 🆘 Troubleshooting

### **Common Issues:**

1. **Emails not sending**: Check EmailJS configuration
2. **Emails going to spam**: Configure SPF/DKIM records
3. **Rate limiting**: Implement proper error handling
4. **Form validation**: Ensure all required fields are filled

### **Support:**

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Gmail SMTP Settings: [https://support.google.com/mail/answer/7126229](https://support.google.com/mail/answer/7126229)

---

## ✅ Next Steps

1. **Choose your email solution** (EmailJS recommended for quick setup)
2. **Follow the setup steps** for your chosen solution
3. **Test the contact form** thoroughly
4. **Monitor email delivery** for the first few days
5. **Set up email notifications** on your phone/computer

**Your contact form will then send real emails to `kimutaicosmas547@gmail.com`!** 📧

**Note**: For production, change the email back to `filterskenyaltd@gmail.com` in the email service configuration.
