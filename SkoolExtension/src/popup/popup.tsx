import React from "react";
import { createRoot } from "react-dom/client";
import { dom } from "../utils/helpers";
import { PopupUI } from "../component/PopupUI";

const div: Element = document.createElement("div");
const root = createRoot(div);
root.render(<PopupUI />);
document.body.appendChild(div);
