from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/register", methods=["POST"])
def register():
    return jsonify(register_user(request.json))

@auth_routes.route("/login", methods=["POST"])
def login():
    result = login_user(request.json)

    if "error" in result:
        return jsonify(result), 401

    return jsonify(result)
