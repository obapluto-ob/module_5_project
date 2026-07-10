import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const statusConfig = {
  accepted: { bg: '#dcfce7', color: '#15803d', label: 'Accepted' },
  rejected: { bg: '#fee2e2', color: '#b91c1c', label: 'Rejected' },
  pending: { bg: '#fef9c3', color: '#a16207', label: 'Pending' },
}

export default function Applications() {
  const { token } = useAuth()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setApps(res.data))
      .catch(() => setApps([]))
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <h2 style={styles.heading}>My Applications</h2>
          <span style={styles.count}>{apps.length} total</span>
        </div>

        {loading && <p style={styles.muted}>Loading applications...</p>}

        {!loading && apps.length === 0 && (
          <div style={styles.empty}>
            <p style={styles.emptyText}>You have not applied to any jobs yet.</p>
            <a href="/jobs" style={styles.emptyLink}>Browse Jobs</a>
          </div>
        )}

        <div style={styles.list}>
          {apps.map(app => {
            const status = statusConfig[app.status] || statusConfig.pending
            return (
              <div key={app.id} style={styles.card}>
                <div style={styles.cardLeft}>
                  <div style={styles.companyAvatar}>
                    {(app.company_name || 'C')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 style={styles.jobTitle}>{app.job_title}</h3>
                    <p style={styles.company}>{app.company_name}</p>
                    <p style={styles.date}>
                      Applied {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span style={{ ...styles.badge, background: status.bg, color: status.color }}>
                  {status.label}
                </span>
              </div>
            )
          })}
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
  jobTitle: { fontWeight: '700', fontSize: '1rem' },
  company: { color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.15rem' },
  date: { color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' },
  badge: {
    padding: '0.3rem 0.85rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
}
