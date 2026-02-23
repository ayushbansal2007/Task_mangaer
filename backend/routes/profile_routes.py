from flask import Blueprint, request, jsonify
from database.mongo import profiles, users 
from bson import ObjectId

profile_routes = Blueprint("profile_routes", __name__)

@profile_routes.route("/profile/<user_id>", methods=["GET"])
def get_profile(user_id):
    try:
        profile_data = profiles.find_one({"user_id": user_id}, {"_id": 0})
        user_data = users.find_one({"_id": user_id})
        if not user_data:
            try:
                user_data = users.find_one({"_id": ObjectId(user_id)})
            except:
                pass

        if not profile_data:
            profile_data = {}
            
        if user_data:
            # Username agar profile mein nahi hai toh users se le lo
            profile_data["username"] = profile_data.get("username") or user_data.get("username", "Warrior")
            profile_data["points"] = user_data.get("points", 0)
        else:
            profile_data["points"] = 0

        return jsonify(profile_data), 200
    except Exception as e:
        print(f"🔥 Profile Fetch Error: {e}")
        return jsonify({"error": str(e)}), 500

@profile_routes.route("/profile/<user_id>", methods=["PUT"])
def update_profile(user_id):
    profiles.update_one(
        {"user_id": user_id},
        {"$set": request.json},
        upsert=True 
    )
    return jsonify({"message": "Profile updated"})

@profile_routes.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    try:
        # 1. Pehle top points wale users uthao
        top_users_cursor = users.find({}, {"username": 1, "points": 1}).sort("points", -1).limit(10)
        
        leaderboard_data = []
        for u in top_users_cursor:
            uid = str(u["_id"])
            
            # 2. Check karo kya is user ka username 'users' collection mein hai?
            name = u.get("username")
            goal = "Mission"

            # 3. Agar 'users' mein username nahi hai, toh 'profiles' table check karo
            if not name:
                prof = profiles.find_one({"user_id": uid})
                if prof:
                    name = prof.get("username") or prof.get("name")
                    goal = prof.get("goal", "Discipline")

            leaderboard_data.append({
                "_id": uid,
                "username": name or "Warrior", # Agar kahin bhi nahi mila toh 'Warrior' dikhayega
                "points": u.get("points", 0),
                "goal": goal
            })
            
        return jsonify(leaderboard_data), 200
    except Exception as e:
        print(f"🔥 Leaderboard Error: {e}")
        return jsonify({"error": str(e)}), 500