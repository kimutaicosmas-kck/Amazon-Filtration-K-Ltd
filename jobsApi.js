const apiRoot = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

export const jobsApiUrl = (file = 'jobs.php', params = '') => {
  const query = params ? (params.startsWith('?') ? params : `?${params}`) : '';
  return `${apiRoot()}/backend-php/api/${file}${query}`;
};

export async function fetchOpenJobs() {
  const res = await fetch(jobsApiUrl('jobs.php'));
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to load vacancies');
  }
  return data.jobs || [];
}

export async function fetchJobBySlug(slug) {
  const res = await fetch(jobsApiUrl('jobs.php', `slug=${encodeURIComponent(slug)}`));
  const data = await parseJson(res);
  if (!data.success || !data.job) {
    throw new Error(data.error || 'Vacancy not found');
  }
  return data.job;
}

export async function fetchAdminJobs() {
  const res = await fetch(jobsApiUrl('jobs.php', 'admin=1'));
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to load vacancies');
  }
  return data.jobs || [];
}

export async function fetchAdminJob(id) {
  const res = await fetch(jobsApiUrl('jobs.php', `id=${encodeURIComponent(id)}&admin=1`));
  const data = await parseJson(res);
  if (!data.success || !data.job) {
    throw new Error(data.error || 'Vacancy not found');
  }
  return data.job;
}

export async function saveJob(job) {
  const url = job.id
    ? jobsApiUrl('jobs.php', `id=${encodeURIComponent(job.id)}`)
    : jobsApiUrl('jobs.php');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to save vacancy');
  }
  return data.job;
}

export async function deleteJob(id) {
  const res = await fetch(jobsApiUrl('jobs.php', `id=${encodeURIComponent(id)}`), {
    method: 'DELETE',
  });
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete vacancy');
  }
}

export async function fetchApplications(jobId) {
  const query = jobId ? `job_id=${encodeURIComponent(jobId)}` : '';
  const res = await fetch(jobsApiUrl('applications.php', query));
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to load applications');
  }
  return data.applications || [];
}

export async function updateApplicationStatus(id, status) {
  const res = await fetch(jobsApiUrl('applications.php', `id=${encodeURIComponent(id)}`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to update application');
  }
}

export function resumeDownloadUrl(id) {
  return jobsApiUrl('applications.php', `download=${encodeURIComponent(id)}`);
}

export async function submitApplication(formData) {
  const res = await fetch(jobsApiUrl('applications.php'), {
    method: 'POST',
    body: formData,
  });
  const data = await parseJson(res);
  if (!data.success) {
    throw new Error(data.error || 'Failed to send application');
  }
  return data;
}

async function parseJson(res) {
  const raw = await res.text();
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Server returned an invalid response (${raw.slice(0, 120).replace(/\s+/g, ' ') || 'empty'})`);
  }
}

export function splitLines(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
}

export function formatJobDate(value) {
  if (!value || value === '0000-00-00') return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}
