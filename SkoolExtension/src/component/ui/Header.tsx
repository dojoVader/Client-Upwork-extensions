import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
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
    const [isScheduleRunning, setIsScheduleRunning] = useState();
    const [isWatchRunning, setIsWatchRunning] = useState();
    const [timer, setTimer] = useState("");

    const convertToTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Number(time % 60).toFixed(2);

        return `${hours}:${minutes}:${seconds}`;
    }

    const callback = useCallback((changes) => {
        if (changes.clockData) {

            if (changes?.clockData.newValue?.time) {
                let timerx = convertToTime(changes?.clockData.newValue?.time)
                console.log(timerx)
                setTimer(timerx);
            }
            if (changes?.clockData.newValue?.counting && changes?.clockData.newValue?.schedule) {
                const {counting} = changes.clockData.newValue;

                setIsWatchRunning(counting || false)
            }

            if (changes?.clockData.newValue?.schedule) {
                const {schedule} = changes.clockData.newValue;
                setIsScheduleRunning(schedule);
                console.log("Schedule is running %o:%o", isScheduleRunning, schedule)
            }
        }

        chrome.storage.local.get('clockData', (result) => {
            if (result.clockData && result.clockData.counting !== undefined) {
                const {counting, schedule} = result.clockData;
                setIsScheduleRunning(schedule);
                setIsWatchRunning(counting);
            }

        });


    }, [timer])


    useEffect(() => {
        chrome.storage.local.onChanged.addListener(callback);
    }, []);


    // write a function to convert time to minute, seconds and hour


    console.log(timer);
    let logoWidth = "98px";
    let logoHeight = "14px";

    return (

        <div className="header__wrapper cursor">
            <Logo width={logoWidth} height={logoHeight}/>


            <div className="svg_timer">
                <span>
                    {timer.length > 0 && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.1875 5.5C0.1875 2.56599 2.56599 0.1875 5.5 0.1875C8.43401 0.1875 10.8125 2.56599 10.8125 5.5C10.8125 8.43401 8.43401 10.8125 5.5 10.8125C2.56599 10.8125 0.1875 8.43401 0.1875 5.5ZM5.96875 2.375C5.96875 2.11612 5.75888 1.90625 5.5 1.90625C5.24112 1.90625 5.03125 2.11612 5.03125 2.375V5.5C5.03125 5.66162 5.11451 5.81184 5.25156 5.8975L7.12656 7.06938C7.3461 7.20658 7.63529 7.13985 7.7725 6.92031C7.90971 6.70078 7.84297 6.41158 7.62344 6.27438L5.96875 5.2402V2.375Z"
                                  fill="#555CC1"/>
                        </svg>
                    )}

                    </span>
                {isScheduleRunning && (
                    <Timer time={timer}/>
                )}


                {!isScheduleRunning && (
                    <span className={'clock'}>
                        {isWatchRunning ? 'sending' : ' '}
                    </span>
                )}

            </div>


        </div>
    );
}

type TimeProps = {
    time: string
}
const Timer = (props: TimeProps) => {
    const {time} = props;


    return (
        <span className={'clock'}>
                        {time}
                    </span>
    )
}

export default Header;


