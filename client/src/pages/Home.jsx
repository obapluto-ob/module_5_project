import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    title: 'Built for Students',
    desc: 'Find internships, part-time roles, and entry-level positions that fit your schedule and career goals.',
  },
  {
    title: 'Filter & Search',
    desc: 'Narrow down opportunities by job type, location, and keyword to find exactly what you are looking for.',
  },
  {
    title: 'Track Applications',
    desc: 'Save jobs you are interested in and monitor the status of every application from your dashboard.',
  },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>For students and early-career professionals</p>
          <h1 style={styles.heading}>Find your next opportunity</h1>
          <p style={styles.sub}>
            Browse internships, graduate roles, and full-time positions from companies actively hiring.
            Create a free account to apply and track your progress.
          </p>
          <div style={styles.ctaRow}>
            <Link to="/jobs" style={styles.btnPrimary}>Browse Jobs</Link>
            {!user && <Link to="/register" style={styles.btnOutline}>Create Account</Link>}
            {user && <Link to="/dashboard" style={styles.btnOutline}>Go to Dashboard</Link>}
          </div>
        </div>
      </section>

      <section style={styles.features}>
        <div style={styles.featuresInner}>
          <h2 style={styles.sectionTitle}>Everything you need to land the job</h2>
          <div style={styles.featureGrid}>
            {features.map(f => (
              <div key={f.title} style={styles.featureCard}>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section style={styles.banner}>
          <div style={styles.bannerInner}>
            <h2 style={styles.bannerTitle}>Start your job search today</h2>
            <p style={styles.bannerSub}>
              Create a free account to apply to jobs, save listings, and track your applications.
            </p>
            <Link to="/register" style={styles.btnPrimaryDark}>Create a Free Account</Link>
          </div>
        </section>
      )}
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  heroContent: { maxWidth: '680px', margin: '0 auto' },
  eyebrow: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#a5b4fc',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '1.25rem',
  },
  sub: {
    fontSize: '1.05rem',
    color: '#94a3b8',
    marginBottom: '2rem',
    lineHeight: 1.75,
  },
  ctaRow: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: 'var(--primary)',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
  },
  btnOutline: {
    background: 'transparent',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  features: {
    background: 'var(--bg)',
    padding: '5rem 1.5rem',
  },
  featuresInner: { maxWidth: '1100px', margin: '0 auto' },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '2.5rem',
    textAlign: 'center',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '2rem',
  },
  featureTitle: { fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.6rem' },
  featureDesc: { color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 },
  banner: {
    background: 'var(--primary)',
    padding: '5rem 1.5rem',
  },
  bannerInner: { maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
  bannerTitle: { fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' },
  bannerSub: { color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: 1.65 },
  btnPrimaryDark: {
    background: '#fff',
    color: 'var(--primary)',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'inline-block',
  },
}
