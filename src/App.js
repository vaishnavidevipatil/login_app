import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "./Signup/SignUp";
import Login from "./Login/Login";
import Forgotpw from "./Reset/Forgotpw"; 

import Contact from "./Contact";
import Dashboard from "./DashboardPage/Dashboard";
// import About from "./About";
import "./App.css";
import { useNavigate } from "react-router-dom";
import TripValidator from "./TripValidator";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar className="navbar" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="app-container">
        {!isLoggedIn && <h1 className="app-title" style={{marginBottom:"70px"}}>Welcome to Vaishnavi's Applications</h1>}

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgotpw" element={<Forgotpw />} /> 
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/TripValidator"
            element={isLoggedIn ? <TripValidator /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* ✅ Conditionally render buttons */}
        <AppButtons isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}

function AppButtons({ isLoggedIn }) {
  const location = useLocation();
 const navigate = useNavigate(); 
  // hide buttons on signup and login page
  if (!isLoggedIn || location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

 const hiddenPaths = ["/login", "/signup", "/contact", "/TripValidator", "/dashboard"];

if (!isLoggedIn || hiddenPaths.includes(location.pathname)) {
  return null;
}
  return (
    <div style={{ textAlign: "center", marginTop: "90px" }}>
    <h2>Welcome, Explore Apps</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          style={{ width: "300px", height: "50px" }}
          onClick={() => navigate("/dashboard")} // ✅ navigate instead of Navigate
        >
          Weather Forecasting
        </button>

        <button
          style={{ width: "300px", height: "50px" }}
          onClick={() => navigate("/TripValidator")} // ✅ navigate instead of Navigate
        >
          PlanMyTrip Application
        </button>
        
        <button style={{ width: "300px", height: "50px" }}>QR Application</button>
      </div>
    </div>
  );
}

export default App;
