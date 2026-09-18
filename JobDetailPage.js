import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Calendar, Briefcase, Send } from 'lucide-react';
import { fetchJobBySlug, formatJobDate, splitLines, submitApplication } from './jobsApi';

const emptyForm = {
  full_name: '',
  email: '',
  phone: '',
  cover_letter: '',
};

const JobDetailPage = () => {
  const { slug } = useParams();
  const isGeneral = slug === 'general';
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(!isGeneral);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isGeneral) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    (async () => {
      try {
        const data = await fetchJobBySlug(slug);
        if (!cancelled) setJob(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'This vacancy is no longer available.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, isGeneral]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const payload = new FormData();
    payload.append('full_name', form.full_name.trim());
    payload.append('email', form.email.trim());
    payload.append('phone', form.phone.trim());
    payload.append('cover_letter', form.cover_letter.trim());
    if (job?.id) payload.append('job_id', String(job.id));
    if (resume) payload.append('resume', resume);

    try {
      await submitApplication(payload);
      setSubmitted(true);
      setForm(emptyForm);
      setResume(null);
    } catch (err) {
      setSubmitError(err.message || 'Could not send your application.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3 py-3 text-sm text-zinc-900 bg-white border border-zinc-200 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400';
  const labelClass = 'block text-xs font-semibold text-zinc-700 mb-1.5';

  if (loading) {
    return (
      <div className="amazon-careers-page min-h-screen flex items-center justify-center">
        <p className="text-zinc-600">Loading vacancy…</p>
      </div>
    );
  }

  if (!isGeneral && (error || !job)) {
    return (
      <div className="amazon-careers-page min-h-screen">
        <div className="container mx-auto px-4 py-20 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">Vacancy unavailable</h1>
          <p className="text-zinc-600 mb-8">{error || 'This role is closed or was removed.'}</p>
          <Link to="/careers" className="amazon-contact-submit inline-flex px-5 py-3 text-sm font-semibold text-white">
            Back to careers
          </Link>
        </div>
      </div>
    );
  }

  const title = isGeneral ? 'General application' : job.title;
  const responsibilities = splitLines(job?.responsibilities);
  const requirements = splitLines(job?.requirements);
  const benefits = splitLines(job?.benefits);

  return (
    <div className="amazon-careers-page min-h-screen">
      <section className="af-page-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-800 mb-5">
            <ArrowLeft className="w-4 h-4" />
            All vacancies
          </Link>
          {job?.department ? <p className="af-chip mb-3">{job.department}</p> : null}
          <h1 className="max-w-3xl">{title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {job?.location || 'Nairobi, Kenya'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {job?.employment_type || (isGeneral ? 'Open application' : 'Full-time')}
            </span>
            {job?.closing_date ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Closes {formatJobDate(job.closing_date)}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="amazon-job-detail-grid">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-3">About the role</h2>
                <p className="text-zinc-600 leading-relaxed whitespace-pre-line">
                  {isGeneral
                    ? 'There may be no advertised vacancy at the moment. Send your CV and a short note about the kind of work you want. We will keep your details on file and contact you if a matching role opens.'
                    : job.description}
                </p>
              </div>

              {responsibilities.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                    {responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {requirements.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                    {requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {benefits.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-3">What we offer</h2>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                    {benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="amazon-contact-sales-form-card" id="apply">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-orange-700" />
                <h2 className="amazon-contact-form-title text-xl">Apply for this role</h2>
              </div>
              <p className="amazon-contact-form-copy text-sm mb-5">
                Attach a CV (PDF or Word, max 5MB). Shortlisted candidates will be contacted.
              </p>

              {submitted ? (
                <div className="py-6 border-t border-zinc-100">
                  <p className="text-lg font-semibold text-zinc-900">Application received.</p>
                  <p className="text-sm text-zinc-600 mt-2">Thank you. Our team will review your details.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-semibold text-orange-800"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="apply-name" className={labelClass}>
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="apply-name"
                      required
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-email" className={labelClass}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="apply-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-phone" className={labelClass}>Phone</label>
                    <input
                      id="apply-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-cover" className={labelClass}>Cover letter / note</label>
                    <textarea
                      id="apply-cover"
                      rows={5}
                      value={form.cover_letter}
                      onChange={(e) => setForm({ ...form, cover_letter: e.target.value })}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-cv" className={labelClass}>CV / resume</label>
                    <input
                      id="apply-cv"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-zinc-600"
                    />
                  </div>

                  {submitError ? (
                    <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {submitError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="amazon-contact-submit inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Submit application'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage;
