from database.mongo import tasks  # Ensure ye import sahi ho
from bson import ObjectId

def create_task(data):
    try:
        task = {
            "user_id": ObjectId(data["user_id"]),
            "title": data["title"],
            "days": data["days"],
            "time": data["time"],
            "completed": False,
            "points": 0
        }
        tasks.insert_one(task)
        return {"message": "Task created successfully"}
    except Exception as e:
        print(f"Error creating task: {e}")
        return {"error": "Failed to create task"}, 500

def get_tasks(user_id):
    try:
        
        cursor = tasks.find({"user_id": ObjectId(user_id)})
        
        results = []
        for task in cursor:
            
            task["_id"] = str(task["_id"])       
            task["user_id"] = str(task["user_id"]) 
            results.append(task)
 
        return results
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return []


def delete_task_service(task_id):
    try:
    
        res = tasks.delete_one({"_id": ObjectId(task_id)})
        
        if res.deleted_count > 0:
            return {"message": "Bhai, task delete ho gaya!"}
        return {"error": "Task nahi mila"}, 404
    except Exception as e:
        print(f"Error deleting task: {e}")
        return {"error": "Delete karne mein dikat aayi"}, 500

def update_task_service(task_id, data):
    try:
        
        updated_fields = {
            "title": data.get("title"),
            "time": data.get("time"),
            "days": data.get("days")
        }
        
    
        res = tasks.update_one(
            {"_id": ObjectId(task_id)}, 
            {"$set": updated_fields}
        )
     
        if res.matched_count > 0:
            return {"message": "Task update ho gaya!"}
        return {"error": "Task nahi mila"}, 404
    except Exception as e:
        print(f"Error updating task: {e}")
        return {"error": "Update fail ho gaya"}, 500
    

def complete_task_service(task_id):
    try:
        
        task = tasks.find_one({"_id": ObjectId(task_id)})
        
        if not task:
            return {"error": "Bhai, task mila hi nahi!"}, 404

        user_id = task.get("user_id")

        
        
        from database.mongo import db 
        db.profiles.update_one(
            {"user_id": ObjectId(user_id)},
            {"$inc": {"points": 10}} 
        )

        
        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"completed": True}}
        )

    
        

        return {"message": "Shabaash! +10 points mil gaye.", "new_points": 10}

    except Exception as e:
        print(f"Error completing task: {e}")
        return {"error": "Points update nahi ho paye"}, 500