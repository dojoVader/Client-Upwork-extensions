import {useCounterStore} from "../zustand/SkoolCounter";
import {SkoolStorage} from "./SkoolStorage";


export class Clockwatch {

    private startTiming: number = 0;
    private currentOffset: number = 0;
    private isPaused: boolean = false;


    pause() {
        this.isPaused = true;
        chrome.storage.local
            .set({stopWatch: {time: this.startTiming / 1000, counting: false}})
            .then()
    }

    resume() {
        this.isPaused = false;
    }


    start() {
        console.log("Starting the Clockwatch...");
        this.isPaused = false;
        window.requestAnimationFrame((elapse) => this.onElapsed(elapse));

    }


    stop() {
        this.startTiming = 0;
        this.isPaused = true;
        chrome.storage.local
            .set({stopWatch: {time: this.startTiming / 1000, counting: false}})
            .then()
    }

    private onElapsed(timestamp: number) {
        // only run when localstorage clock is active

        if(!this.isPaused) {
            chrome.storage.local
                .set({stopWatch: {time: timestamp === 0 ? 0 : timestamp / 1000, counting: true}})
                .then()
            window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
        }


    }


}