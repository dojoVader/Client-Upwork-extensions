import React from "react";
import Header from "../component/ui/Header";
import WelcomePageBody from "../component/shared/WelcomePageBody";
import {useSettingsStore} from "../zustand/store.settings";

function Welcome() {


  return (
    <div>
      <Header />
      <WelcomePageBody />
    </div>
  );
}

export default Welcome;
