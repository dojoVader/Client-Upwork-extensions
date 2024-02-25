import React from "react";
import "./WelcomePageBody.css";
import { WelcomeSvg } from "../iconComponent";
import WelcomeNote from "./WelcomeNote";

// import WelcomeImage from "../assets/welcome.svg";

function WelcomePageBody() {
  return (
    <div className="welcome__body__wrap">
      {/* <img src={WelcomeImage} alt="" /> */}
      <WelcomeSvg width="217px" height="217px" />
      <WelcomeNote />
      <button className="primary__button">Get Started</button>
    </div>
  );
}

export default WelcomePageBody;
