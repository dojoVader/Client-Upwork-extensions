import React, {useEffect, useState} from "react";
import "../style/sidebar-ui.css";
import Welcome from "../../pages/Welcome";
import Control from "../../pages/Control";
import Progress from "../../pages/Progress";
import {SettingsState, useSettingsStore, screen as whichScreen} from "../../zustand/store.settings";


export const Sidebar = () => {

    const state = useSettingsStore(state => state);
    const currentScreen = state.settings.currentScreen;
    const actions = useSettingsStore(state => state.actions);

    useEffect(() => {
        if (localStorage.getItem("onboarding") === "true" && currentScreen === "WELCOME") {

            actions.setSettings({
                currentScreen: whichScreen.SETTINGS
            });


        }

        chrome.storage.local.get(['progressEvent'], (result) => {
            if(result.progressEvent){
                const {currentCount = 0, totalCount = 0} = result.progressEvent;

                if(currentCount !== 0 && totalCount !== 0) {
                    if(currentCount === totalCount){
                        actions.setSettings({
                            currentScreen: whichScreen.PROGRESS
                        });
                    }
                }

            }else{
                actions.setSettings({
                    currentScreen: whichScreen.SETTINGS
                });
            }
        });


        chrome.storage.local.get('clockData', (result) => {
            if(result.clockData && result.clockData.counting !== undefined) {
                const {counting = false} = result.clockData;
                if(counting){
                    actions.setSettings({
                        currentScreen: whichScreen.PROGRESS
                    });
                }
            }

        });
    }, []);





    return (
        <div className="container__wrapper">
            {currentScreen && currentScreen === whichScreen.WELCOME && <Welcome/>}
            {currentScreen && currentScreen === whichScreen.SETTINGS && <Control/>}
            {currentScreen && currentScreen === whichScreen.PROGRESS && <Progress/>}


        </div>
    );
};
