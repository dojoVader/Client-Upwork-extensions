import React from "react";
import { createRoot } from "react-dom/client";
import "../component/style/sidebar-ui.css";
import {Sidebar} from "../component/core/Sidebar";

const div: Element = document.createElement("div");
const root = createRoot(div);
root.render(<Sidebar />);
document.body.appendChild(div);
