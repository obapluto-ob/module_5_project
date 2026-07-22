# JobBoard

A full-stack job board app where job seekers can browse and apply for jobs and employers can post listings. Built as a group project — frontend team handled React, I handled the Flask backend.

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Flask, Flask-JWT-Extended, Flask-SQLAlchemy, Flask-Migrate
- Database: SQLite
- Dependencies managed with Pipenv

## Project Structure

```
module_5_project/
├── client/       # React frontend
└── backend/      # Flask backend
```

## Running the Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://127.0.0.1:5173`

## Running the Backend

```bash
cd backend
pipenv install
export FLASK_APP=run.py
pipenv run flask db upgrade
pipenv run python seed.py
pipenv run python run.py
```

Runs on `http://127.0.0.1:5000`

## Features

- Register and login with JWT tokens
- Password reset flow
- Browse job listings
- Apply for jobs with a cover letter
- Save jobs to come back to later
- Employer dashboard to post and manage jobs
- Protected routes so only logged in users can access certain pages

## Frontend Routes

| Path | Who can access |
|------|----------------|
| `/` | Everyone |
| `/login` | Everyone |
| `/register` | Everyone |
| `/reset-password` | Everyone |
| `/jobs` | Everyone |
| `/jobs/:id` | Everyone |
| `/dashboard` | Logged in only |
| `/applications` | Logged in only |
| `/saved-jobs` | Logged in only |
| `/profile` | Logged in only |
| `/post-job` | Logged in only |

## API Endpoints

| Method | Endpoint | Needs Auth |
|--------|----------|------------|
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

- Frontend — React, routing, auth context, UI pages
- Backend — Flask API, JWT auth, database models, migrations

## License

MIT
