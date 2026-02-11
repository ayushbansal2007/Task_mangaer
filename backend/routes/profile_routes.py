from flask import Blueprint, request, jsonify
from database.mongo import profiles

profile_routes = Blueprint("profile_routes", __name__)

@profile_routes.route("/profile/<user_id>", methods=["GET"])
def get_profile(user_id):
    profile = profiles.find_one({"user_id": user_id}, {"_id": 0})
    return jsonify(profile)

@profile_routes.route("/profile/<user_id>", methods=["PUT"])
def update_profile(user_id):
    profiles.update_one(
        {"user_id": user_id},
        {"$set": request.json}
    )
    return jsonify({"message": "Profile updated"})
