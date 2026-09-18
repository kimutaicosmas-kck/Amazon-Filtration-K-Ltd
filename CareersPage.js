import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Calendar, ArrowRight, Users, Shield, Wrench } from 'lucide-react';
import { fetchOpenJobs, formatJobDate } from './jobsApi';

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchOpenJobs();
        if (!cancelled) setJobs(list);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unable to load vacancies right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="amazon-careers-page min-h-screen">
      <section className="af-page-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="amazon-contact-kicker mb-3">CAREERS</p>
          <h1 className="max-w-3xl">Join Amazon Filtration</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg amazon-text-muted leading-relaxed">
            We manufacture air, fuel, oil, and hydraulic filters in Nairobi. When a role is open, it is posted here —
            apply directly and our team will review every application.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-zinc-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="amazon-career-perk">
              <Wrench className="w-8 h-8 text-orange-700 mb-3" />
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">Real factory work</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Production, quality, stores, and engineering roles inside a working filter plant — not a trading desk.
              </p>
            </div>
            <div className="amazon-career-perk">
              <Shield className="w-8 h-8 text-orange-700 mb-3" />
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">Safety and quality first</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We run to international quality standards. Training and safe working practice are part of the job.
              </p>
            </div>
            <div className="amazon-career-perk">
              <Users className="w-8 h-8 text-orange-700 mb-3" />
              <h2 className="text-lg font-semibold text-zinc-900 mb-2">Grow with the plant</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                A Kenyan manufacturer serving East Africa. We hire when the operation needs people who can deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" id="open-roles">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="amazon-contact-kicker mb-2">OPEN VACANCIES</p>
              <h2 className="text-3xl font-bold text-zinc-900">Current opportunities</h2>
            </div>
            {!loading && !error ? (
              <p className="text-sm text-zinc-500">
                {jobs.length === 1 ? '1 open role' : `${jobs.length} open roles`}
              </p>
            ) : null}
          </div>

          {loading ? (
            <p className="text-zinc-600">Loading vacancies…</p>
          ) : error ? (
            <div className="amazon-career-empty">
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">Vacancies could not be loaded</h3>
              <p className="text-zinc-600 mb-6">{error}</p>
              <Link to="/contact" className="amazon-contact-submit inline-flex px-5 py-3 text-sm font-semibold text-white">
                Contact us
              </Link>
            </div>
          ) : jobs.length === 0 ? (
            <div className="amazon-career-empty">
              <Briefcase className="w-10 h-10 text-orange-700 mb-4" />
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">No open vacancies right now</h3>
              <p className="text-zinc-600 max-w-xl mx-auto mb-6 leading-relaxed">
                We only advertise roles when there is a genuine opening. Check this page again later, or send a general
                application so we can keep your details on file.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/careers/general"
                  className="amazon-contact-submit inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white"
                >
                  Send a general application
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold border border-zinc-300 text-zinc-800 hover:border-orange-700"
                >
                  Contact HR
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <article key={job.id} className="amazon-job-card">
                  <div className="min-w-0">
                    {job.department ? <p className="af-chip mb-2">{job.department}</p> : null}
                    <h3 className="text-xl font-semibold text-zinc-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-600">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {job.employment_type}
                      </span>
                      {job.closing_date ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Closes {formatJobDate(job.closing_date)}
                        </span>
                      ) : null}
                    </div>
                    {job.description ? (
                      <p className="mt-3 text-sm text-zinc-600 line-clamp-2">{job.description}</p>
                    ) : null}
                  </div>
                  <Link
                    to={`/careers/${job.slug}`}
                    className="amazon-contact-submit inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white shrink-0"
                  >
                    View role
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
