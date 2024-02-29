import {useCounterStore} from "../zustand/SkoolCounter";
import {SkoolStorage} from "./SkoolStorage";




export class Scheduler {

    private startTiming: number = 0;

    private duration: number = 10;

    private maximumInterval: number = 10;

    private callback: () => void = null;

    constructor() {

        // Get the PopUI data and set the duration from chrome storage
        const skoolStorage = new SkoolStorage();
        skoolStorage.getPopupData().then((data) => {
            if (data) {
                console.log(data.messagePerHour);
                this.setDuration(data.messagePerHour );

            }
        });
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
        }
    }


    start() {
        console.log("Starting the scheduler...");
        console.log(this.callback);
        window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
    }


    stop() {
        this.startTiming = 0;
    }

    private onElapsed(timestamp: number) {
        // only run when localstorage clock is active

        if(localStorage.getItem('clockStopped') === 'false') {
            const duration = this.duration;
            useCounterStore.getState().actions.setClock({
                time: duration - (timestamp - this.startTiming) / 1000,
                counting: true
            });
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
    }

    getMaximumInterval() {
        return this.maximumInterval;
    }
}