import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function JobDetail() {
  const { id } = useParams()
  const { token } = useAuth()
  const [job, setJob] = useState(null)
  const [cover, setCover] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .finally(() => setLoading(false))
  }, [id])

  async function handleApply(e) {
    e.preventDefault()
    try {
      await axios.post(
        `/api/jobs/${id}/apply`,
        { cover_letter: cover },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMsg('Application submitted successfully.')
    } catch {
      setMsg('Could not submit application. Please make sure you are logged in.')
    }
  }

  if (loading) return <p style={styles.loading}>Loading...</p>
  if (!job) return <p style={styles.loading}>Job not found.</p>

  return (
    <div style={styles.container}>
      <h2>{job.title}</h2>
      <p style={styles.meta}>{job.company_name} &middot; {job.location} &middot; {job.job_type}</p>
      <p style={styles.salary}>{job.salary}</p>
      <p style={styles.desc}>{job.description}</p>

      {token ? (
        <form onSubmit={handleApply} style={styles.form}>
          <h3>Apply for this Role</h3>
          <textarea
            style={styles.textarea}
            placeholder="Write a short cover letter (optional)"
            value={cover}
            onChange={e => setCover(e.target.value)}
            rows={5}
          />
          <button type="submit" style={styles.btn}>Submit Application</button>
          {msg && <p style={styles.msg}>{msg}</p>}
        </form>
      ) : (
        <p style={styles.loginPrompt}>Please log in to apply for this job.</p>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '720px',
    margin: '0 auto',
  },
  meta: {
    color: '#555',
    margin: '0.5rem 0',
  },
  salary: {
    color: '#e94560',
    fontWeight: 'bold',
    margin: '0.5rem 0',
    fontSize: '1.1rem',
  },
  desc: {
    marginTop: '1rem',
    lineHeight: '1.8',
    color: '#333',
  },
  form: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textarea: {
    padding: '0.7rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  btn: {
    background: '#e94560',
    color: '#fff',
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    width: 'fit-content',
  },
  msg: {
    color: 'green',
    fontSize: '0.9rem',
  },
  loginPrompt: {
    marginTop: '2rem',
    color: '#888',
  },
  loading: {
    padding: '2rem',
  },
}
