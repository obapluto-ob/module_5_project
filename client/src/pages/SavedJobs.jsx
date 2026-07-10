import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function SavedJobs() {
  const { token } = useAuth()
  const [saved, setSaved] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/saved-jobs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSaved(res.data))
      .catch(() => setSaved([]))
      .finally(() => setLoading(false))
  }, [token])

  async function handleRemove(id) {
    await axios.delete(`/api/saved-jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    setSaved(prev => prev.filter(j => j.id !== id))
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <h2 style={styles.heading}>Saved Jobs</h2>
          <span style={styles.count}>{saved.length} saved</span>
        </div>

        {loading && <p style={styles.muted}>Loading saved jobs...</p>}

        {!loading && saved.length === 0 && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No saved jobs yet. Start bookmarking jobs you are interested in.</p>
            <Link to="/jobs" style={styles.emptyLink}>Browse Jobs</Link>
          </div>
        )}

        <div style={styles.list}>
          {saved.map(job => (
            <div key={job.id} style={styles.card}>
              <div style={styles.cardLeft}>
                <div style={styles.companyAvatar}>
                  {(job.company_name || 'C')[0].toUpperCase()}
                </div>
                <div>
                  <Link to={`/jobs/${job.job_id}`} style={styles.title}>{job.job_title}</Link>
                  <p style={styles.meta}>{job.company_name} · {job.location}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(job.id)} style={styles.removeBtn}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { background: 'var(--bg)', minHeight: '100vh', padding: '2.5rem 1.5rem' },
  container: { maxWidth: '800px', margin: '0 auto' },
  topBar: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
  heading: { fontSize: '1.75rem', fontWeight: '700' },
  count: {
    background: 'var(--border)',
    color: 'var(--text-muted)',
    padding: '0.2rem 0.65rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  muted: { color: 'var(--text-muted)' },
  empty: { textAlign: 'center', padding: '4rem 2rem' },
  emptyText: { color: 'var(--text-muted)', marginBottom: '1rem' },
  emptyLink: { color: 'var(--primary)', fontWeight: '600' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--shadow)',
    gap: '1rem',
  },
  cardLeft: { display: 'flex', gap: '1rem', alignItems: 'center' },
  companyAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: '#eef2ff',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  title: { fontWeight: '700', fontSize: '1rem', color: 'var(--text)' },
  meta: { color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' },
  removeBtn: {
    background: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '600',
    flexShrink: 0,
  },
}
