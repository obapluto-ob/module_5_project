import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>JobBoard</Link>
      <div style={styles.links}>
        <Link to="/jobs" style={styles.link}>Browse Jobs</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/saved-jobs" style={styles.link}>Saved</Link>
            <Link to="/applications" style={styles.link}>Applications</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1a1a2e',
    color: '#fff',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#e94560',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
  },
  btn: {
    background: '#e94560',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 1rem',
    borderRadius: '4px',
  },
}
