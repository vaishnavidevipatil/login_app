// import React from "react";
// import "../src/styles/About.css";

// const About = () => {
//   return (
//     <div className="about-container">
//       {/* <h1>Know about me more!!</h1> */}
//       <div className="resume">
//         <h1>About Me</h1>
//         <section className="resume-section">
//           <h2>Education</h2>
//           <ul>
//             <li>
//               <strong>GM Institute Of Technology Engineering Davangere</strong> (2021 — 2024)
//               <p>Electronics & Communications, specialized in IT & Front-End Development.</p>
//             </li>
//             <li>
//               <strong>Vyshnavi Chetan PU College Davangere</strong> (2018 — 2024)
//               <p>Science PCMB</p>
//             </li>
//             <li>
//               <strong>MKET LK ENGLISH Medium School </strong> (2017 — 2018)
//               <p></p>
//             </li>
//           </ul>
//         </section>

//         <section className="resume-section">
//           <h2>Experience</h2>
//           <ul>
//             <li><strong>Full Stack Developer(Intern)</strong> (2024 — Present)</li>
//           </ul>
//         </section>

//         <section className="resume-section">
//           <h2>My Skills</h2>
//           <div className="skills">
//             <div className="skill"><span>Python</span> <div className="skill-bar"><div className="fill" style={{ width: "80%" }}></div></div></div>
//             <div className="skill"><span>UI Design</span> <div className="skill-bar"><div className="fill" style={{ width: "70%" }}></div></div></div>
//             <div className="skill"><span>React JS</span> <div className="skill-bar"><div className="fill" style={{ width: "90%" }}></div></div></div>
//             <div className="skill"><span>Flask API</span> <div className="skill-bar"><div className="fill" style={{ width: "50%" }}></div></div></div>
//           </div>
//         </section>
//       </div>
//     </div>

//   );
// };

// export default About;
import React, { useState } from "react";
import "./Trip.css";

function TripValidator() {
  const [form, setForm] = useState({
    destination: "Coorg (Madikeri)",
    price: 0,
    days: 5,
    nights: 4,
    members: 1,
    family_preference: false,
    package_family_friendly: false,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5003/check-package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h2>🏖️ Plan My Trip - Vacation Package Validator</h2>

      <label>Choose Destination:</label>
      <select name="destination" value={form.destination} onChange={handleChange}>
        <option>Coorg (Madikeri)</option>
        <option>Hampi</option>
        <option>Gokarna</option>
        <option>Udupi</option>
        <option>Bandipur National Park</option>
        <option>Dandeli</option>
        <option>Jog Falls</option>
        <option>Sakleshpur</option>
      </select>

      <label>Price (₹):</label>
      <input type="number" name="price" value={form.price} onChange={handleChange} />

      <label>Days:</label>
      <input type="number" name="days" value={form.days} onChange={handleChange} />

      <label>Nights:</label>
      <input type="number" name="nights" value={form.nights} onChange={handleChange} />

      <label>Members:</label>
      <input type="number" name="members" value={form.members} onChange={handleChange} />

      <label>Family Preference (Yes/No):</label>
      <input type="text" name="family_preference" value={form.family_preference} onChange={handleChange} />

      <label>Package Family Friendly (Yes/No):</label>
      <input type="text" name="package_family_friendly" value={form.package_family_friendly} onChange={handleChange} />

      <button onClick={handleSubmit}>Check Package</button>

      {result && (
        <div className="result-box">
          <h3>Result:</h3>
          <p style={{ color: result.status === "success" ? "green" : "red" }}>
            {result.message}
          </p>
          {result.details && (
            <ul>
              <li>Destination: {result.details.destination}</li>
              <li>Members: {result.details.members}</li>
              <li>Days: {result.details.days}</li>
              <li>Nights: {result.details.nights}</li>
              <li>Budget: ₹{result.details.budget}</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default TripValidator;
