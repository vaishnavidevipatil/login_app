import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css";
import "./Login.css";
import { Link } from "react-router-dom";
import Forgotpw from "../Reset/Forgotpw";
export default function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {

    localStorage.setItem("user", "loggedIn");
    setIsLoggedIn(true);
    navigate("/dashboard"); // Redirect after login

    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (data.success) {
      navigate("/about");
    } else {
      // alert("Login Failed");
      console.log("Login failed!")
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={80}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
          <p>
            <Link to="/forgotpw">Forgot Password?</Link>
          </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

