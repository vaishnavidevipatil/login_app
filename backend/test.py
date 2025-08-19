# from pymongo import MongoClient


# client = MongoClient("mongodb://mongodb:27017/")
# if client is None:
#     print("Not connected")
# else:
#     print(client.list_database_name())  # Should return available DBs

from pymongo import MongoClient
import os

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

def test_mongo_connection():
    client = MongoClient("mongodb://mongodb:27017/")
    try:
        # The ismaster command is cheap and does not require auth.
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)  # Timeout to prevent hanging
        db = client.get_database()  # Automatically selects the database from URI
        client.admin.command('ping')  # Test connection
        print("✅ MongoDB connection established.")

    except Exception:
        # connected = False
        print(f"❌ Error connecting to MongoDB: {e}")
        db = None  # Ensure db is None if connection fails

    # assert connected, "Could not connect to MongoDB"

test_mongo_connection()