import React, { useState } from "react";
import './Signup.css';


const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up to Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Enter your name"
            value={formData.full_name}
            onChange={handleChange}
            size={60}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            title="Please enter a valid phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;

