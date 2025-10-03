from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

# Rules dictionary
rules = {
    "Coorg (Madikeri)": {"max_price": 15000, "min_days": 3, "min_nights": 2},
    "Chikmagalur": {"max_price": 12000, "min_days": 3, "min_nights": 2},
    "Hampi": {"max_price": 10000, "min_days": 2, "min_nights": 1},
    "Mysuru (Mysore)": {"max_price": 8000, "min_days": 2, "min_nights": 1},
    "Gokarna": {"max_price": 13000, "min_days": 3, "min_nights": 2},
    "Udupi": {"max_price": 11000, "min_days": 2, "min_nights": 1},
    "Kabini (Nagarhole National Park)": {"max_price": 20000, "min_days": 3, "min_nights": 2},
    "Bandipur National Park": {"max_price": 18000, "min_days": 3, "min_nights": 2},
    "Dandeli": {"max_price": 15000, "min_days": 3, "min_nights": 2},
    "Badami, Aihole & Pattadakal": {"max_price": 9000, "min_days": 2, "min_nights": 1},
    "Jog Falls": {"max_price": 7000, "min_days": 2, "min_nights": 1},
    "Sakleshpur": {"max_price": 12000, "min_days": 2, "min_nights": 1},
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
    if price <= allowed_price and days >= rule["min_days"] and nights >= rule["min_nights"]:
        if family_preference == package_family_friendly:
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
            response = {"status": "error", "message": "Package not suitable (Family preference mismatch)."}
    else:
        response = {
            "status": "error",
            "message": f"Package not suitable. Expected: ₹≤{rule['max_price']}, Days ≥{rule['min_days']}, Nights ≥{rule['min_nights']}"
        }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
