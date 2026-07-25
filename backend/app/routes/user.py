from flask import Blueprint, request, jsonify
from app import db
from app.models.models import User
from app.schemas import user_schema
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint("user", __name__)


@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    return jsonify(user_schema.dump(user)), 200


@user_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if "name" in data:
        user.name = data["name"]
    if "email" in data:
        if User.query.filter(User.email == data["email"], User.id != user_id).first():
            return jsonify({"message": "Email already in use"}), 409
        user.email = data["email"]

    db.session.commit()
    return jsonify({"user": user_schema.dump(user)}), 200
