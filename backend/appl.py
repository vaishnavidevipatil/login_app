from flask import Flask, request, jsonify
import requests
import pymongo
from datetime import datetime
from bson import ObjectId

app = Flask(__name__)

API_KEY = "8d9885982d75651c89f336f3b0ff5d44"
BASE_URL = "https://api.openweathermap.org/data/2.5"

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["weather_app"]

@app.route("/current_weather", methods=["GET"])
def current_weather():
    city = request.args.get("city", "Davangere")
    url = f"{BASE_URL}/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()

    if res.get("cod") != 200:
        return jsonify({"error": res.get("message", "Failed to fetch weather data")}), 400

    data = {
        "city": res.get("name"),
        "temp": res["main"]["temp"],
        "temp_min": res["main"]["temp_min"],
        "temp_max": res["main"]["temp_max"],
        "condition": res["weather"][0]["description"],
        "time": datetime.utcnow()
    }

    result = db.current_weather.insert_one(data)
    data["_id"] = str(result.inserted_id)  # convert ObjectId → string

    return jsonify(data)  # ✅ Now serializable

@app.route("/forecast", methods=["GET"])
def forecast():
    city = request.args.get("city", "Pune")
    url = f"{BASE_URL}/forecast?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()
    
    forecast_data = {}
    for entry in res["list"]:
        date = entry["dt_txt"].split(" ")[0]  # only date
        if date not in forecast_data:
            forecast_data[date] = {
                "min": entry["main"]["temp_min"],
                "max": entry["main"]["temp_max"]
            }
        else:
            forecast_data[date]["min"] = min(forecast_data[date]["min"], entry["main"]["temp_min"])
            forecast_data[date]["max"] = max(forecast_data[date]["max"], entry["main"]["temp_max"])
    
    db.forecast.insert_one({"city": city, "forecast": forecast_data, "time": datetime.utcnow()})
    return jsonify({"city": city, "forecast": forecast_data})

if __name__ == "__main__":
    app.run(debug=True)
