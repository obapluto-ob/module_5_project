from flask import Blueprint, request, jsonify
from app import db
from app.models.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import select

user_bp = Blueprint("user", __name__)


@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = db.get_or_404(User, user_id)
    return jsonify(user.to_dict()), 200


@user_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = db.get_or_404(User, user_id)
    data = request.get_json()

    if "name" in data:
        user.name = data["name"]
    if "email" in data:
        if db.session.execute(select(User).where(User.email == data["email"], User.id != user_id)).scalar_one_or_none():
            return jsonify({"message": "Email already in use"}), 409
        user.email = data["email"]

    db.session.commit()
    return jsonify({"user": user.to_dict()}), 200
