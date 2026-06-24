import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('/api/jobs').then(res => setJobs(res.data)).catch(() => setJobs([]))
  }, [])

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Browse Jobs</h2>
      <input
        style={styles.search}
        placeholder="Search by title or location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length === 0 && <p style={styles.empty}>No jobs found.</p>}
      <div style={styles.grid}>
        {filtered.map(job => (
          <Link to={`/jobs/${job.id}`} key={job.id} style={styles.card}>
            <h3 style={styles.title}>{job.title}</h3>
            <p style={styles.company}>{job.company_name}</p>
            <p style={styles.meta}>{job.location} &middot; {job.job_type}</p>
            <p style={styles.salary}>{job.salary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
  },
  search: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  empty: {
    color: '#888',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: '#fff',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    color: '#1a1a2e',
  },
  title: {
    fontSize: '1.1rem',
  },
  company: {
    color: '#555',
    fontSize: '0.95rem',
  },
  meta: {
    color: '#777',
    fontSize: '0.9rem',
  },
  salary: {
    color: '#e94560',
    fontWeight: 'bold',
    marginTop: '0.4rem',
  },
}
