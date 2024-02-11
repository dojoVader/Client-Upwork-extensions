import React from 'react';
import {createRoot} from "react-dom/client";
import {dom} from "../utils/helpers";
import {SidebarNetflix} from "../component/Sidebar";


const div: Element = document.createElement('div');
const root = createRoot(div);
root.render(<SidebarNetflix/>);
document.body.appendChild(div);