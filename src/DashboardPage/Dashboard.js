import React, { useState } from "react";

function Dashboard() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = [
    { state: "Maharashtra", city: "Pune" },
    { state: "Maharashtra", city: "Mumbai" },
    { state: "Karnataka", city: "Bengaluru" },
    { state: "Delhi", city: "New Delhi" },
    { state: "Tamil Nadu", city: "Chennai" }
  ];

  // Fetch current weather
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/current_weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
    setLoading(false);
  };

  // Fetch forecast data
  const fetchForecast = async () => {
    try {
      // API 
      const res = await fetch(`http://localhost:5000/forecast?city=${city}`);
      const data = await res.json();
      setForecast(data.forecast); // forecast data as an object with dates
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  // Fetch both when user clicks
  const handleGetWeather = async () => {
    await fetchWeather();
    await fetchForecast();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins" }}>
      <h2 style={{ marginBottom: "15px" }}>🌤 Weather Dashboard</h2>

      {/* Dropdown for cities */}<i class="fa fa-search"></i>
      <label style={{ fontWeight: "bold" }}>Select City:  
        <i class="fa fa-search"></i>
      </label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "5px",
          marginLeft: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      >
      {cities.map((c, index) => (
          <option key={index} value={c.city}>
            {c.city}, {c.state}
          </option>
        ))}
      </select>

      <button
        onClick={handleGetWeather}
        style={{
          marginLeft: "10px",
          padding: "6px 12px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Get Weather
      </button>

      {/* Current Weather Info Card */}
      {loading && <p style={{ marginTop: "20px" }}>Loading weather...</p>}

      {weather && !loading && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            maxWidth: "300px",
            background: "#f9f9f9",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{weather.city}</h3>
          <p>🌡 Temp: {weather.temp} °C</p>
          <p>⬆ Max: {weather.temp_max} °C</p>
          <p>⬇ Min: {weather.temp_min} °C</p>
          <p>☁ Condition: {weather.condition}</p>
          <p style={{ fontSize: "12px", color: "#555" }}>
            ⏰ {new Date(weather.time).toLocaleString()}
          </p>
        </div>
      )}

      {/* Forecast Section */}
      {forecast && (
        <div style={{ marginTop: "30px" }}>
          <h3>Weekly Forecast</h3>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "10px",
              flexWrap: "wrap"
            }}
          >
            {Object.keys(forecast).map((date, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "140px",
                  textAlign: "center",
                  background: "#f1f1f1"
                }}
              >
                <h4 style={{ margin: "5px 0" }}>{date}</h4>
                <p>⬆ {forecast[date].max} °C</p>
                <p>⬇ {forecast[date].min} °C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
