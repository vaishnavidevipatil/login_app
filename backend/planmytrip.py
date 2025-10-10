from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

# Rules dictionary
rules = {
    "Coorg (Madikeri)": {"max_price": 15000, 
                         "min_days": 3, 
                         "min_nights": 2},
    
    "Hampi": {"max_price": 10000, 
              "min_days": 2,
               "min_nights": 1,
                "family_preference": True,
                "package_family_friendly": True},

    "Gokarna": {"max_price": 13000, 
                "min_days": 3, 
                "min_nights": 2,
                 "family_preference": True,
                "package_family_friendly": True},
   
    "Udupi": {"max_price": 11000, 
              "min_days": 2, 
              "min_nights": 1,
               "family_preference": True,
                "package_family_friendly": True},
   
   
    "Dandeli": {"max_price": 15000, 
                "min_days": 3, 
                "min_nights": 2,
                "family_preference": False,
                "package_family_friendly": True},

    "Jog Falls": {"max_price": 7000,
                  "min_days": 2,
                  "min_nights": 1,
                  "family_preference": False,
                  "package_family_friendly": False},

    "Sakleshpur": {"max_price": 12000,
                   "min_days": 2,
                   "min_nights": 1,
                   "family_preference": False,
                   "package_family_friendly": False},
}

@app.route("/check-package", methods=["POST"])
def check_package():
    data = request.json
    destination = data.get("destination")
    price = float(data.get("price", 0))   # ensure number
    days = int(data.get("days", 0))       # ensure int
    nights = int(data.get("nights", 0))   # ensure int
    members = int(data.get("members", 1)) # ensure int
    family_preference = data.get("family_preference")
    package_family_friendly = data.get("package_family_friendly")

    rule = rules.get(destination, None)
    response = {}

    if not rule:
        return jsonify({"status": "error", "message": "No rules defined for this destination."}), 400

    allowed_price = rule["max_price"] 
    if price <= allowed_price and days <= rule["min_days"] and nights <= rule["min_nights"]:
        
    # Check family preference
        if family_preference in ["yes", "true", "1"] and package_family_friendly in ["yes", "true", "1"]:

            response = {
                "status": "success",
                "message": "Package is suitable!",
                "details": {
                    "destination": destination,
                    "members": members,
                    "days": days,
                    "nights": nights,
                    "budget": price
                }
            }
        else:
            response = {"status": "error", "message": "Package not suitable  for family preference.(Family preference mismatch).", "code": 400}
    else:
        response = {
            "status": "error",
            "message": f"Package not suitable. Expected: ₹≤{rule['max_price']}, Days ≤{rule['min_days']}, Nights ≤{rule['min_nights']}"
        }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5003)
