from pymongo import MongoClient


client = MongoClient("mongodb://mongodb:27017/")
print(client.list_database_names())  # Should return available DBs
