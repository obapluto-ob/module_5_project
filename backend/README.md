# JobBoard — Backend

This is the Flask backend for our job board project. It handles all the API routes, user auth with JWT, and the database using SQLAlchemy with Alembic migrations.

## What I used

- Flask
- Flask-SQLAlchemy
- Flask-Migrate (Alembic)
- Flask-JWT-Extended
- Flask-CORS
- Werkzeug
- Pipenv for managing dependencies

## How to run it

```bash
cd backend
pipenv install
export FLASK_APP=run.py
pipenv run flask db upgrade
pipenv run python seed.py
pipenv run python run.py
```

API runs on `http://127.0.0.1:5000`

## Database

Using SQLite for development. Migrations are handled by Flask-Migrate so I don't have to manually create tables — just run `flask db upgrade` and it handles everything.

Models:
- User — stores name, email, hashed password, role (employer or jobseeker)
- Company — linked to an employer user
- Job — posted by an employer, linked to a company
- Application — a jobseeker applying to a job with a cover letter
- SavedJob — a jobseeker saving a job for later

## Seed data

The seed file adds some Kenyan companies (Safaricom, Andela, Cellulant, Twiga Foods) with jobs in Nairobi and salaries in KES. Login with `employer@test.com / 123456` to test employer features.

## API Endpoints

### Auth
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/register` | name, email, password, role |
| POST | `/api/auth/login` | email, password |
| POST | `/api/auth/reset-password-request` | email |
| POST | `/api/auth/reset-password` | token, new_password |

### Jobs
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/jobs` | No |
| GET | `/api/jobs/:id` | No |
| POST | `/api/jobs` | Yes |
| PUT | `/api/jobs/:id` | Yes |
| DELETE | `/api/jobs/:id` | Yes |

### Applications
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/jobs/:id/apply` | Yes |
| GET | `/api/applications` | Yes |
| PUT | `/api/applications/:id` | Yes |
| DELETE | `/api/applications/:id` | Yes |

### Saved Jobs
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/saved-jobs` | Yes |
| GET | `/api/saved-jobs` | Yes |
| DELETE | `/api/saved-jobs/:id` | Yes |

### Profile
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/user/profile` | Yes |
| PUT | `/api/user/profile` | Yes |

## Auth

Protected routes need this header:
```
Authorization: Bearer <token>
```

The token comes back from `/api/auth/login`.

## Roles

- `employer` — can post, edit and delete jobs
- `jobseeker` — can apply, save jobs and manage their applications
