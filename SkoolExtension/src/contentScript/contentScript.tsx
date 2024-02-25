import {q} from "../utils/helpers";
import * as React from "react";
import {createRoot} from "react-dom/client";
import {SkoolAutomation, SkoolMemberEntity} from "../skool/SkoolAutomation";
import {QueueMap} from "../skool/Queue";
import {Scheduler} from "../skool/Scheduler";
import {ClockCounter} from "../component/ClockCounter";

declare var window;


console.log("Now fired in the School Extension....");

// Initiate the SkoolAutomator to find the elements in the page
const automator = new SkoolAutomation();


setTimeout(async() => {

    await chrome.runtime.sendMessage({message: "inject-script"});


    // Create the Queue to Hold the tasks to be processed
    const queueManager = new QueueMap<SkoolMemberEntity<HTMLElement>>();
    //Find the members in the page and the Pagination Information


    automator.debug();

    const clear = () => {
        automator.clear();
        queueManager.clear();
    }


    const scheduler = new Scheduler();

    // Set the duration when it changes from chrome.storage

    chrome.storage.local.onChanged.addListener((changes) => {

        if(changes?.popupData?.newValue) {
            const data = changes.popupData.newValue;
            scheduler.setDuration(data.hourToWait);
            scheduler.setMaximumInterval(data.maximumInterval);
        }
    });

    const calculateInterval= () : number => {
        const interval = Math.floor(Math.random() * scheduler.getMaximumInterval());
        return interval * 1000;
    }



    scheduler.onAnimationEnd(() => {
        //Get the members
        clear();
        automator.findPaginationInfo();
        automator.findActiveButton();
        automator.findMembers();
        const membersFound = automator.getMembers();
        // Check that we have members
        if (membersFound.length === 0) {
            alert("No members found,Please confirm that you are on the member/search page and try again.");
            return;
        }
        Array.from(membersFound).forEach(item => {

            const memberData = automator.extractMapMemberData(item);
            //add to the Queue
            queueManager.enqueue(memberData.userId, memberData);
            //

        })

        const iterator = queueManager.getList().entries();

        // We need to trigger the Queue as long as it has items
        const peekAtQueue = () => {
            // Do we have data in the queue
            const iteratorValue = iterator.next();
            if (!iteratorValue.done) {
                const [_, item] = iteratorValue.value;
                const [key, value] = item;

                automator.process(value).then(() => {
                    console.log('Clicked finish')
                    setTimeout(() => peekAtQueue(), calculateInterval());
                },() => {
                    setTimeout(() => peekAtQueue(), calculateInterval());
                })

            } else {
                // Click the next page
                // Check if it has a next page
                automator.findMembers();
                automator.findPaginationInfo();
                if (automator.hasNextPage()) {
                    automator.callNextButton();
                    setTimeout(() => {
                        clear();
                        scheduler.start();
                    }, 3000)

                } else {
                    //We might
                    alert("Finished")
                    automator.save();
                }

            }
        }
        peekAtQueue();

    })

    // listen to contentScript messages
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request);
        if (request.message === "startClock") {
            scheduler.start();
            // set to local storage that clock has started
            localStorage.setItem('clockStopped', 'false');
            sendResponse({message: "Clock started"});
        } else if (request.message === "stopClock") {
            scheduler.stop();
            // set to local storage that clock has stopped
            localStorage.setItem('clockStopped', 'true');
            sendResponse({message: "Clock stopped"});
        }
        return true;
    });

 // append skool counter to the dom

 const skoolcounter = document.createElement('div');
 skoolcounter.id = 'skool-counter';
 const root = createRoot(skoolcounter);
 root.render(<ClockCounter />);
 document.body.appendChild(skoolcounter);




}, 3000)






