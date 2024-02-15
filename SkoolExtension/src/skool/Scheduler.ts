const duration = 5;


export class Scheduler {

    private startTiming: number = 0;

    private callback: () => void = null;

    private onElapsed(timestamp: number) {
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


}