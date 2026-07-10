import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const STEPS = ['Request Reset', 'Set New Password', 'Done']

export default function ResetPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRequestReset(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await axios.post('/api/auth/reset-password-request', { email })
      setMessage('A reset token has been sent to your email address.')
      setIsError(false)
      setStep(2)
    } catch {
      setMessage('No account found with that email address.')
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmReset(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await axios.post('/api/auth/reset-password', { token, new_password: newPassword })
      setMessage('Your password has been updated successfully.')
      setIsError(false)
      setStep(3)
    } catch {
      setMessage('The token is invalid or has expired. Please request a new one.')
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Reset Password</h2>
          <p style={styles.subtitle}>
            {step === 1 && 'Enter your email to receive a password reset token.'}
            {step === 2 && 'Enter the token from your email and choose a new password.'}
            {step === 3 && 'Your password has been reset successfully.'}
          </p>
        </div>

        {/* Step indicator */}
        <div style={styles.steps}>
          {STEPS.map((label, i) => {
            const num = i + 1
            const active = step === num
            const done = step > num
            return (
              <div key={label} style={styles.stepItem}>
                <div style={{
                  ...styles.stepCircle,
                  ...(done ? styles.stepDone : active ? styles.stepActive : {}),
                }}>
                  {done ? '✓' : num}
                </div>
                <span style={{
                  ...styles.stepLabel,
                  ...(active ? styles.stepLabelActive : {}),
                }}>{label}</span>
              </div>
            )
          })}
        </div>

        {message && (
          <div style={{ ...styles.msgBox, ...(isError ? styles.msgError : styles.msgSuccess) }}>
            {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestReset} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" placeholder="Enter your registered email"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Token'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleConfirmReset} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Reset Token</label>
              <input style={styles.input} placeholder="Paste the token from your email"
                value={token} onChange={e => setToken(e.target.value)} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>New Password</label>
              <input style={styles.input} type="password" placeholder="Enter your new password"
                value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}

        {step === 3 && (
          <Link to="/login" style={styles.doneBtn}>Go to Login</Link>
        )}

        <p style={styles.footer}>
          <Link to="/login" style={styles.footerLink}>Back to Login</Link>
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
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
  },
  header: { textAlign: 'center', marginBottom: '1.75rem' },
  title: { fontSize: '1.5rem', fontWeight: '700' },
  subtitle: { color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem', lineHeight: 1.5 },
  steps: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.75rem',
    position: 'relative',
  },
  stepItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--border)',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  stepActive: { background: 'var(--primary)', color: '#fff' },
  stepDone: { background: '#dcfce7', color: '#15803d' },
  stepLabel: { fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' },
  stepLabelActive: { color: 'var(--primary)', fontWeight: '600' },
  msgBox: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '1.25rem',
  },
  msgSuccess: { background: '#dcfce7', color: '#15803d' },
  msgError: { background: '#fee2e2', color: '#b91c1c' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: '600' },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    background: 'var(--bg)',
  },
  btn: {
    padding: '0.85rem',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
  },
  doneBtn: {
    display: 'block',
    textAlign: 'center',
    padding: '0.85rem',
    background: 'var(--primary)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' },
  footerLink: { color: 'var(--primary)', fontWeight: '600' },
}
