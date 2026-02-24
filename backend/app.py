import pytz
import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_apscheduler import APScheduler
from datetime import datetime, timedelta

# Routes imports
from routes.auth_routes import auth_routes
from routes.profile_routes import profile_routes
from routes.task_routes import task_routes
from database.mongo import tasks, users
from services.whatsapp_service import send_whatsapp_reminder

app = Flask(__name__)

# --- 1. GLOBAL CORS CONFIGURATION ---
# Ye line akele kafi hai saare CORS issues handle karne ke liye
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# --- SMART SCHEDULER LOGIC ---
scheduler = APScheduler()

def check_and_send_reminders():
    try:
        IST = pytz.timezone('Asia/Kolkata')
        now = datetime.now(IST)
        current_time = now.strftime("%H:%M") 
        current_day = now.strftime("%A").lower() 
        
        matched_tasks = list(tasks.find({"time": current_time, "days": current_day}))
        for task in matched_tasks:
            user = users.find_one({"_id": task["user_id"]})
            if user and user.get("phone"):
                send_whatsapp_reminder(user["phone"], f"🚀 MISSION START: {task['title']}! Khatam karke points claim karo.")

        fifteen_mins_ago = (now - timedelta(minutes=15)).strftime("%H:%M")
        late_tasks = list(tasks.find({"time": fifteen_mins_ago, "days": current_day}))
        
        for task in late_tasks:
            user = users.find_one({"_id": task["user_id"]})
            if user and user.get("phone"):
                send_whatsapp_reminder(user["phone"], f"⚠️ WARNING: '{task['title']}' miss ho raha hai! Discipline dikhao bhai, points chale jayenge.")

    except Exception as e:
        print(f"❌ Scheduler Error: {e}")

@scheduler.task('interval', id='whatsapp_job', minutes=1)
def scheduled_job():
    with app.app_context():
        check_and_send_reminders()

# --- REGISTER ROUTES ---
app.register_blueprint(auth_routes)
app.register_blueprint(profile_routes)
app.register_blueprint(task_routes)

@app.route("/")
def home():
    return jsonify({"status": "online", "message": "Routine Builder System Ready"})

if __name__ == "__main__":
    scheduler.init_app(app)
    scheduler.start()
    
    port = int(os.environ.get("PORT", 5000))
    # Local pe debug=True kar sakte ho, Render pe ye automatic handle ho jata hai
    app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)