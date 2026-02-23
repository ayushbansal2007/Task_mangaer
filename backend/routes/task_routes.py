from flask import Blueprint, request, jsonify
from services.task_service import (
    create_task, 
    get_tasks, 
    delete_task_service, 
    update_task_service
)
from database.mongo import tasks, users, task_history # <--- task_history Yahan add kiya
from bson import ObjectId
from datetime import datetime, timedelta


task_routes = Blueprint("task_routes", __name__)

# 1. Add Task
@task_routes.route("/tasks", methods=["POST", "OPTIONS"])
def add_task():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return jsonify(create_task(request.json))

# 2. Fetch Tasks
@task_routes.route("/tasks/<user_id>", methods=["GET"])
def fetch_tasks(user_id):
    return jsonify(get_tasks(user_id))

# 3. Delete Task (Manual delete)
@task_routes.route("/tasks/<task_id>", methods=["DELETE"])
def remove_task(task_id):
    result = delete_task_service(task_id)
    return jsonify(result)

# 4. Edit Task
@task_routes.route("/tasks/<task_id>", methods=["PUT"])
def edit_task(task_id):
    result = update_task_service(task_id, request.json)
    return jsonify(result)

# 5. Complete Task (Points + History Logic)
@task_routes.route("/tasks/complete/<task_id>", methods=["POST", "OPTIONS"])
def complete_task(task_id):
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        user_id = data.get('userId') or data.get('user_id')

        if not user_id:
            return jsonify({"error": "User ID missing"}), 400

        # --- PEHLE TASK KA DATA NIKAL LO ---
        task_to_complete = tasks.find_one({"_id": ObjectId(task_id)})
        if not task_to_complete:
            return jsonify({"error": "Task not found"}), 404

        # --- POINTS UPDATE LOGIC ---
        user_update = users.update_one({"_id": user_id}, {"$inc": {"points": 10}})
        if user_update.matched_count == 0:
            try:
                user_update = users.update_one({"_id": ObjectId(user_id)}, {"$inc": {"points": 10}})
            except: pass

        if user_update.matched_count == 0:
            return jsonify({"error": "User not found"}), 404

        # --- HISTORY CREATE KARO ---
        task_history.insert_one({
            "user_id": user_id,
            "title": task_to_complete.get("title", "Unnamed Task"),
            "points_earned": 10,
            "completed_at": datetime.now(),
            "status": "completed"
        })

        # --- MAIN TASK DELETE KARO ---
        tasks.delete_one({"_id": ObjectId(task_id)})

        return jsonify({"message": "Success! Points added and history updated", "points": 10}), 200

    except Exception as e:
        print(f"🔥 Backend Error: {e}")
        return jsonify({"error": str(e)}), 500

# 6. Fetch History
@task_routes.route("/tasks/history/<user_id>", methods=["GET"])
def get_task_history(user_id):
    try:
        # User ki history nikalo, latest pehle
        history = list(task_history.find({"user_id": user_id}).sort("completed_at", -1).limit(20))
        for h in history:
            h["_id"] = str(h["_id"])
            # Format date for frontend
            if "completed_at" in h:
                h["completed_at"] = h["completed_at"].strftime("%d %b, %I:%M %p")
        return jsonify(history), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@task_routes.route("/analytics/<user_id>", methods=["GET"])
def get_analytics(user_id):
    try:
        # Pichle 7 din ki range calculate karo
        end_date = datetime.now()
        start_date = end_date - timedelta(days=6)
        
        # History se data fetch karo
        history_data = list(task_history.find({
            "user_id": user_id,
            "completed_at": {"$gte": start_date, "$lte": end_date}
        }))

        # Dinon ke hisaab se points ka chart data banao
        # Format: {"Mon": 20, "Tue": 50...}
        stats = {}
        for i in range(7):
            day_name = (start_date + timedelta(days=i)).strftime("%a")
            stats[day_name] = 0

        for entry in history_data:
            day_name = entry["completed_at"].strftime("%a")
            if day_name in stats:
                stats[day_name] += entry.get("points_earned", 10)

        # Frontend ke liye array format mein convert karo
        chart_data = [{"day": k, "points": v} for k, v in stats.items()]
        
        return jsonify(chart_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500