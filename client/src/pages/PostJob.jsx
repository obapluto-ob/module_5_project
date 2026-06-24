import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function PostJob() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    job_type: 'full-time',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await axios.post('/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/jobs')
    } catch {
      setError('Failed to post job. Please try again.')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Post a Job</h2>
        {error && <p style={styles.error}>{error}</p>}
        <label style={styles.label}>Job Title</label>
        <input
          style={styles.input}
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          required
        />
        <label style={styles.label}>Salary</label>
        <input
          style={styles.input}
          name="salary"
          placeholder="e.g. $60,000/yr"
          value={form.salary}
          onChange={handleChange}
        />
        <label style={styles.label}>Location</label>
        <input
          style={styles.input}
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <label style={styles.label}>Job Type</label>
        <select style={styles.input} name="job_type" value={form.job_type} onChange={handleChange}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
        <button type="submit" style={styles.btn}>Post Job</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    width: '480px',
  },
  label: {
    fontSize: '0.9rem',
    color: '#444',
    fontWeight: '500',
  },
  input: {
    padding: '0.7rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
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
    padding: '0.7rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '0.4rem',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
}
