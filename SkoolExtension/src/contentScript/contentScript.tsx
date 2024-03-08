import {q} from "../utils/helpers";
import * as React from "react";
import {createRoot} from "react-dom/client";
import {SkoolAutomation, SkoolMemberEntity} from "../skool/SkoolAutomation";
import {QueueMap} from "../skool/Queue";
import {Scheduler} from "../skool/Scheduler";


declare var window;

localStorage.setItem('currentQueueMembers', JSON.stringify([]));
chrome.storage.local.remove(['clockData', 'progressEvent','stopWatch']).then()


console.log("Now fired in the School Extension....");

// Initiate the SkoolAutomator to find the elements in the page
const automator = new SkoolAutomation();


setTimeout(async () => {

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


    const calculateInterval = (): number => {
        const interval = Math.floor(Math.random() * scheduler.getMaximumInterval());
        return interval * 1000;
    }

    const getCurrentQueueMembers = (): [any] => {
        return JSON.parse(localStorage.getItem('currentQueueMembers'));
    }
    const isMaximumMessageCountReached = () => automator.getCurrentMaximumCount() >= automator.getMaximumMessagesPerHour();
    automator.findPaginationInfo();

    scheduler.onAnimationEnd(() => {
        //Get the members

        clear();

        automator.findActiveButton();
        const result = automator.findMembers();
        if (result === false) {
            alert("No members found,Please confirm that you are on the member/search page and try again.");
            return;
        }
        automator.persistTotalMembers();
        const membersFound = automator.getMembers();
        // Check that we have members
        Array.from(membersFound).forEach(item => {

            const memberData = automator.extractMapMemberData(item);
            //add to the Queue

            queueManager.enqueue(memberData.userId, memberData);
        })

        const iterator = queueManager.getList().entries();

        // We need to trigger the Queue as long as it has items
        const peekAtQueue = () => {
            chrome.storage.local.get('clockData', (result) => {
                if (result.clockData.counting) {
                    // Do we have data in the queue
                    const iteratorValue = iterator.next();
                    if (!iteratorValue.done) {
                        const [_, item] = iteratorValue.value;
                        const [key, value] = item;

                        automator.process(value).then(() => {
                            setTimeout(() => peekAtQueue(), calculateInterval());
                        }, () => {
                            setTimeout(() => peekAtQueue(), calculateInterval());
                        })

                    } else {
                        // We need to find out the number of maximumMessage per hour has been met
                        if (isMaximumMessageCountReached()) {
                            // We need to stop the clock
                            automator.setCurrentMaximumCount(0)
                            scheduler.stop();
                            setTimeout(() => {
                                scheduler.start();
                            }, 1000);
                        } else {
                            if (automator.getCurrentMessageCount() < automator.getTotalMembers()) {
                                if (automator.hasNextPage()) {
                                    automator.callNextButton();
                                    setTimeout(() => {
                                        clear();

                                        scheduler.start();
                                    }, 3000)
                                }
                            } else {
                                //We might
                                chrome.runtime.sendMessage({
                                    type: 'notification',
                                    data: {
                                        title: "Teachers Aid",
                                        message: "All members have been processed"
                                    }
                                })
                                automator.save();
                                automator.clear(true)
                                chrome.storage.local.remove(['progressEvent', 'clockData']).then();
                            }

                        }


                    }
                }

            });

        }
        peekAtQueue();

    })

    // listen to contentScript messages
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request);
        if (request.type === "startClock") {
            scheduler.start()
            // set to local storage that clock has started

            sendResponse({message: "Clock started"});
        } else if (request.type === "stopClock") {
            scheduler.stop();
            // set to local storage that clock has stopped

            sendResponse({message: "Clock stopped"});
        } else if (request.type === "blastOff") {
            scheduler.setBlastOff(true);
            sendResponse({message: "Blasted Off"});
        }else if (request.type === "finished-event") {
            automator.clear();
            automator.resetCount();
            // clear progessEvent from chrome.storage.local
            chrome.storage.local.remove(['progressEvent']).then();
        }
        return true;
    });




}, 3000)






