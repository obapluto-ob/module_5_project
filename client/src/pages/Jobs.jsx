import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [searchParams] = useSearchParams()
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All')

  useEffect(() => {
    axios.get('/api/jobs').then(res => setJobs(res.data)).catch(() => setJobs([]))
  }, [])

  const filtered = jobs.filter(job => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      (job.company_name || '').toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || job.job_type?.toLowerCase() === typeFilter.toLowerCase()
    return matchSearch && matchType
  })

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div>
            <h2 style={styles.heading}>Browse Jobs</h2>
            <p style={styles.sub}>{filtered.length} opportunities found</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={styles.filterBar}>
          <input
            style={styles.search}
            placeholder="Search by title, company, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={styles.typeFilters}>
            {JOB_TYPES.map(t => (
              <button
                key={t}
                style={{ ...styles.typeBtn, ...(typeFilter === t ? styles.typeBtnActive : {}) }}
                onClick={() => setTypeFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <p>No jobs found matching your search.</p>
          </div>
        )}

        <div style={styles.grid}>
          {filtered.map(job => (
            <Link to={`/jobs/${job.id}`} key={job.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.companyAvatar}>
                  {(job.company_name || 'C')[0].toUpperCase()}
                </div>
                <div>
                  <h3 style={styles.title}>{job.title}</h3>
                  <p style={styles.company}>{job.company_name}</p>
                </div>
              </div>
              <div style={styles.cardMeta}>
                <span style={styles.metaTag}>{job.location}</span>
                <span style={{
                  ...styles.metaTag,
                  ...(job.job_type?.toLowerCase() === 'internship' ? styles.internshipTag : {}),
                }}>
                  {job.job_type}
                </span>
              </div>
              {job.salary && <p style={styles.salary}>{job.salary}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { background: 'var(--bg)', minHeight: '100vh', padding: '2rem 1.5rem' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  topBar: { marginBottom: '1.5rem' },
  heading: { fontSize: '1.75rem', fontWeight: '700' },
  sub: { color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' },
  filterBar: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1rem 1.25rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  search: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
  },
  typeFilters: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  typeBtn: {
    padding: '0.35rem 0.9rem',
    border: '1px solid var(--border)',
    borderRadius: '999px',
    background: 'var(--bg)',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  typeBtnActive: {
    background: 'var(--primary)',
    color: '#fff',
    border: '1px solid var(--primary)',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem',
    color: 'var(--text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    color: 'var(--text)',
    boxShadow: 'var(--shadow)',
  },
  cardTop: { display: 'flex', gap: '0.75rem', alignItems: 'flex-start' },
  companyAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: '#eef2ff',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1rem',
    flexShrink: 0,
  },
  title: { fontSize: '1rem', fontWeight: '700', lineHeight: 1.3 },
  company: { color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.15rem' },
  cardMeta: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  metaTag: {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '999px',
    padding: '0.2rem 0.65rem',
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },
  internshipTag: {
    background: '#ede9fe',
    border: '1px solid #c4b5fd',
    color: '#7c3aed',
  },
  salary: { color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' },
}
