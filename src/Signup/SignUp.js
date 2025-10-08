import React, { useState } from "react";
import "./Signup.css";

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
      <h1 className="signup-title"><b>Sign Up</b></h1>
      <form onSubmit={handleSubmit} className="signup-form">
        
        <div className="form-group">
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder=" "
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="full_name">Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            placeholder=" "
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
          <label htmlFor="date_of_birth">Date of Birth</label>
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            placeholder=" "
            value={formData.phone_number}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            title="Please enter a valid phone number"
          />
          <label htmlFor="phone_number">Phone Number</label>
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit" className="signup-btn" style={{alignItems:"center"}}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
