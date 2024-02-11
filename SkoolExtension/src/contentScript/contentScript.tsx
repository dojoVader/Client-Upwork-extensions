import React from "react";
import {createRoot} from "react-dom/client";
import {SidebarNetflix} from "../component/Sidebar";
import {dom, q} from "../utils/helpers";

console.log("Fired in Netflix.....")

const NETFLIX_SELECTOR=".watch-video";

// Find watch video set as relative, set parent to flex and render sidebar after video

function renderNetflix(){
    const [videoElement] = q(NETFLIX_SELECTOR,false);
    if(videoElement){
        // Get the Parent Node
        const parentNode = videoElement.parentNode as HTMLElement;
        parentNode.style.display = 'flex';

        // Get the video element and set to relative

        (videoElement as HTMLElement).style.position = 'relative';
        (videoElement as HTMLElement).style.height = '100vh';
        (videoElement as HTMLElement).style.width = '80%';

        const newNode = dom('div',{'class':'sidebar-ui'});
        const root = createRoot(newNode);
        root.render(<SidebarNetflix/>)

        // Place it side by side with netflix
        videoElement.after(newNode)
    }
}

setTimeout(() =>  renderNetflix(),5000)