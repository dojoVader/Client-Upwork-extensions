import {q} from "../utils/helpers";
import {SkoolAutomation, SkoolMemberEntity} from "../skool/SkoolAutomation";
import {QueueMap} from "../skool/Queue";
import {Scheduler} from "../skool/Scheduler";

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
    scheduler.onAnimationEnd(() => {
        //Get the members
        clear();
        automator.findPaginationInfo();
        automator.findActiveButton();
        automator.findMembers();
        const membersFound = automator.getMembers();
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
                    setTimeout(() => peekAtQueue(), 2000);
                },() => {
                    setTimeout(() => peekAtQueue(), 2000);
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
                }

            }
        }
        peekAtQueue();

    })
    //scheduler.start();






}, 3000)




