import React from "react";
import "./Header.css";
import { Logo } from "../iconComponent";

function Header() {
  let logoWidth = "98px";
  let logoHeight = "14px";
  return (
    <div className="header__wrapper">
      <Logo width={logoWidth} height={logoHeight} />
      <div className="svg__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#555cc1"
          viewBox="0 0 256 256"
        >
          <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Header;
