# import os
# from pymongo import MongoClient
# from dotenv import load_dotenv

# load_dotenv()

# HOST = os.getenv("HOST", "localhost")
# PORT = int(os.getenv("PORT", 27017))

# try:
#     client = MongoClient(HOST, PORT)
#     print("Connected successfully to MongoDB!")
#     print("Databases:", client.list_database_names())
# except Exception as e:
#     print("Connection failed:", e)

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
print(client.list_database_names())
