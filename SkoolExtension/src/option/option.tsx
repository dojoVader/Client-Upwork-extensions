import React from "react";
import { createRoot } from "react-dom/client";
import {SkoolLogs} from "../component/SkoolLogs";
import "./option.css"


const div: Element = document.createElement("div");
const root = createRoot(div);
root.render(<SkoolLogs />);
document.body.appendChild(div);
