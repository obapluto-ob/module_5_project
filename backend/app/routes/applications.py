from flask import Blueprint, request, jsonify
from app import db
from app.models.models import Application, Job
from flask_jwt_extended import jwt_required, get_jwt_identity

applications_bp = Blueprint("applications", __name__)


@applications_bp.route("/jobs/<int:job_id>/apply", methods=["POST"])
@jwt_required()
def apply(job_id):
    Job.query.get_or_404(job_id)
    user_id = int(get_jwt_identity())

    if Application.query.filter_by(user_id=user_id, job_id=job_id).first():
        return jsonify({"message": "Already applied to this job"}), 409

    data = request.get_json() or {}
    application = Application(
        cover_letter=data.get("cover_letter"),
        resume_url=data.get("resume_url"),
        user_id=user_id,
        job_id=job_id,
    )
    db.session.add(application)
    db.session.commit()
    return jsonify({"message": "Application submitted"}), 201


@applications_bp.route("/applications", methods=["GET"])
@jwt_required()
def get_applications():
    user_id = int(get_jwt_identity())
    applications = Application.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in applications]), 200


@applications_bp.route("/applications/<int:app_id>", methods=["PUT"])
@jwt_required()
def update_application(app_id):
    application = Application.query.get_or_404(app_id)
    user_id = int(get_jwt_identity())

    # Allow applicant or job poster to update status
    if application.user_id != user_id and application.job.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    if "status" in data:
        application.status = data["status"]

    db.session.commit()
    return jsonify({"message": "Application updated"}), 200


@applications_bp.route("/applications/<int:app_id>", methods=["DELETE"])
@jwt_required()
def delete_application(app_id):
    application = Application.query.get_or_404(app_id)
    user_id = int(get_jwt_identity())

    if application.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(application)
    db.session.commit()
    return jsonify({"message": "Application deleted"}), 200
