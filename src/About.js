import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* <h1>Know about me more!!</h1> */}
      <div className="resume">
        <h1>About Me</h1>
        <section className="resume-section">
          <h2>Education</h2>
          <ul>
            <li>
              <strong>GM Institute Of Technology Engineering Davangere</strong> (2021 — 2024)
              <p>Electronics & Communications, specialized in IT & Front-End Development.</p>
            </li>
            <li>
              <strong>Vyshnavi Chetan PU College Davangere</strong> (2018 — 2024)
              <p>Science PCMB</p>
            </li>
            <li>
              <strong>MKET LK ENGLISH Medium School </strong> (2017 — 2018)
              <p></p>
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          <ul>
            <li><strong>Full Stack Developer(Intern)</strong> (2024 — Present)</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>My Skills</h2>
          <div className="skills">
            <div className="skill"><span>Python</span> <div className="skill-bar"><div className="fill" style={{ width: "80%" }}></div></div></div>
            <div className="skill"><span>UI Design</span> <div className="skill-bar"><div className="fill" style={{ width: "70%" }}></div></div></div>
            <div className="skill"><span>React JS</span> <div className="skill-bar"><div className="fill" style={{ width: "90%" }}></div></div></div>
            <div className="skill"><span>Flask API</span> <div className="skill-bar"><div className="fill" style={{ width: "50%" }}></div></div></div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default About;
