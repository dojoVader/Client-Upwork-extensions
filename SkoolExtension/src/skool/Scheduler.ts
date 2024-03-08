import {useCounterStore} from "../zustand/SkoolCounter";
import {SkoolStorage} from "./SkoolStorage";


export class Scheduler {

    private startTiming: number = 0;

    private duration: number = 15;

    private maximumInterval: number = 10;

    private callback: () => void = null;
    private blastOff: boolean = false;

    constructor() {

        // Get the PopUI data and set the duration from chrome storage
        const skoolStorage = new SkoolStorage();

    }

    getStartTiming() {
        return this.startTiming;
    }

    setBlastOff(blastOff: boolean) {
        this.blastOff = blastOff;
        this.onBlast();
    }


    setDuration(duration: number) {
        this.duration = duration;
    }

    setMaximumInterval(maximumInterval: number) {
        this.maximumInterval = maximumInterval;
    }

    onAnimationEnd(callback: () => void) {
        if (callback) {
            this.callback = callback;
            chrome.storage.local
                .set({clockData: {time: this.startTiming, counting: false}})
                .then()
        }
    }


    start() {
        console.log("Starting the scheduler...");
        console.log(this.callback);
        chrome.storage.local
            .set({clockData: {time: this.startTiming, counting: true}})
            .then()
        window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
    }


    stop() {

        chrome.storage.local
            .set({clockData: {time: this.startTiming, counting: false}})
            .then()
    }

    private onBlast() {

        chrome.storage.local
            .set({clockData: {time: this.startTiming, counting: true}})
            .then(() => {
                this.callback();
            })
    }


    private onElapsed(timestamp: number) {
        // only run when localstorage clock is active

        chrome.storage.local.get('clockData', (result) => {
            if (result.clockData.counting) {
                const duration = this.duration;
                if (this.blastOff) {
                    this.blastOff = false;
                }
                useCounterStore.getState().actions.setClock({
                    time: duration - (timestamp - this.startTiming) / 1000,
                    counting: true
                });

                chrome.storage.local
                    .set({clockData: {time: duration - (timestamp - this.startTiming) / 1000, counting: true}})
                    .then()
                // If the initial timing is not set let's set the timing
                if (!this.startTiming) {
                    this.startTiming = timestamp;
                }

                const timeElasped = (timestamp - this.startTiming) / 1000;
                if (timeElasped > duration) {
                    console.log("10 Seconds Elapsed, time to fire callback....");
                    this.startTiming = 0; // reset
                    this.callback();
                } else {
                    window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
                }
            }
        });


    }


    getMaximumInterval() {
        return this.maximumInterval;
    }
}