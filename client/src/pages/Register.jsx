import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', form)
      navigate('/login')
    } catch {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" style={styles.btn}>Register</button>
        <Link to="/login" style={styles.link}>Already have an account? Login</Link>
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
