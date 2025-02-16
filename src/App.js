import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Navbar />
      <h1 >Welcome to Vaishnavi's Page</h1>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      
      
    </Router>
    
  );
}

export default App;
