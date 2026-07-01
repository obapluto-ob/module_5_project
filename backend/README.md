# Job Board App — Backend

Flask REST API for the Job Board full-stack application.

## Tech Stack
- Python / Flask
- SQLAlchemy (SQLite for dev)
- Flask-JWT-Extended
- Flask-CORS

## Setup & Run Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

API runs on: `http://localhost:5000`

---

## API Endpoints

### Auth (Public)
| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/register` | `name, email, password, role` |
| POST | `/api/auth/login` | `email, password` |
| POST | `/api/auth/reset-password-request` | `email` |
| POST | `/api/auth/reset-password` | `token, new_password` |

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

### User Profile
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/user/profile` | Yes |
| PUT | `/api/user/profile` | Yes |

---

## Auth Header
All protected routes require:
```
Authorization: Bearer <jwt_token>
```

## Roles
- `employer` — can post, update, delete jobs
- `jobseeker` — can apply, save jobs, manage applications
