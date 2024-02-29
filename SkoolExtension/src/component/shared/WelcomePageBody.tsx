import React from "react";
import "../style/WelcomePageBody.css";
import { WelcomeSvg } from "../../iconComponent";
import WelcomeNote from "./WelcomeNote";
import {useSettingsStore, screen as whichScreen} from "../../zustand/store.settings";

// import WelcomeImage from "../assets/welcome.svg";

function WelcomePageBody() {
  const action = useSettingsStore(state => state.actions);
  return (
    <div className="welcome__body__wrap">
      {/* <img src={WelcomeImage} alt="" /> */}
      <WelcomeSvg width="217px" height="217px" />
      <WelcomeNote />
      <button onClick={e => {
          localStorage.setItem("onboarding", "true");
          action.setSettings({
          currentScreen: whichScreen.SETTINGS
      })}} className="primary__button">Get Started</button>
    </div>
  );
}

export default WelcomePageBody;
