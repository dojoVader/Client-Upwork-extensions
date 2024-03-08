import React, {useEffect, useState} from "react";
import "./Header.css";
import {Logo} from "../../iconComponent";
import {useTickStore} from "../../zustand/store.tick";
import {useCounterStore} from "../../zustand/SkoolCounter";
import {useSettingsStore} from "../../zustand/store.settings";

interface HeaderProps {
    triggerClock?: boolean,
    disableHome?: boolean,
    hideClock?: boolean
}

function Header(props: HeaderProps) {
    const {triggerClock: clockTicked, disableHome, hideClock} = props;
    const [timeSpent, setTimer] = useState();
    const screenState = useSettingsStore(state => state);
    const [watch, setWatch] = useState(0);
    const [isScheduleRunning, setIsScheduleRunning] = useState(false);
    const [isWatchRunning, setIsWatchRunning] = useState(false);


    chrome.storage.local.onChanged.addListener((changes) => {
        if (changes.clockData) {
            const {time, counting} = changes?.clockData.newValue;
            setTimer(time);
            setIsScheduleRunning(counting || false);
        }

        if (changes.stopWatch) {
            const {time, counting} = changes?.stopWatch.newValue;
            setWatch(time);
            setIsWatchRunning(counting || false);
        }
    });

    const convertToTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Number(time % 60).toFixed(2);
        return `${hours}:${minutes}:${seconds}`;
    }

    // write a function to convert time to minute, seconds and hour


    const timer = (convertToTime(timeSpent || 0));
    const watchTimer = (convertToTime(watch || 0));
    const {triggerClock} = props;
    let logoWidth = "98px";
    let logoHeight = "14px";
    return (
        <div className="header__wrapper cursor">
            <Logo width={logoWidth} height={logoHeight}/>
            {(!triggerClock && !disableHome) && (
                <a onClick={e => {
                    screenState.actions.setSettings({
                        currentScreen: 'PROGRESS'
                    })
                }}>
                    <button className={"progressBar"}>view progress</button>
                </a>


            )}

            {(!hideClock && isWatchRunning) && (
                <div className="svg_timer">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#555CC1">
                    <path
                        d="M12 14V11M12 6C7.85786 6 4.5 9.35786 4.5 13.5C4.5 17.6421 7.85786 21 12 21C16.1421 21 19.5 17.6421 19.5 13.5C19.5 11.5561 18.7605 9.78494 17.5474 8.4525M12 6C14.1982 6 16.1756 6.94572 17.5474 8.4525M12 6V3M19.5 6.5L17.5474 8.4525M12 3H9M12 3H15"
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                    <span className={'clock'}>
                        {watchTimer}
                    </span>
                </div>


            )}

            {(!hideClock && isScheduleRunning && !isWatchRunning) && (
                <div className="svg_timer">
                <span>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M0.1875 5.5C0.1875 2.56599 2.56599 0.1875 5.5 0.1875C8.43401 0.1875 10.8125 2.56599 10.8125 5.5C10.8125 8.43401 8.43401 10.8125 5.5 10.8125C2.56599 10.8125 0.1875 8.43401 0.1875 5.5ZM5.96875 2.375C5.96875 2.11612 5.75888 1.90625 5.5 1.90625C5.24112 1.90625 5.03125 2.11612 5.03125 2.375V5.5C5.03125 5.66162 5.11451 5.81184 5.25156 5.8975L7.12656 7.06938C7.3461 7.20658 7.63529 7.13985 7.7725 6.92031C7.90971 6.70078 7.84297 6.41158 7.62344 6.27438L5.96875 5.2402V2.375Z"
                              fill="#555CC1"/>
                    </svg>
                </span>
                    <span className={'clock'}>
                        {timer}
                    </span>
                </div>


            )}
        </div>
    );
}

export default Header;
