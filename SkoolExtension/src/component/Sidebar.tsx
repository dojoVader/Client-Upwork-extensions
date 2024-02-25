import React from "react";
import "./sidebar-ui.css";
import Test from "./Test";
import TextAreaComponent from "./TextAreaComponent";
import TitleLabel from "./TitleLabel";
import MessageTimerField from "./MessageTimerField";

import Slider from "@mui/material/Slider";
import NotificationBar from "./NotificationBar";
// import logo from
import Header from "./Header";
import Welcome from "../pages/Welcome";

export const SidebarNetflix = () => {
  return (
    <div className="container__wrapper">
      {/* <Header /> */}
      <Welcome />
    </div>
  );
};
