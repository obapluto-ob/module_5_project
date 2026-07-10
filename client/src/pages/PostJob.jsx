import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']

export default function PostJob() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    location: '',
    job_type: 'Full-time',
    salary: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post('/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/jobs')
    } catch {
      setError('Failed to post job. Please check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <h1 style={styles.heading}>Post a Job</h1>
          <p style={styles.sub}>Fill in the details below to create a new job listing.</p>
        </div>

        <div style={styles.card}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Job Title</label>
                <input style={styles.input} name="title" value={form.title}
                  onChange={handleChange} placeholder="e.g. Frontend Developer" required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Company Name</label>
                <input style={styles.input} name="company_name" value={form.company_name}
                  onChange={handleChange} placeholder="e.g. Acme Corp" required />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Location</label>
                <input style={styles.input} name="location" value={form.location}
                  onChange={handleChange} placeholder="e.g. Nairobi, Kenya or Remote" required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Job Type</label>
                <select style={styles.input} name="job_type" value={form.job_type} onChange={handleChange}>
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Salary <span style={styles.optional}>(optional)</span>
              </label>
              <input style={styles.input} name="salary" value={form.salary}
                onChange={handleChange} placeholder="e.g. KES 80,000 – 120,000 / month" />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Job Description</label>
              <textarea style={styles.textarea} name="description" value={form.description}
                onChange={handleChange} rows={10}
                placeholder="Describe the role, responsibilities, requirements, and any other relevant details..." required />
            </div>

            <div style={styles.actions}>
              <button type="button" style={styles.cancelBtn} onClick={() => navigate('/jobs')}>
                Cancel
              </button>
              <button type="submit" style={styles.submitBtn} disabled={loading}>
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { background: 'var(--bg)', minHeight: '100vh', padding: '2.5rem 1.5rem' },
  container: { maxWidth: '760px', margin: '0 auto' },
  pageHeader: { marginBottom: '1.75rem' },
  heading: { fontSize: '1.75rem', fontWeight: '700' },
  sub: { color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.95rem' },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: 'var(--shadow)',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '1.25rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: '600' },
  optional: { fontWeight: '400', color: 'var(--text-muted)' },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  cancelBtn: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
  },
  submitBtn: {
    padding: '0.75rem 2rem',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
}
