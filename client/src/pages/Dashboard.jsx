import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div style={styles.container}>
      <h2>Welcome back, {user?.name}</h2>
      <p style={styles.role}>Account type: {user?.role}</p>
      <div style={styles.grid}>
        <Link to="/applications" style={styles.card}>
          <span style={styles.icon}>My Applications</span>
          <p style={styles.cardDesc}>View and track your job applications</p>
        </Link>
        <Link to="/saved-jobs" style={styles.card}>
          <span style={styles.icon}>Saved Jobs</span>
          <p style={styles.cardDesc}>Jobs you bookmarked for later</p>
        </Link>
        <Link to="/profile" style={styles.card}>
          <span style={styles.icon}>Profile</span>
          <p style={styles.cardDesc}>Update your personal information</p>
        </Link>
        {user?.role === 'employer' && (
          <Link to="/post-job" style={styles.card}>
            <span style={styles.icon}>Post a Job</span>
            <p style={styles.cardDesc}>Create a new job listing</p>
          </Link>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
  },
  role: {
    color: '#777',
    marginTop: '0.3rem',
    marginBottom: '2rem',
    textTransform: 'capitalize',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    color: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: '#666',
  },
}
