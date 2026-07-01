from flask import Blueprint, request, jsonify
from app import db
from app.models.models import User
from flask_jwt_extended import create_access_token
import secrets

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "email", "password", "role")):
        return jsonify({"message": "Missing required fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already registered"}), 409

    user = User(name=data["name"], email=data["email"], role=data["role"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"message": "Missing required fields"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify({"message": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.to_dict()}), 200


@auth_bp.route("/reset-password-request", methods=["POST"])
def reset_password_request():
    data = request.get_json()
    if not data or "email" not in data:
        return jsonify({"message": "Email is required"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"message": "If that email exists, a reset token has been sent"}), 200

    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.session.commit()

    # In production replace this with an actual email service
    return jsonify({"message": "Password reset token generated", "reset_token": reset_token}), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    if not data or not all(k in data for k in ("token", "new_password")):
        return jsonify({"message": "Missing required fields"}), 400

    user = User.query.filter_by(reset_token=data["token"]).first()
    if not user:
        return jsonify({"message": "Invalid or expired token"}), 400

    user.set_password(data["new_password"])
    user.reset_token = None
    db.session.commit()
    return jsonify({"message": "Password reset successfully"}), 200
