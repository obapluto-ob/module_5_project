from flask import Blueprint, request, jsonify
from app import db
from app.models.models import SavedJob, Job
from flask_jwt_extended import jwt_required, get_jwt_identity

saved_jobs_bp = Blueprint("saved_jobs", __name__)


@saved_jobs_bp.route("/saved-jobs", methods=["POST"])
@jwt_required()
def save_job():
    data = request.get_json()
    if not data or "job_id" not in data:
        return jsonify({"message": "job_id is required"}), 400

    user_id = int(get_jwt_identity())
    Job.query.get_or_404(data["job_id"])

    if SavedJob.query.filter_by(user_id=user_id, job_id=data["job_id"]).first():
        return jsonify({"message": "Job already saved"}), 409

    saved = SavedJob(user_id=user_id, job_id=data["job_id"])
    db.session.add(saved)
    db.session.commit()
    return jsonify({"message": "Job saved"}), 201


@saved_jobs_bp.route("/saved-jobs", methods=["GET"])
@jwt_required()
def get_saved_jobs():
    user_id = int(get_jwt_identity())
    saved = SavedJob.query.filter_by(user_id=user_id).all()
    return jsonify([s.to_dict() for s in saved]), 200


@saved_jobs_bp.route("/saved-jobs/<int:saved_id>", methods=["DELETE"])
@jwt_required()
def unsave_job(saved_id):
    saved = SavedJob.query.get_or_404(saved_id)
    user_id = int(get_jwt_identity())

    if saved.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(saved)
    db.session.commit()
    return jsonify({"message": "Job removed from saved"}), 200
