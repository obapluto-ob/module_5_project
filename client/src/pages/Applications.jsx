import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Applications() {
  const { token } = useAuth()
  const [apps, setApps] = useState([])

  useEffect(() => {
    axios
      .get('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setApps(res.data))
      .catch(() => setApps([]))
  }, [token])

  function getStatusColor(status) {
    if (status === 'accepted') return 'green'
    if (status === 'rejected') return '#e94560'
    return '#e09800'
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Applications</h2>
      {apps.length === 0 && <p style={styles.empty}>You have not applied to any jobs yet.</p>}
      {apps.map(app => (
        <div key={app.id} style={styles.card}>
          <h3>{app.job_title}</h3>
          <p style={styles.company}>{app.company_name}</p>
          <p style={{ ...styles.status, color: getStatusColor(app.status) }}>
            Status: {app.status}
          </p>
          <p style={styles.date}>Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: {
    padding: '2.5rem 1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  empty: {
    color: 'var(--text-muted)',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.25rem',
    marginBottom: '1rem',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  company: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  status: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  date: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
}
