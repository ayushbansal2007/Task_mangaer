import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI"),
    tls=True,
    tlsAllowInvalidCertificates=True   # dev fix for SSL error
)

db = client["taskmanager"]

users = db["users"]
profiles = db["profiles"]
tasks = db["tasks"]
# database/mongo.py mein ye line honi chahiye:
task_history = db["task_history"]
print(os.getenv("MONGO_URI"))
