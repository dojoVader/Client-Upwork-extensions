import React from "react";
import "./Header.css";
import {Logo} from "../../iconComponent";

interface HeaderProps {
    triggerClock?: boolean;
}

function Header(props: HeaderProps) {
    const {triggerClock} = props;
    let logoWidth = "98px";
    let logoHeight = "14px";
    return (
        <div className="header__wrapper">
            <Logo width={logoWidth} height={logoHeight}/>
            {!triggerClock && (
                <div className="svg__icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="#555cc1"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
                    </svg>
                </div>
            )}
            {triggerClock && (
                <div className="svg_timer">
                <span>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M0.1875 5.5C0.1875 2.56599 2.56599 0.1875 5.5 0.1875C8.43401 0.1875 10.8125 2.56599 10.8125 5.5C10.8125 8.43401 8.43401 10.8125 5.5 10.8125C2.56599 10.8125 0.1875 8.43401 0.1875 5.5ZM5.96875 2.375C5.96875 2.11612 5.75888 1.90625 5.5 1.90625C5.24112 1.90625 5.03125 2.11612 5.03125 2.375V5.5C5.03125 5.66162 5.11451 5.81184 5.25156 5.8975L7.12656 7.06938C7.3461 7.20658 7.63529 7.13985 7.7725 6.92031C7.90971 6.70078 7.84297 6.41158 7.62344 6.27438L5.96875 5.2402V2.375Z"
                              fill="#555CC1"/>
                    </svg>
                </span>
                    <span className={'clock'}>
                        00:01:20
                    </span>
                </div>
            )}

        </div>
    );
}

export default Header;
