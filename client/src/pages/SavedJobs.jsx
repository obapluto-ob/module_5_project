import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function SavedJobs() {
  const { token } = useAuth()
  const [saved, setSaved] = useState([])

  useEffect(() => {
    axios
      .get('/api/saved-jobs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSaved(res.data))
      .catch(() => setSaved([]))
  }, [token])

  async function handleRemove(id) {
    try {
      await axios.delete(`/api/saved-jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSaved(prev => prev.filter(j => j.id !== id))
    } catch {
      alert('Failed to remove saved job.')
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Saved Jobs</h2>
      {saved.length === 0 && <p style={styles.empty}>No saved jobs yet.</p>}
      {saved.map(job => (
        <div key={job.id} style={styles.card}>
          <Link to={`/jobs/${job.job_id}`} style={styles.title}>{job.job_title}</Link>
          <p style={styles.meta}>{job.company_name} &middot; {job.location}</p>
          <button onClick={() => handleRemove(job.id)} style={styles.btn}>Remove</button>
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
    gap: '0.4rem',
  },
  title: {
    fontWeight: '600',
    fontSize: '1.05rem',
    color: '#1a1a2e',
  },
  meta: {
    color: '#666',
    fontSize: '0.9rem',
  },
  btn: {
    background: '#e94560',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.9rem',
    borderRadius: '4px',
    width: 'fit-content',
    marginTop: '0.3rem',
  },
}
