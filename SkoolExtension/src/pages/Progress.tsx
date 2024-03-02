import React, {useEffect, useState} from "react";
import Header from "../component/ui/Header";
import "../component/style/progress.css";
import {CircularProgressBar} from "../component/shared/CircularProgressBar";
import {useTickStore} from "../zustand/store.tick";
import {useSettingsStore, screen as whichScreen} from "../zustand/store.settings";
import {useProgressStore} from "../zustand/store.progress";
function Progress() {
    const state = useTickStore(state => state);
    const action = useTickStore(state => state.actions);
    const screenAction = useSettingsStore(state => state.actions);
    const className = `primary__button ${state.settings.triggerClock ? 'red-scheme' : ''}`;
    const [currentCount, setCurrentCount] = useState();
    const [totalCount, setTotalCount] = useState();
    const [textContent, setTextContent] = useState();

    chrome.storage.local.onChanged.addListener((changes) => {
        if(changes.progressEvent){
            const {currentCount, totalCount, textContent} = changes.progressEvent.newValue;
            setCurrentCount(currentCount);
            setTotalCount(totalCount);
            setTextContent(textContent);
        }
    });





    return (
        <div className={'body'}>
            <Header triggerClock={state.settings.triggerClock}/>
            <div>
                <CircularProgressBar
                    currentCount={currentCount || 0}
                    totalCount={totalCount || 0}
                    textContent={textContent || '-'}/>
                {/*<WarningLabel/>*/}
                <CompletedLabel currentCount={currentCount || 0} totalCount={totalCount || 0} />
            </div>

            <div className="button-cage">
                <button onClick={e => {
                    action.setTick({
                        triggerClock: false
                    })
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {message: "stopClock"}, function(response) {
                            screenAction.setSettings({
                                currentScreen: whichScreen.SETTINGS
                            });


                        });
                    });

                }} className={className}>
                    {!state.settings.triggerClock && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.44748 3.12502C9.06581 3.12502 8.70828 3.31173 8.49017 3.62494L4.9636 8.68918C4.30137 9.64016 4.00621 10.7989 4.13279 11.9508L4.40398 14.4187C4.51986 15.4732 5.34775 16.3086 6.40126 16.4339L8.16547 16.6438C9.51268 16.804 10.8787 16.6651 12.166 16.2369C13.0671 15.9372 13.7889 15.2533 14.1366 14.3696L15.5605 10.7512C15.6294 10.5761 15.6769 10.3935 15.7022 10.2071C15.9225 8.58447 14.4563 7.2402 12.8588 7.60016L9.61058 8.33208L10.5771 4.58281C10.7675 3.84447 10.21 3.125 9.44748 3.12502Z"
                                fill="white"/>
                        </svg>
                    )}

                    {state.settings.triggerClock && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.55256 13.875C6.93423 13.875 7.29176 13.6883 7.50987 13.3751L11.0364 8.31081C11.6987 7.35984 11.9938 6.20108 11.8672 5.04918L11.5961 2.58134C11.4802 1.52676 10.6523 0.691419 9.59878 0.566098L7.83457 0.356233C6.48735 0.195973 5.12137 0.33489 3.834 0.763082C2.93289 1.0628 2.21113 1.74675 1.8634 2.63044L0.439554 6.24883C0.370683 6.42385 0.323086 6.60651 0.297786 6.79289C0.0775243 8.41552 1.54372 9.7598 3.14119 9.39984L6.28327 8.69184C6.2996 8.68816 6.30977 8.68981 6.31707 8.69211C6.32598 8.69493 6.33629 8.70079 6.34563 8.71041C6.35496 8.72004 6.3605 8.73052 6.36304 8.73952C6.36512 8.74688 6.36646 8.7571 6.36228 8.77331L5.4229 12.4172C5.23256 13.1555 5.79008 13.875 6.55256 13.875Z"
                                fill="white"/>
                        </svg>

                    )}

                    {!state.settings.triggerClock && (
                        <span>Start Sending Message</span>
                    )}
                    {state.settings.triggerClock && (
                        <span>Stop Sending Message</span>
                    )}
                </button>
            </div>

        </div>
    );
}

export default Progress;
interface CompletedLabelProps {
    currentCount: number;
    totalCount: number;

}
const CompletedLabel = (props: CompletedLabelProps) => {
    const {currentCount, totalCount} = props;
    return (
        <>
            <div className="progress-stats">
                <span>{currentCount}/{totalCount}</span>

                <div className="message">
                    Messages sent successfully!
                </div>

            </div>
            <button className={'logs'}>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M8.87496 1.08333C8.87496 0.968274 8.78169 0.875 8.66663 0.875H2.83329C1.56764 0.875 0.541626 1.90102 0.541626 3.16667V14.8333C0.541626 16.099 1.56764 17.125 2.83329 17.125H11.1666C12.4323 17.125 13.4583 16.099 13.4583 14.8333V6.62255C13.4583 6.50749 13.365 6.41422 13.25 6.41422H9.49996C9.15478 6.41422 8.87496 6.13439 8.87496 5.78922V1.08333ZM8.69288 9.97029C8.96242 9.75466 9.35573 9.79836 9.57136 10.0679C9.78699 10.3374 9.74329 10.7307 9.47375 10.9464L7.39546 12.609C7.28822 12.6967 7.15128 12.7495 7.00203 12.75L7.00001 12.75L6.99474 12.75C6.84803 12.7488 6.71337 12.697 6.60733 12.6113L4.52621 10.9464C4.25668 10.7307 4.21298 10.3374 4.42861 10.0679C4.64424 9.79836 5.03754 9.75466 5.30708 9.97029L6.37501 10.8246V7.95833C6.37501 7.61316 6.65483 7.33333 7.00001 7.33333C7.34518 7.33333 7.62501 7.61316 7.62501 7.95833V10.8246L8.69288 9.97029Z"
                          fill="#D2513E"/>
                    <path
                        d="M10.125 1.35345C10.125 1.1997 10.2855 1.10208 10.4051 1.19866C10.5059 1.28 10.5965 1.3753 10.6737 1.48296L13.1847 4.98121C13.2419 5.06085 13.1799 5.16422 13.0819 5.16422H10.3333C10.2182 5.16422 10.125 5.07094 10.125 4.95588V1.35345Z"
                        fill="#D2513E"/>
                </svg>
                <span>Download message logs</span>

            </button>
        </>
    );
}

const WarningLabel = () => {
    return (
        <div className={'warning-label'}>
            <div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.960815" y="0.960785" width="14.3529" height="14.3529" rx="3.58824"
                          fill="url(#paint0_linear_8_2872)"/>
                    <path d="M8.13733 10.5294V7.53922" stroke="white" strokeWidth="0.897059" strokeLinecap="round"/>
                    <circle cx="0.598039" cy="0.598039" r="0.598039" transform="matrix(1 0 0 -1 7.53931 6.34314)"
                            fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_8_2872" x1="8.13729" y1="-1.73039" x2="8.13729" y2="17.7059"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#B8DEFF"/>
                            <stop offset="1" stopColor="#363EAB"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className={'inner-text'}>
                <h3>Attention</h3>
                <p>Please, do not close the extension while messages are still sending.</p>
            </div>
        </div>
    )
}
