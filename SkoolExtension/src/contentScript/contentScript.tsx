import React from "react";
import { createRoot } from "react-dom/client";
import { SidebarNetflix } from "../component/Sidebar";
import { dom, q } from "../utils/helpers";
import { RunningWithErrors } from "@mui/icons-material";
import NotificationBar from "../component/NotificationBar";

console.log("Fired in Netflix.....");

const NETFLIX_SELECTOR = ".watch-video";

// Find watch video set as relative, set parent to flex and render sidebar after video
function run() {
  const div: Element = document.createElement("div");
  const root = createRoot(div);
  root.render(<NotificationBar type="error" />);
  document.body.appendChild(div);
}

setTimeout(() => run(), 5000);
