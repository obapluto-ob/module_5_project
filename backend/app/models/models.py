from app import db
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # employer | jobseeker
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    reset_token = db.Column(db.String(256), nullable=True)

    jobs = db.relationship("Job", backref="poster", lazy=True)
    applications = db.relationship("Application", backref="applicant", lazy=True)
    saved_jobs = db.relationship("SavedJob", backref="user", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "role": self.role}


class Company(db.Model):
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    website = db.Column(db.String(200), nullable=True)
    location = db.Column(db.String(150), nullable=True)
    logo_url = db.Column(db.String(300), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    jobs = db.relationship("Job", backref="company", lazy=True)


class Job(db.Model):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    salary = db.Column(db.String(100), nullable=True)
    location = db.Column(db.String(150), nullable=True)
    job_type = db.Column(db.String(50), nullable=True)  # full-time | part-time | remote
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=True)

    applications = db.relationship("Application", backref="job", lazy=True)
    saved_by = db.relationship("SavedJob", backref="job", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "salary": self.salary,
            "location": self.location,
            "job_type": self.job_type,
            "company_name": self.company.name if self.company else None,
            "created_at": self.created_at.isoformat(),
        }


class Application(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    cover_letter = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default="pending")  # pending | accepted | rejected
    applied_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    resume_url = db.Column(db.String(300), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "job_title": self.job.title,
            "company_name": self.job.company.name if self.job.company else None,
            "status": self.status,
            "applied_at": self.applied_at.isoformat(),
            "cover_letter": self.cover_letter,
        }


class SavedJob(db.Model):
    __tablename__ = "saved_jobs"
    id = db.Column(db.Integer, primary_key=True)
    saved_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "job_id": self.job_id,
            "job_title": self.job.title,
            "company_name": self.job.company.name if self.job.company else None,
            "location": self.job.location,
        }
