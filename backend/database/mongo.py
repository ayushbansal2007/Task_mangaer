import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["taskmanager"]

users = db["users"]
profiles = db["profiles"]
tasks = db["tasks"]
