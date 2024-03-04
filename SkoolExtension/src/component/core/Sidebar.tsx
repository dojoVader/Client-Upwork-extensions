import React, {useEffect, useState} from "react";
import "../style/sidebar-ui.css";
import Welcome from "../../pages/Welcome";
import Control from "../../pages/Control";
import Progress from "../../pages/Progress";
import {SettingsState, useSettingsStore, screen} from "../../zustand/store.settings";


export const Sidebar = () => {

    const state = useSettingsStore(state => state);
    const currentScreen = state.settings.currentScreen;
    const actions = useSettingsStore(state => state.actions);

    if (localStorage.getItem("onboarding") === "true" && currentScreen === "WELCOME") {

        actions.setSettings({
            currentScreen: screen.SETTINGS
        });


    }



    return (
        <div className="container__wrapper">
            {currentScreen && currentScreen === screen.WELCOME && <Welcome/>}
            {currentScreen && currentScreen === screen.SETTINGS && <Control/>}
            {currentScreen && currentScreen === screen.PROGRESS && <Progress/>}


        </div>
    );
};
