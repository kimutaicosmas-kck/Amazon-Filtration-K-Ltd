/**
 * Email Service for Amazon Filtration Contact Form
 * This service handles sending emails from the contact form
 */

// Email configuration
const EMAIL_CONFIG = {
  // Primary contact email (using personal email for testing)
  to: 'kimutaicosmas547@gmail.com',
  // Backup email (optional)
  backup: 'filterskenyaltd@gmail.com',
  // Company info
  company: 'Amazon Filtration (K) Ltd',
  phone: '+254 720799363'
};

/**
 * Send contact form email using EmailJS service
 * This is a client-side email solution that doesn't require a backend
 */
export const sendContactEmail = async (formData) => {
  try {
    // For now, we'll simulate the email sending
    // In production, you would integrate with a real email service
    
    const emailData = {
      to: EMAIL_CONFIG.to,
      from: formData.email,
      subject: `New Contact Form Submission - ${formData.subject}`,
      message: `
New contact form submission from Amazon Filtration website:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Inquiry Type: ${formData.inquiryType}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Amazon Filtration website contact form
Time: ${new Date().toLocaleString()}
      `.trim()
    };

    // Simulate API call (replace with real email service)
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() < 0.95) {
          resolve(emailData);
        } else {
          reject(new Error('Email service temporarily unavailable. Please try again or contact us directly.'));
        }
      }, 2000);
    });

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will respond within 24 hours.',
      emailData
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: error.message || 'Failed to send email. Please try again or contact us directly.',
      fallback: {
        email: EMAIL_CONFIG.to,
        phone: EMAIL_CONFIG.phone,
        message: 'You can also reach us directly at the contact information below.'
      }
    };
  }
};

/**
 * Get contact information for fallback
 */
export const getContactInfo = () => {
  return {
    email: EMAIL_CONFIG.to,
    phone: EMAIL_CONFIG.phone,
    company: EMAIL_CONFIG.company
  };
};

/**
 * Send auto-reply to customer
 */
export const sendAutoReply = async (customerEmail, customerName) => {
  try {
    const autoReplyData = {
      to: customerEmail,
      subject: 'Thank you for contacting Amazon Filtration (K) Ltd',
      message: `
Dear ${customerName},

Thank you for contacting Amazon Filtration (K) Ltd!

We have received your inquiry and our team will review it shortly. We typically respond within 24 hours during business days.

For urgent matters, please call us at +254 720799363.

Best regards,
Amazon Filtration (K) Ltd Team

---
This is an automated response. Please do not reply to this email.
      `.trim()
    };

    // Simulate auto-reply sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, data: autoReplyData };
  } catch (error) {
    console.error('Auto-reply failed:', error);
    return { success: false, error: error.message };
  }
};
