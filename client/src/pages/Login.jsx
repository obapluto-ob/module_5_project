import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.btn}>Login</button>
        <Link to="/reset-password" style={styles.link}>Forgot password?</Link>
        <Link to="/register" style={styles.link}>Don't have an account? Register</Link>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    width: '360px',
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
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
  link: {
    color: '#e94560',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
}
