import React from "react";
import Header from "../component/ui/Header";
import ControlPageBody from "../component/shared/ControlPageBody";
import {screen, useSettingsStore} from "../zustand/store.settings";

function Control() {
    const screenState = useSettingsStore(state => state);


    return (
        <div>
            <Header hideClock={true}/>
            <ControlPageBody />

        </div>
    );
}

export default Control;
