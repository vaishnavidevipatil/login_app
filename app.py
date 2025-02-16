import bcrypt
import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("SECRET_KEY", "123")

# MongoDB Helper Class
class MongoDBHelper:
    def __init__(self):
        print("Initializing MongoDB connection")

        # Use MongoDB URI from environment variables (for Docker Compose)
        mongo_uri = os.getenv("MONGO_URI", "mongodb://mongodb:27017/accounts")  # Default for Docker

        try:
            self.client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)  # Timeout to prevent hanging
            self.db = self.client.get_database()  # Automatically selects the database from URI
            self.client.admin.command('ping')  # Test connection
            print("✅ MongoDB connection established.")
        except Exception as e:
            print(f"❌ Error connecting to MongoDB: {e}")
            self.db = None  # Ensure db is None if connection fails

    def read_collection(self, collection):
        if self.db is None:
            raise Exception("❌ Database connection not established.")
        return self.db[collection]

# Create an instance of MongoDBHelper and read the collection
db_helper = MongoDBHelper()

try:
    records = db_helper.read_collection("register")
except Exception as e:
    print(f"❌ Error reading collection: {e}")
    
    
########################### APIs In ############################
# Signup API
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    full_name = data.get("Full name")
    date_of_birth = data.get("date")
    email = data.get("email")
    password = data.get("password")

    if records.find_one({"email": email}):
        return jsonify({"success": False, "message": "Email already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    records.insert_one({"email": email, "password": hashed_pw})

    return jsonify({"success": True, "message": "Signup successful"}), 201

# Login API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    email_found = records.find_one({"email": email})
    if email_found:
        stored_password = email_found["password"]

        if bcrypt.checkpw(password.encode("utf-8"), stored_password):
            session["email"] = email
            return jsonify({"success": True, "message": "Login successful", "email": email}), 200
        
        return jsonify({"success": False, "message": "Invalid password"}), 401

    return jsonify({"success": False, "message": "Email not found"}), 404


# # Function to generate a random passkey
# def generate_passkey():
#     return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

# Forgot Password API
# @app.route("/forgot_password", methods=["POST"])
# def forgot_password():
#     data = request.json
#     email = data.get("email")

#     if not email:
#         return jsonify({"success": False, "message": "Email is required"}), 400

#     users = users_collection.read_collection(users_collection)
#     user_data = users.find_one({"email": email})

#     if not user_data or user_data.get("role") != "admin":
#         return jsonify({"success": False, "message": "Unauthorized request"}), 403

#     # Generate passkey and expiration time (valid for 10 minutes)
#     passkey = generate_passkey()
#     expiry_time = datetime.utcnow() + timedelta(minutes=10)

#     # Store passkey in DB
#     users.update_one(
#         {"email": email},
#         {"$set": {"reset_passkey": passkey, "passkey_expiry": expiry_time}}
#     )

#     # Normally, send passkey via email (for now, just logging)
#     print(f"Passkey for {email}: {passkey}")  # Replace this with an email service

#     return jsonify({"success": True, "message": "Passkey sent to registered email"}), 200

# # Reset Password API
# @app.route("/reset_password", methods=["POST"])
# def reset_password():
#     data = request.json
#     email = data.get("email")
#     passkey = data.get("passkey")
#     new_password = data.get("new_password")

#     if not email or not passkey or not new_password:
#         return jsonify({"success": False, "message": "Missing required fields"}), 400

#     users = users_collection.read_collection(users_collection)
#     user_data = users.find_one({"email": email})

#     if not user_data or user_data.get("role") != "admin":
#         return jsonify({"success": False, "message": "Unauthorized request"}), 403

#     # Check if passkey is valid
#     stored_passkey = user_data.get("reset_passkey")
#     expiry_time = user_data.get("passkey_expiry")

#     if not stored_passkey or stored_passkey != passkey or datetime.utcnow() > expiry_time:
#         return jsonify({"success": False, "message": "Invalid or expired passkey"}), 400

#     # Update password
#     hashed_password = generate_password_hash(new_password)
#     users.update_one(
#         {"email": email},
#         {"$set": {"password": hashed_password}, "$unset": {"reset_passkey": "", "passkey_expiry": ""}}
#     )

#     return jsonify({"success": True, "message": "Password reset successful"}), 200

#********************************** working API **********************************************
# Forgot Password API
# def forgot_password(data):
#     data = request.json
#     email = data.get("email")

#     if not email:
#         return jsonify({"success": False, "message": "Email is required"}), 400

#     users = mongo_helper.read_collection(USER_COLLECTION)
#     user_data = users.find_one({"email": email})

#     if not user_data or user_data.get("role") != "admin":
#         return jsonify({"success": False, "message": "Unauthorized request"}), 403

#     # Generate passkey and expiration time (valid for 10 minutes)
#     passkey = "K34p21"
#     expiry_time = datetime.utcnow() + timedelta(minutes=10)

#     # Store passkey in DB
#     users.update_one(
#         {"email": email},
#         {"$set": {"reset_passkey": passkey, "passkey_expiry": expiry_time}}
#     )

#     # Normally, send passkey via email (for now, just logging)
#     print(f"Passkey for {email}: {passkey}")  # Replace this with an email service
    
    

#     return "Can Proceed to reset password", {}, 200


# def reset_password(data):
#     data = request.json
    
#     email = data.get("email")
#     new_password = data.get("new_password")
#     confirm_password = data.get("confirm_password")
    
#     if not all([email, new_password, confirm_password]):
#         return jsonify({"success": False, "message": "Missing required fields"}), 400

#     if new_password != confirm_password:
#         return jsonify({"success": False, "message": "Passwords do not match"}), 400

#     users = mongo_helper.read_collection(USER_COLLECTION)
#     user_data = users.find_one({"email": email})

#     if not user_data or user_data.get("role") != "admin":
#         return jsonify({"success": False, "message": "Unauthorized request"}), 403

#     # Validate passkey and expiration time
#     stored_passkey = user_data.get("reset_passkey")
#     expiry_time = user_data.get("passkey_expiry")

#     HARDCODED_PASSKEY="K34p21"
#     if stored_passkey != HARDCODED_PASSKEY:
#         return jsonify({"success": False, "message": "Invalid passkey"}), 400

#     if not expiry_time or datetime.utcnow() > expiry_time:
#         return jsonify({"success": False, "message": "Expired passkey"}), 400

#     # Hash the new password before storing
#     else:
#         hashed_password = generate_password_hash(new_password)
#         users.update_one(
#             {"email": email},
#             {
#                 "$set": {"password": hashed_password, "invalid_login_count": 0},  # Reset invalid login count
#                 "$unset": {"reset_passkey": "", "passkey_expiry": ""}
#             }
#         )

#         # Generate JWT access token
#         access_token = create_access_token(identity=email)
#         response=access_token
#         return "Password reset Successfull",response, 200
    
@app.route('/')
def home():
    return "Welcome to Flask"    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
