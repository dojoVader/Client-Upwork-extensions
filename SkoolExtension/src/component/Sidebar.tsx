import React from "react";
import "./sidebar-ui.css";
import Test from "./Test";
import TextAreaComponent from "./TextAreaComponent";
import TitleLabel from "./TitleLabel";
import MessageTimerField from "./MessageTimerField";

import Slider from "@mui/material/Slider";
import NotificationBar from "./NotificationBar";
// import logo from

export const SidebarNetflix = () => {
  return (
    <div className="container__wrapper">
      <p className="logo">Logo</p>
      <div className="container">
        <TextAreaComponent />
        <TitleLabel title="Message / Hr" />
        <MessageTimerField />
        <TitleLabel title="Message / Interval" />

        <Slider
          aria-label="Temperature"
          defaultValue={30}
          //   getAriaValueText={valuetext}
          color="primary"
        />

        {/* <NotificationBar /> */}

        <div className="action-btns">
          <button className="action-btn action-btn__purple">Stop</button>
          <button className="action-btn action-btn__green">Start</button>
        </div>
      </div>
    </div>
  );
};
