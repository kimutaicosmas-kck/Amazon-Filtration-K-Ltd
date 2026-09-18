import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const emptyJob = {
  title: '',
  department: '',
  location: 'Nairobi, Kenya',
  employment_type: 'Full-time',
  description: '',
  responsibilities: '',
  requirements: '',
  benefits: '',
  closing_date: '',
  status: 'open',
};

const departments = [
  'Production',
  'Quality Assurance',
  'Engineering',
  'Sales',
  'Stores & Logistics',
  'Administration',
  'Finance',
  'Human Resources',
  'Maintenance',
];

const AdminJobForm = ({ job = null, onSave, onCancel, saving = false, error = '' }) => {
  const [form, setForm] = useState(emptyJob);

  useEffect(() => {
    if (!job) {
      setForm(emptyJob);
      return;
    }
    setForm({
      ...emptyJob,
      ...job,
      closing_date: job.closing_date && job.closing_date !== '0000-00-00' ? job.closing_date : '',
    });
  }, [job]);

  const update = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: job?.id,
      closing_date: form.closing_date || null,
    });
  };

  const field =
    'w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-sm text-gray-600 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to vacancies
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {job?.id ? 'Edit vacancy' : 'Post a vacancy'}
      </h2>

      {error ? (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className={field}
              placeholder="e.g. Quality Inspector"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              list="career-departments"
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              className={field}
              placeholder="Production"
            />
            <datalist id="career-departments">
              {departments.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment type</label>
            <select
              value={form.employment_type}
              onChange={(e) => update('employment_type', e.target.value)}
              className={field}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Casual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing date</label>
            <input
              type="date"
              value={form.closing_date}
              onChange={(e) => update('closing_date', e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} className={field}>
              <option value="open">Open — visible on the website</option>
              <option value="draft">Draft — hidden</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className={field}
            placeholder="Summarise the role and who you are looking for."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (one per line)</label>
          <textarea
            rows={5}
            value={form.responsibilities}
            onChange={(e) => update('responsibilities', e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
          <textarea
            rows={5}
            value={form.requirements}
            onChange={(e) => update('requirements', e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
          <textarea
            rows={4}
            value={form.benefits}
            onChange={(e) => update('benefits', e.target.value)}
            className={field}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-700 text-white text-sm font-medium rounded-md hover:bg-orange-800 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : job?.id ? 'Update vacancy' : 'Publish vacancy'}
          </button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm border border-gray-300 rounded-md">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminJobForm;
