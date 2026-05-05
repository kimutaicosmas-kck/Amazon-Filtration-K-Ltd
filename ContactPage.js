import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';

const apiRoot = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [heardAbout, setHeardAbout] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const product = searchParams.get('product');
    const code = searchParams.get('code');
    const service = searchParams.get('service');

    if (product && code) {
      setSubject(`Quote Request for ${product} (${code})`);
      setMessage(
        `I am interested in getting a quote for the following product:\n\nProduct: ${product}\nCode: ${code}\n\nPlease provide pricing and availability information.`
      );
      setInquiryType('quote');
    } else if (service) {
      setSubject(`Inquiry: ${service.replace(/-/g, ' ')}`);
    }
  }, [searchParams]);

  const buildPayload = () => {
    const name = `${firstName} ${lastName}`.trim();
    const lines = [
      company && `Company: ${company}`,
      phone && `Phone: ${phone}`,
      heardAbout && `How did you hear about us: ${heardAbout}`,
      '',
      message.trim() || '(No additional message provided.)'
    ].filter(Boolean);
    const body = lines.join('\n');
    return {
      name,
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      subject: subject.trim() || 'General inquiry',
      message: body,
      inquiryType: 'general'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formData = buildPayload();
    if (!formData.name || !formData.email) {
      setSubmitError('Please complete all required fields.');
      setIsSubmitting(false);
      return;
    }
    if (!formData.message || formData.message.length < 3) {
      setSubmitError('Please add a short message so we can help you.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiRoot()}/backend-php/api/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const raw = await response.text();
      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error(`Server returned invalid response (${raw.slice(0, 120).replace(/\s+/g, ' ') || 'empty'})`);
      }
      if (result.success) {
        setIsSubmitted(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompany('');
        setPhone('');
        setMessage('');
        setSubject('');
        setHeardAbout('');
      } else {
        setSubmitError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3 py-3 text-sm text-zinc-900 bg-zinc-50 border border-zinc-100 rounded-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300';
  const labelClass = 'block text-xs font-semibold text-zinc-700 mb-1.5';

  return (
    <div className="amazon-contact-page amazon-contact-sales min-h-screen">
      <section className="amazon-contact-sales-wrap">
        <div className="amazon-contact-sales-inner">
          <aside className="amazon-contact-sales-left">
            <p className="amazon-contact-kicker">CONTACT</p>
            <h1 className="amazon-contact-title">Talk to sales</h1>
            <p className="amazon-contact-copy">
              Want to learn more about our Sage solutions and services? Simply complete the form to arrange a call with a
              member of our sales team.
            </p>
            <p className="amazon-contact-copy">We aim to respond to every enquiry within 24 hours.</p>

            <div className="amazon-contact-callout">
              <p className="amazon-contact-callout-label">Call us on:</p>
              <a href="tel:+254714752613" className="amazon-contact-callout-link">
                +254 714752613
              </a>
              <br />
              <a href="tel:+254720799363" className="amazon-contact-callout-link">
                +254 720799363
              </a>
            </div>
          </aside>

          <div className="amazon-contact-sales-form-card">
            <h2 className="amazon-contact-form-title">Get in touch with our sales team</h2>
            <p className="amazon-contact-form-copy">
              Our friendly sales team is always on hand to answer any queries you may have about our products, services,
              or anything else you&apos;re curious about.
            </p>

            {isSubmitted ? (
              <div className="mt-8 py-8 border-t border-zinc-100">
                <p className="text-lg font-semibold text-zinc-900">Thank you. Your message has been sent.</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-first" className={labelClass}>
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-last" className={labelClass}>
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-last"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete="family-name"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-company" className={labelClass}>
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      autoComplete="organization"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>Phone number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className={labelClass}>Message</label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={3}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-hear" className={labelClass}>
                      How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-hear"
                      value={heardAbout}
                      onChange={(e) => setHeardAbout(e.target.value)}
                      rows={2}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>

                {submitError ? (
                  <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</div>
                ) : null}

                <p className="text-[11px] leading-relaxed text-zinc-600">
                  We&apos;ll use your information to communicate any future events and services. You may unsubscribe at
                  anytime. For further details please review our privacy policy.
                </p>

                <div className="amazon-contact-recaptcha" aria-hidden>
                  protected by reCAPTCHA
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="amazon-contact-submit inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending…' : 'Submit'}
                  <Send className="w-4 h-4" strokeWidth={2} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <div className="sr-only">
        <Link to="/products">Browse products</Link>
      </div>
    </div>
  );
};

export default ContactPage;
