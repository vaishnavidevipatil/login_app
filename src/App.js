
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "./Signup/SignUp";
import Login from "./Login/Login";
import Contact from "./Contact";
// import Dashboard from "./Dashboard";
import Dashboard from "./DashboardPage/Dashboard";
import About from "./About";
import "./App.css";

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
        {!isLoggedIn && <h1 className="app-title">Welcome to Vaishnavi's Applications</h1>}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/about"
            element={isLoggedIn ? <About /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      {!isLoggedIn &&    
          <div style={{ textAlign: "center" }}>
                  <h2>Welcome, Login for look Apps</h2>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "20px" }}>
                    <button style={{ width: "200px", height: "50px" }}>Weather Application</button>
                    <button style={{ width: "200px", height: "50px" }}>Face Detection Application</button>
                    <button style={{ width: "200px", height: "50px" }}>QR Application</button>
                  </div>
                </div>
              }
       
    </Router>
  
  );
}

export default App;
