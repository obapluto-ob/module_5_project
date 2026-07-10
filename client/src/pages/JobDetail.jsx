import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function JobDetail() {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [job, setJob] = useState(null)
  const [cover, setCover] = useState('')
  const [applyMsg, setApplyMsg] = useState('')
  const [applyError, setApplyError] = useState('')
  const [saveMsg, setSaveMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    axios.get(`/api/jobs/${id}`).then(res => setJob(res.data)).catch(() => {})
  }, [id])

  async function handleApply(e) {
    e.preventDefault()
    setLoading(true)
    setApplyMsg('')
    setApplyError('')
    try {
      await axios.post(`/api/jobs/${id}/apply`, { cover_letter: cover },
        { headers: { Authorization: `Bearer ${token}` } })
      setApplyMsg('Your application has been submitted successfully.')
      setApplied(true)
    } catch {
      setApplyError('Could not submit your application. Please make sure you are logged in.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      await axios.post(`/api/saved-jobs`, { job_id: id },
        { headers: { Authorization: `Bearer ${token}` } })
      setSaveMsg('Job saved.')
    } catch {
      setSaveMsg('Could not save job.')
    }
  }

  if (!job) return <div style={styles.loading}>Loading job details...</div>

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.companyAvatar}>{(job.company_name || 'C')[0].toUpperCase()}</div>
          <div style={styles.headerInfo}>
            <h1 style={styles.title}>{job.title}</h1>
            <p style={styles.company}>{job.company_name}</p>
          </div>
        </div>

        <div style={styles.layout}>
          {/* Main content */}
          <div style={styles.main}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Job Description</h2>
              <p style={styles.description}>{job.description}</p>
            </div>

            {/* Apply form */}
            {token ? (
              applied ? (
                <div style={styles.successBox}>
                  {applyMsg}
                </div>
              ) : (
                <div style={styles.section}>
                  <h2 style={styles.sectionTitle}>Apply for this Role</h2>
                  {applyError && <div style={styles.errorBox}>{applyError}</div>}
                  <form onSubmit={handleApply} style={styles.form}>
                    <div style={styles.field}>
                      <label style={styles.label}>Cover Letter <span style={styles.optional}>(optional)</span></label>
                      <textarea
                        style={styles.textarea}
                        placeholder="Briefly explain why you are a good fit for this role..."
                        value={cover}
                        onChange={e => setCover(e.target.value)}
                        rows={6}
                      />
                    </div>
                    <button type="submit" style={styles.applyBtn} disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </div>
              )
            ) : (
              <div style={styles.loginPrompt}>
                <p>You need to be logged in to apply for this job.</p>
                <Link to="/login" style={styles.loginLink}>Sign in to apply</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <div style={styles.sideCard}>
              <h3 style={styles.sideTitle}>Job Overview</h3>
              <div style={styles.metaList}>
                {job.location && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaKey}>Location</span>
                    <span style={styles.metaVal}>{job.location}</span>
                  </div>
                )}
                {job.job_type && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaKey}>Job Type</span>
                    <span style={styles.metaVal}>{job.job_type}</span>
                  </div>
                )}
                {job.salary && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaKey}>Salary</span>
                    <span style={{ ...styles.metaVal, color: 'var(--primary)', fontWeight: '700' }}>{job.salary}</span>
                  </div>
                )}
                {job.company_name && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaKey}>Company</span>
                    <span style={styles.metaVal}>{job.company_name}</span>
                  </div>
                )}
              </div>

              {token && !applied && (
                <div style={styles.saveRow}>
                  <button onClick={handleSave} style={styles.saveBtn}>Save Job</button>
                  {saveMsg && <span style={styles.saveMsg}>{saveMsg}</span>}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { background: 'var(--bg)', minHeight: '100vh', padding: '2.5rem 1.5rem' },
  container: { maxWidth: '1000px', margin: '0 auto' },
  loading: { padding: '3rem', color: 'var(--text-muted)' },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--border)',
  },
  companyAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: '#eef2ff',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  headerInfo: {},
  title: { fontSize: '1.6rem', fontWeight: '800', lineHeight: 1.2 },
  company: { color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '1rem' },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  main: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  section: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.75rem',
  },
  sectionTitle: { fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' },
  description: { color: 'var(--text)', lineHeight: 1.8, fontSize: '0.95rem', whiteSpace: 'pre-wrap' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: '600' },
  optional: { fontWeight: '400', color: 'var(--text-muted)' },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    resize: 'vertical',
    background: 'var(--bg)',
    fontFamily: 'inherit',
  },
  applyBtn: {
    padding: '0.85rem 2rem',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    width: 'fit-content',
  },
  successBox: {
    background: '#dcfce7',
    color: '#15803d',
    padding: '1rem 1.25rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    border: '1px solid #bbf7d0',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  loginPrompt: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    color: 'var(--text-muted)',
  },
  loginLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  sidebar: {},
  sideCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.5rem',
    position: 'sticky',
    top: '80px',
  },
  sideTitle: { fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem' },
  metaList: { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '0.15rem' },
  metaKey: { fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' },
  metaVal: { fontSize: '0.95rem', color: 'var(--text)' },
  saveRow: { marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  saveBtn: {
    width: '100%',
    padding: '0.75rem',
    background: 'transparent',
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  saveMsg: { fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' },
}
