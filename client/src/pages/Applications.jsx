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
    padding: '2rem',
  },
  heading: {
    marginBottom: '1.5rem',
  },
  empty: {
    color: '#888',
  },
  card: {
    background: '#fff',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  company: {
    color: '#555',
    fontSize: '0.95rem',
  },
  status: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  date: {
    color: '#888',
    fontSize: '0.85rem',
  },
}
