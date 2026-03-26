import React from "react";

export default function About() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>About This Project</h1>
      <p>
        This is a 2-tier application built using React and Firebase.
      </p>

      <h3>Project Details:</h3>
      <p>
        <em>Frontend: React (User Interface)</em><br />
        <em>Backend: Firebase (Database & Services)</em><br />
        <em>Architecture: 2-Tier (Client + Backend Service)</em><br />
      </p>

      <h3>Purpose:</h3>
      <p>
        The purpose of this project is to demonstrate how a frontend application
        can directly interact with a backend service like Firebase without
        needing a custom server.
      </p>

      <h3>Created By:</h3>
      <p>Manikant Mishra-MERN Stack Learner</p>
    </div>
  );
}

