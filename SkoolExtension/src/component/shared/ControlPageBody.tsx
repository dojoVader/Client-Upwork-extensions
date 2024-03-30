import React, {useEffect, useState} from "react";
import "../style/control.css";
import {PopupData} from "../../skool/SkoolStorage";
import {useSettingsStore, screen as whichScreen } from "../../zustand/store.settings";
import {sendToContentScript, sendToSkool} from "../../utils/chrome-utils";



// import WelcomeImage from "../assets/welcome.svg";

function ControlPageBody() {
    const [textarea, setTextarea] = useState("");
    const [messagePerHour, setMessagePerHour] = useState(0);
    const actionsSettings = useSettingsStore(state => state.actions);
    const [isRunningMode, setIsRunningMode] = useState();

    // Load from storage
    useEffect(() => {
        chrome.storage.local.get(['popupData'], (result) => {
            if(!result.popupData) {
                return;
            }
            const data = result.popupData as PopupData;
            setTextarea(data.message);
            setMessagePerHour(data.messagePerHour);

        });
    }, [])

    chrome.storage.local.onChanged.addListener((changes) => {
        if(changes.clockData) {
            if(changes.clockData.newValue && changes.clockData.newValue.counting !== undefined) {
            const {counting} = changes.clockData.newValue;
            setIsRunningMode(counting);
            }

        }
    });

    useEffect(() => {
        chrome.storage.local.get('clockData', (result) => {
            if(result.clockData && result.clockData.counting !== undefined) {
            const {counting} = result.clockData;

                setIsRunningMode(counting);
            }

        });
    }, []);



    // Save to storage
    useEffect(() => {
        // Save to storage
        if(messagePerHour === 0 && textarea.length <= 0) return; // Fixed bug
        const data: PopupData = {
            message: textarea,
            messagePerHour
        }
        chrome.storage.local.set({popupData: data}, () => {
            console.log('Data saved');
        });
    }, [textarea, messagePerHour])
    return (<>
            <div className="control_body">

                <div className="control-message">
                    <div className="control-header-message">
                        <span>💬</span>
                        <span>Message</span>
                    </div>
                    <div className="inner-content">
                    <textarea defaultValue={textarea} onChange={e => setTextarea(e.target.value)} placeholder={"Enter your message here"}>

                    </textarea>

                    </div>

                </div>

                <div className="control-option">
                    <div className="option-item">
                        <input name={'messagePerHour'} checked={messagePerHour === 60}  onClick={() => setMessagePerHour(60)} type="radio"/> <span>60 messages / hr</span>
                    </div>
                </div>
                <div className="control-option">
                    <div className="option-item">
                        <input name={'messagePerHour'} checked={messagePerHour === 30}  onClick={() => setMessagePerHour(30)} type="radio"/> <span>30 messages / hr</span>
                    </div>
                </div>
                <div className="control-option">
                    <div className="option-item">
                        <input name={'messagePerHour'} checked={messagePerHour === 10} onClick={() => setMessagePerHour(10)} type="radio"/> <span>2 messages / hr</span>
                    </div>
                </div>


            </div>
            <div className="button-cage" >
                {}
                <button  onClick={ async(e) => {
                    // strip out whitespaces
                    const message = textarea.trim();
                    if(message.length <= 0) {
                        chrome.runtime.sendMessage({
                            type: 'notification',
                            data: {
                                title: "Teachers Aid",
                                message: "Please enter a message"
                            }
                        }).then();
                        return;
                    }

                    if(messagePerHour <= 0) {
                        chrome.runtime.sendMessage({
                            type: 'notification',
                            data: {
                                title: "Teachers Aid",
                                message: "Please select the number of messages per hour"
                            }
                        }).then();
                        return;
                    }

                    await sendToSkool({
                        type: "blastOff"
                    })
                    actionsSettings.setSettings({
                        currentScreen: whichScreen.PROGRESS
                    })



                }} className="primary__button"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.44748 3.12502C9.06581 3.12502 8.70828 3.31173 8.49017 3.62494L4.9636 8.68918C4.30137 9.64016 4.00621 10.7989 4.13279 11.9508L4.40398 14.4187C4.51986 15.4732 5.34775 16.3086 6.40126 16.4339L8.16547 16.6438C9.51268 16.804 10.8787 16.6651 12.166 16.2369C13.0671 15.9372 13.7889 15.2533 14.1366 14.3696L15.5605 10.7512C15.6294 10.5761 15.6769 10.3935 15.7022 10.2071C15.9225 8.58447 14.4563 7.2402 12.8588 7.60016L9.61058 8.33208L10.5771 4.58281C10.7675 3.84447 10.21 3.125 9.44748 3.12502Z" fill="white"/>
                </svg>
                    Start sending message
                </button>
            </div>
        </>

    );
}

export default ControlPageBody;
