import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const roles = [
  { value: 'student', label: 'Student', desc: 'Looking for internships and entry-level roles' },
  { value: 'jobseeker', label: 'Job Seeker', desc: 'Searching for full-time opportunities' },
  { value: 'employer', label: 'Employer', desc: 'Hiring talent for your company' },
]

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post('/api/auth/register', form)
      navigate('/login')
    } catch {
      setError('Registration failed. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logo}>CareerHub</span>
          <h2 style={styles.title}>Create your account</h2>
          <p style={styles.subtitle}>Join thousands finding their next opportunity</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} placeholder="Jane Doe" name="name"
              value={form.name} onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input style={styles.input} placeholder="jane@example.com" type="email" name="email"
              value={form.email} onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} placeholder="Min. 8 characters" type="password" name="password"
              value={form.password} onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>I am a...</label>
            <div style={styles.roleGrid}>
              {roles.map(r => (
                <label key={r.value} style={{
                  ...styles.roleCard,
                  ...(form.role === r.value ? styles.roleCardActive : {}),
                }}>
                  <input type="radio" name="role" value={r.value}
                    checked={form.role === r.value} onChange={handleChange}
                    style={{ display: 'none' }} />
                  <span style={styles.roleLabel}>{r.label}</span>
                  <span style={styles.roleDesc}>{r.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.footerLink}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: 'var(--surface)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '460px',
    border: '1px solid var(--border)',
  },
  header: { textAlign: 'center', marginBottom: '1.75rem' },
  logo: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' },
  title: { fontSize: '1.5rem', fontWeight: '700', marginTop: '0.75rem' },
  subtitle: { color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: '600', color: 'var(--text)' },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
    background: 'var(--bg)',
  },
  roleGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  roleCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'var(--bg)',
  },
  roleCardActive: {
    border: '2px solid var(--primary)',
    background: '#eef2ff',
  },
  roleLabel: { fontWeight: '600', fontSize: '0.9rem' },
  roleDesc: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' },
  btn: {
    padding: '0.85rem',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.25rem',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' },
  footerLink: { color: 'var(--primary)', fontWeight: '600' },
}
