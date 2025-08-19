// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar";
// import SignUp from "./SignUp";
// import Login from "./Login";
// import Contact from "./Contact";
// import Dashboard from "./Dashboard";
// import About from "./About";
// import "./App.css"; // Import updated styles

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar className="navbar" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <div className="app-container">
//         {!isLoggedIn && <h1 className="app-title">Welcome to Vaishnavi's Portfolio</h1>}
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/contact" element={<Contact />} />
//           {isLoggedIn && (
//             <>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/about" element={<About />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import Login from "./Login";
// import Contact from "./Contact";
// import Dashboard from "./Dashboard";
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
          {/* <Route path="/contact" element={<Contact />} /> */}
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            // element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            // element={isLoggedIn ? <About /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
