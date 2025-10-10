import bcrypt
import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file if it exists
app.secret_key = os.getenv("SECRET_KEY", "123")

import threading
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



SENDER_EMAIL = "vaishnavidevip17@gmail.com"
SENDER_EMAIL_PASSWORD = "yggb aqls vofn enyw"


# MongoDB Helper Class
class MongoDBHelper:
    def __init__(self):
        print("Initializing MongoDB connection")

        # Use MongoDB URI from environment variables (for Docker Compose)
        # mongo_uri = os.getenv("MONGO_URI", "mongodb://mongodb:27017/accounts")  # Default for Docker
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/accounts")

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


def send_contact_email(sender_email, sender_password, receiver_email, name, message):
    try:
        subject = f"New Contact Message from {name}"
        body = f"""
        You received a new message from the contact form:

        Name: {name}
        Email: {receiver_email}
        Message:
        {message}
        """

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")


@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json(force=True)
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")
        
        print(",,,,,,,,,,,,,,,,,,,,,", data)

        if not all([name, email, message]):
            return jsonify({"error": "Missing required fields"}), 400

        
        send_contact_email(
            sender_email=SENDER_EMAIL,
            sender_password=SENDER_EMAIL_PASSWORD,
            receiver_email=SENDER_EMAIL,
            name=name,
            message=message
        )
        
        
        # Your email sending logic here
        print(f"Contact message from {name} <{email}>: {message}")
        return jsonify({"message": "Message sent successfully!"}), 200
    
    except Exception as e:
        print(f"Error in contact route: {e}")
        return jsonify({"error": "Server error"}), 500


@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("new_password")

    if not email or not new_password:
        return jsonify({"success": False, "message": "Email and new password are required"}), 400

    # Check if email exists in DB
    user = records.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "Email not registered"}), 404

    # Hash the new password
    hashed_pw = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())

    # Update password in DB
    records.update_one(
        {"email": email},
        {"$set": {"password": hashed_pw}}
    )

    return jsonify({"success": True, "message": "Password reset successful"}), 200


@app.route('/')
def home():
    return "Welcome to Flask"    


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
