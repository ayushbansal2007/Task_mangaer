from database.mongo import users, profiles
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET = "supersecretkey"   # baad me .env me le jaayenge

# 🔹 REGISTER
def register_user(data):
    if users.find_one({"email": data["email"]}):
        return {"error": "User already exists"}

    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed,
        "points": 0
    }

    result = users.insert_one(user)

    # 🔥 Profile created using signup data
    profiles.insert_one({
        "user_id": str(result.inserted_id),
        "city": data.get("city", ""),
        "state": data.get("state", ""),
        "goal": data.get("goal", ""),
        "feedback": data.get("feedback", "")
    })

    return {"message": "User + profile created"}


# 🔹 LOGIN
def login_user(data):
    user = users.find_one({"email": data["email"]})

    if not user:
        return {"error": "Invalid credentials"}

    if not bcrypt.checkpw(data["password"].encode(), user["password"]):
        return {"error": "Invalid credentials"}

    profile = profiles.find_one({"user_id": str(user["_id"])})

    # ✅ profile empty hai ya nahi
    profile_complete = (
        profile and
        profile["city"] != "" and
        profile["state"] != "" and
        profile["goal"] != ""
    )

    token = jwt.encode(
        {"user_id": str(user["_id"])},
        SECRET,
        algorithm="HS256"
    )

    return {
        "token": token,
        "profile_created": profile_complete
 
    }
