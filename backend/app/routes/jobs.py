from flask import Blueprint, request, jsonify
from app import db
from app.models.models import Job
from flask_jwt_extended import jwt_required, get_jwt_identity

jobs_bp = Blueprint("jobs", __name__)


@jobs_bp.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([j.to_dict() for j in jobs]), 200


@jobs_bp.route("/jobs/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict()), 200


@jobs_bp.route("/jobs", methods=["POST"])
@jwt_required()
def create_job():
    data = request.get_json()
    if not data or not all(k in data for k in ("title", "description")):
        return jsonify({"message": "title and description are required"}), 400

    user_id = int(get_jwt_identity())
    job = Job(
        title=data["title"],
        description=data["description"],
        salary=data.get("salary"),
        location=data.get("location"),
        job_type=data.get("job_type"),
        user_id=user_id,
        company_id=data.get("company_id"),
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job created", "job": job.to_dict()}), 201


@jobs_bp.route("/jobs/<int:job_id>", methods=["PUT"])
@jwt_required()
def update_job(job_id):
    job = Job.query.get_or_404(job_id)
    user_id = int(get_jwt_identity())
    if job.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    for field in ("title", "description", "salary", "location", "job_type", "company_id"):
        if field in data:
            setattr(job, field, data[field])

    db.session.commit()
    return jsonify({"message": "Job updated", "job": job.to_dict()}), 200


@jobs_bp.route("/jobs/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    user_id = int(get_jwt_identity())
    if job.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"}), 200
