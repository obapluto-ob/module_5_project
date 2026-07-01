# JobBoard

A full-stack job board web application where job seekers can browse and apply for jobs, and employers can post listings.

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Flask, Flask-JWT-Extended, SQLAlchemy
- **Database:** SQLite (development)

## Project Structure

```
module_5_project/
├── client/       # React frontend
└── backend/      # Flask backend
```

## Getting Started

### Prerequisites

- Node.js v20+
- Python 3.10+

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
python seed.py
python run.py
```

Runs on `http://localhost:5000`

---

## Features

- User registration and login with JWT authentication
- Password reset flow
- Browse and search job listings
- Apply for jobs with a cover letter
- Save jobs for later
- Employer dashboard to post and manage job listings
- Protected routes for authenticated users

## Routes

| Path | Access |
|------|--------|
| `/` | Public |
| `/login` | Public |
| `/register` | Public |
| `/reset-password` | Public |
| `/jobs` | Public |
| `/jobs/:id` | Public |
| `/dashboard` | Protected |
| `/applications` | Protected |
| `/saved-jobs` | Protected |
| `/profile` | Protected |
| `/post-job` | Protected |

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| POST | `/api/auth/reset-password-request` | No |
| POST | `/api/auth/reset-password` | No |
| GET | `/api/jobs` | No |
| GET | `/api/jobs/:id` | No |
| POST | `/api/jobs` | Yes |
| PUT | `/api/jobs/:id` | Yes |
| DELETE | `/api/jobs/:id` | Yes |
| POST | `/api/jobs/:id/apply` | Yes |
| GET | `/api/applications` | Yes |
| PUT | `/api/applications/:id` | Yes |
| DELETE | `/api/applications/:id` | Yes |
| GET | `/api/saved-jobs` | Yes |
| POST | `/api/saved-jobs` | Yes |
| DELETE | `/api/saved-jobs/:id` | Yes |
| GET | `/api/user/profile` | Yes |
| PUT | `/api/user/profile` | Yes |

## Team

- Frontend — React SPA, routing, auth, UI
- Backend — Flask REST API, JWT, database models

## License

MIT
