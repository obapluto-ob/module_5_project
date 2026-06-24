import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Profile() {
  const { user, token, login } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setMsg('')
    setError('')
    try {
      const res = await axios.put('/api/user/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      login(res.data.user, token)
      setMsg('Profile updated successfully.')
    } catch {
      setError('Failed to update profile.')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h2>My Profile</h2>
        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.btn}>Save Changes</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    width: '380px',
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
  btn: {
    background: '#e94560',
    color: '#fff',
    padding: '0.7rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '0.4rem',
  },
  success: {
    color: 'green',
    fontSize: '0.9rem',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
}
