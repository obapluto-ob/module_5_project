import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Profile() {
  const { user, token, login } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    graduation_year: user?.graduation_year || '',
    resume_url: user?.resume_url || '',
    bio: user?.bio || '',
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setMsg('')
    setError('')
    setLoading(true)
    try {
      const res = await axios.put('/api/user/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      login(res.data.user, token)
      setMsg('Profile updated successfully.')
    } catch {
      setError('Could not update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isStudent = user?.role === 'student'

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <h2 style={styles.name}>{user?.name}</h2>
            <span style={styles.role}>{user?.role}</span>
          </div>
        </div>

        {msg && <div style={styles.successBox}>{msg}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleUpdate} style={styles.form}>
          <h3 style={styles.sectionTitle}>Basic Info</h3>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Bio</label>
            <textarea style={styles.textarea} name="bio" value={form.bio}
              onChange={handleChange} placeholder="Tell employers a bit about yourself..." rows={3} />
          </div>

          {isStudent && (
            <>
              <h3 style={{ ...styles.sectionTitle, marginTop: '0.5rem' }}>Student Details</h3>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>University / College</label>
                  <input style={styles.input} name="university" value={form.university}
                    onChange={handleChange} placeholder="e.g. University of Nairobi" />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Graduation Year</label>
                  <input style={styles.input} name="graduation_year" type="number"
                    value={form.graduation_year} onChange={handleChange}
                    placeholder="e.g. 2026" min="2020" max="2035" />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Resume / CV Link</label>
                <input style={styles.input} name="resume_url" value={form.resume_url}
                  onChange={handleChange} placeholder="https://drive.google.com/..." />
                <span style={styles.hint}>Link to your Google Drive, Dropbox, or portfolio</span>
              </div>
            </>
          )}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  page: {
    background: 'var(--bg)',
    minHeight: '100vh',
    padding: '2.5rem 1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    padding: '2rem',
    width: '100%',
    maxWidth: '640px',
    height: 'fit-content',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.75rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--border)',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  name: { fontSize: '1.2rem', fontWeight: '700' },
  role: {
    display: 'inline-block',
    background: '#ede9fe',
    color: '#7c3aed',
    padding: '0.2rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: '0.3rem',
  },
  successBox: {
    background: '#dcfce7',
    color: '#15803d',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionTitle: { fontSize: '1rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: { fontSize: '0.85rem', fontWeight: '600' },
  input: {
    padding: '0.7rem 0.9rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
  },
  textarea: {
    padding: '0.7rem 0.9rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
    resize: 'vertical',
  },
  hint: { fontSize: '0.78rem', color: 'var(--text-muted)' },
  btn: {
    padding: '0.85rem',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
}
