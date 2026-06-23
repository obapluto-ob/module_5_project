import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRequestReset(e) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/reset-password-request', { email })
      setMessage('Check your email for the reset token.')
      setStep(2)
    } catch {
      setMessage('No account found with that email.')
    }
  }

  async function handleConfirmReset(e) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/reset-password', { token, new_password: newPassword })
      setMessage('Password updated successfully.')
      setStep(3)
    } catch {
      setMessage('Invalid or expired token.')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Reset Password</h2>
        {message && <p style={styles.msg}>{message}</p>}

        {step === 1 && (
          <form onSubmit={handleRequestReset} style={styles.inner}>
            <input
              style={styles.input}
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={styles.btn}>Send Reset Token</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleConfirmReset} style={styles.inner}>
            <input
              style={styles.input}
              placeholder="Paste reset token"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
            />
            <input
              style={styles.input}
              placeholder="New password"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.btn}>Reset Password</button>
          </form>
        )}

        {step === 3 && (
          <Link to="/login" style={styles.link}>Go to Login</Link>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5rem',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.7rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  btn: {
    background: '#e94560',
    color: '#fff',
    padding: '0.7rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  msg: {
    color: '#555',
    fontSize: '0.9rem',
  },
  link: {
    color: '#e94560',
    textAlign: 'center',
  },
}
