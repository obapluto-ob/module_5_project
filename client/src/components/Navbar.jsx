import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          CareerHub
        </Link>

        <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
          <Link to="/jobs" style={{ ...styles.link, ...(isActive('/jobs') ? styles.activeLink : {}) }}>
            Browse Jobs
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" style={{ ...styles.link, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>
                Dashboard
              </Link>
              <Link to="/saved-jobs" style={{ ...styles.link, ...(isActive('/saved-jobs') ? styles.activeLink : {}) }}>
                Saved
              </Link>
              <Link to="/applications" style={{ ...styles.link, ...(isActive('/applications') ? styles.activeLink : {}) }}>
                Applications
              </Link>
              <Link to="/profile" style={{ ...styles.link, ...(isActive('/profile') ? styles.activeLink : {}) }}>
                Profile
              </Link>
              <div style={styles.userInfo}>
                <span style={styles.avatar}>{user.name?.[0]?.toUpperCase()}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Get Started</Link>
            </>
          )}
        </div>

        <button style={styles.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#0f172a',
    borderBottom: '1px solid #1e293b',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  linksOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '64px',
    left: 0,
    right: 0,
    background: '#0f172a',
    padding: '1rem 1.5rem',
    gap: '0.5rem',
    borderBottom: '1px solid #1e293b',
  },
  link: {
    color: '#94a3b8',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  activeLink: {
    color: '#fff',
    background: '#1e293b',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginLeft: '0.5rem',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.85rem',
  },
  logoutBtn: {
    background: 'transparent',
    color: '#94a3b8',
    border: '1px solid #334155',
    padding: '0.35rem 0.85rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
  },
  loginBtn: {
    color: '#94a3b8',
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  registerBtn: {
    background: 'var(--primary)',
    color: '#fff',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginLeft: '0.25rem',
  },
  hamburger: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.4rem',
  },
}
