import React from "react";
import "../style/WelcomeNote.css";

function WelcomeNote() {
  return (
    <div>
      <h2 className="welcome__title">Welcome 👋</h2>
      <p className="welcome__note">
        Welcome to Teachers Aid, send customized <br/> bulk messages at your preferred
        time and <br/> duration.
      </p>
    </div>
  );
}

export default WelcomeNote;
