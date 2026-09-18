import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Pencil, Trash2, Eye, Download } from 'lucide-react';
import AdminJobForm from './AdminJobForm';
import {
  deleteJob,
  fetchAdminJobs,
  fetchApplications,
  formatJobDate,
  resumeDownloadUrl,
  saveJob,
  updateApplicationStatus,
} from './jobsApi';

const AdminCareers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('list');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [filterJobId, setFilterJobId] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [jobList, appList] = await Promise.all([
        fetchAdminJobs(),
        fetchApplications(filterJobId || undefined),
      ]);
      setJobs(jobList);
      setApplications(appList);
    } catch (err) {
      setError(err.message || 'Failed to load careers data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterJobId]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleSave = async (job) => {
    setSaving(true);
    setFormError('');
    try {
      await saveJob(job);
      setView('list');
      setEditing(null);
      await load();
    } catch (err) {
      setFormError(err.message || 'Could not save vacancy');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete “${job.title}” and its applications?`)) return;
    try {
      await deleteJob(job.id);
      await load();
    } catch (err) {
      setError(err.message || 'Could not delete vacancy');
    }
  };

  const handleStatus = async (job, status) => {
    try {
      await saveJob({ ...job, status });
      await load();
    } catch (err) {
      setError(err.message || 'Could not update status');
    }
  };

  const handleAppStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    } catch (err) {
      setError(err.message || 'Could not update application');
    }
  };

  const openCount = jobs.filter((job) => job.status === 'open' && job.is_open).length;
  const appCount = applications.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-orange-700">ADMIN</p>
            <h1 className="text-2xl font-bold text-gray-900">Careers & vacancies</h1>
            <p className="text-sm text-gray-600 mt-1">
              Post a role when you are hiring. It appears on the public Careers page immediately if status is Open.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/dashboard"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
            >
              Products
            </Link>
            <Link
              to="/careers"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
            >
              View public page
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-600">Open on website</p>
            <p className="text-2xl font-bold text-gray-900">{openCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-600">All vacancies</p>
            <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-600">Applications shown</p>
            <p className="text-2xl font-bold text-gray-900">{appCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setView('list');
              setEditing(null);
            }}
            className={`px-4 py-2 text-sm rounded-md ${view === 'list' ? 'bg-orange-700 text-white' : 'bg-white border border-gray-300'}`}
          >
            Vacancies
          </button>
          <button
            type="button"
            onClick={() => setView('applications')}
            className={`px-4 py-2 text-sm rounded-md ${view === 'applications' ? 'bg-orange-700 text-white' : 'bg-white border border-gray-300'}`}
          >
            Applications
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setFormError('');
              setView('form');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gray-900 text-white"
          >
            <Plus className="w-4 h-4" />
            Post vacancy
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : null}

        {view === 'form' ? (
          <AdminJobForm
            job={editing}
            saving={saving}
            error={formError}
            onSave={handleSave}
            onCancel={() => {
              setView('list');
              setEditing(null);
            }}
          />
        ) : null}

        {view === 'list' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <p className="p-6 text-gray-600">Loading vacancies…</p>
            ) : jobs.length === 0 ? (
              <div className="p-10 text-center">
                <Briefcase className="w-10 h-10 mx-auto text-orange-700 mb-3" />
                <p className="font-semibold text-gray-900">No vacancies yet</p>
                <p className="text-sm text-gray-600 mt-1 mb-4">Post one when you have an opening. The Careers page stays empty until then.</p>
                <button
                  type="button"
                  onClick={() => setView('form')}
                  className="px-4 py-2 bg-orange-700 text-white text-sm rounded-md"
                >
                  Post vacancy
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Closes</th>
                      <th className="px-4 py-3 font-medium">Apps</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-xs text-gray-500">{job.employment_type} · {job.location}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{job.department || '—'}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${
                              job.status === 'open' && job.is_open
                                ? 'bg-green-100 text-green-800'
                                : job.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {job.status === 'open' && !job.is_open ? 'expired' : job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{formatJobDate(job.closing_date) || '—'}</td>
                        <td className="px-4 py-3 text-gray-700">{job.application_count ?? 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditing(job);
                                setFormError('');
                                setView('form');
                              }}
                              className="inline-flex items-center gap-1 text-blue-700"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </button>
                            {job.status === 'open' ? (
                              <button type="button" onClick={() => handleStatus(job, 'closed')} className="text-gray-700">
                                Close
                              </button>
                            ) : (
                              <button type="button" onClick={() => handleStatus(job, 'open')} className="text-green-700">
                                Open
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setFilterJobId(String(job.id));
                                setView('applications');
                              }}
                              className="inline-flex items-center gap-1 text-gray-700"
                            >
                              <Eye className="w-4 h-4" />
                              Apps
                            </button>
                            <button type="button" onClick={() => handleDelete(job)} className="inline-flex items-center gap-1 text-red-700">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}

        {view === 'applications' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-5">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by vacancy</label>
                <select
                  value={filterJobId}
                  onChange={(e) => setFilterJobId(e.target.value)}
                  className="w-full sm:max-w-sm px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All applications</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-gray-600">Loading applications…</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-600">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-3 py-3 font-medium">Candidate</th>
                      <th className="px-3 py-3 font-medium">Role</th>
                      <th className="px-3 py-3 font-medium">Received</th>
                      <th className="px-3 py-3 font-medium">Status</th>
                      <th className="px-3 py-3 font-medium">CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-t border-gray-100 align-top">
                        <td className="px-3 py-3">
                          <p className="font-medium text-gray-900">{app.full_name}</p>
                          <p className="text-xs text-gray-500">{app.email}</p>
                          {app.phone ? <p className="text-xs text-gray-500">{app.phone}</p> : null}
                          {app.cover_letter ? (
                            <p className="mt-2 text-xs text-gray-600 max-w-md whitespace-pre-line">{app.cover_letter}</p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-gray-700">{app.job_title || 'General application'}</td>
                        <td className="px-3 py-3 text-gray-700">
                          {app.created_at ? new Date(app.created_at.replace(' ', 'T')).toLocaleString('en-KE') : '—'}
                        </td>
                        <td className="px-3 py-3">
                          <select
                            value={app.status || 'new'}
                            onChange={(e) => handleAppStatus(app.id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-xs"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-3 py-3">
                          {app.has_resume ? (
                            <a
                              href={resumeDownloadUrl(app.id)}
                              className="inline-flex items-center gap-1 text-orange-800 font-medium"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </a>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminCareers;
