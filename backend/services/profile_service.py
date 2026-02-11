from database.mongo import users

def create_profile(user_id, data):
    users.update_one(
        {"_id": user_id},
        {"$set": {
            "profile": data,
            "profile_created": True
        }}
    )
