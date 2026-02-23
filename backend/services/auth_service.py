from database.mongo import users, profiles
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET = "supersecretkey"   # baad me .env me le jaayenge

# 🔹 REGISTER
# services/auth_service.py update

# services/auth_service.py

def register_user(data):
    if users.find_one({"email": data["email"]}):
        return {"error": "User already exists"}

    hashed = bcrypt.hashpw(data["password"].encode(), bcrypt.gensalt())

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed,
        "phone": data.get("whatsapp_number"),  # Frontend se aaya hua number
        "points": 0
    }

    result = users.insert_one(user)

    # Profile mein bhi details save karein
    profiles.insert_one({
        "user_id": str(result.inserted_id),
        "city": data.get("city", ""),
        "state": data.get("state", ""),
        "goal": data.get("goal", ""),
        "phone": data.get("whatsapp_number") # Future use ke liye
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
         "user_id": str(user["_id"]), 
        "token": token,
        "profile_created": profile_complete
 
    }
