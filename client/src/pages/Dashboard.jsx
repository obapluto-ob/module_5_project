import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const studentCards = [
  { to: '/applications', title: 'My Applications', desc: 'Track the status of your internship and job applications.' },
  { to: '/saved-jobs', title: 'Saved Jobs', desc: 'Review jobs you have bookmarked for later.' },
  { to: '/profile', title: 'My Profile', desc: 'Update your resume link, university, and personal details.' },
  { to: '/jobs?type=internship', title: 'Browse Internships', desc: 'Find internship opportunities from hiring companies.' },
]

const jobseekerCards = [
  { to: '/applications', title: 'My Applications', desc: 'View and track your job applications.' },
  { to: '/saved-jobs', title: 'Saved Jobs', desc: 'Jobs you have bookmarked for later.' },
  { to: '/profile', title: 'Profile', desc: 'Update your personal information.' },
]

const employerCards = [
  { to: '/post-job', title: 'Post a Job', desc: 'Create a new job listing for candidates to apply.' },
  { to: '/jobs', title: 'Browse Listings', desc: 'View all active job posts on the platform.' },
  { to: '/profile', title: 'Company Profile', desc: 'Manage your employer profile and company details.' },
]

const roleCards = {
  student: studentCards,
  jobseeker: jobseekerCards,
  employer: employerCards,
}

const roleBadgeStyle = {
  student: { background: '#ede9fe', color: '#7c3aed' },
  jobseeker: { background: '#dbeafe', color: '#1d4ed8' },
  employer: { background: '#dcfce7', color: '#15803d' },
}

const roleLabel = {
  student: 'Student',
  jobseeker: 'Job Seeker',
  employer: 'Employer',
}

export default function Dashboard() {
  const { user } = useAuth()
  const cards = roleCards[user?.role] || jobseekerCards
  const badgeStyle = roleBadgeStyle[user?.role] || roleBadgeStyle.jobseeker

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.avatarLg}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <h2 style={styles.welcome}>Welcome back, {user?.name}</h2>
            <span style={{ ...styles.badge, ...badgeStyle }}>
              {roleLabel[user?.role] || 'Job Seeker'}
            </span>
          </div>
        </div>

        {user?.role === 'student' && (
          <div style={styles.notice}>
            <strong>Complete your profile</strong> — add your university, graduation year, and resume link
            to improve your chances with employers.{' '}
            <Link to="/profile" style={styles.noticeLink}>Update profile</Link>
          </div>
        )}

        <div style={styles.grid}>
          {cards.map(card => (
            <Link to={card.to} key={card.title} style={styles.card}>
              <p style={styles.cardTitle}>{card.title}</p>
              <p style={styles.cardDesc}>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { background: 'var(--bg)', minHeight: '100vh', padding: '2.5rem 1.5rem' },
  container: { maxWidth: '900px', margin: '0 auto' },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    marginBottom: '1.75rem',
  },
  avatarLg: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  welcome: { fontSize: '1.4rem', fontWeight: '700' },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: '600',
    marginTop: '0.4rem',
  },
  notice: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '0.9rem 1.1rem',
    marginBottom: '2rem',
    fontSize: '0.875rem',
    color: '#92400e',
    lineHeight: 1.6,
  },
  noticeLink: { color: '#b45309', fontWeight: '600', textDecoration: 'underline' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    color: 'var(--text)',
    boxShadow: 'var(--shadow)',
  },
  cardTitle: { fontWeight: '700', fontSize: '1rem' },
  cardDesc: { fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 },
}
