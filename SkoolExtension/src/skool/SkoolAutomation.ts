import {q, sendMessage} from "../utils/helpers";
import {SkoolStorage} from "./SkoolStorage";
import {useProgressStore} from "../zustand/store.progress";

const TOTAL_PAGES_DOM_ELEMENT = "div.styled__DesktopPaginationMeta-sc-4zz1jl-2 ";
const MEMBERSHIP_DOM = "div.styled__MembersListWrapper-sc-ne2uns-0";
const BUTTON_WRAPPER = "div.styled__ButtonWrapper-sc-qwyv4g-4";
const MODAL_MEMBER = "div.skool-ui-base-modal";
const TEXT_AREA = "textarea.styled__MultiLineInput-sc-1k6d9cc-2";
const DISPLAY_SELECTOR = "div.styled__UserNameHandleWrapper-sc-qwyv4g-3 > div";
const MODAL_CONTROLS = ".skool-ui-base-modal .Box-sc-1kefve6-0.Row-sc-w8j4n-0";
const PAGINATION_CONTROL = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button > span";
const PAGINATION_ACTIVE_BUTTON = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button.xdIsU";


export interface SkoolMemberEntity<T> {
    displayName: string;
    userId: string;
    data: T

}

export interface StorageMemberChecker {
    id: string;
    name: string;
    marked: boolean;
    data?: HTMLElement,
    isAdmin?: boolean
}

export class SkoolAutomation {


    private totalMembers = 0
    private currentPage = 0;
    private itemsPerPage = 0;
    private currentMembersToSpam: HTMLElement[] = [];
    private currentMembersProcessed = {
        records: []
    }
    private maximumMessagesPerHour = 0;
    private currentMessageCount = 0;
    private currentMaximumCount = 0;
    private message: string = "";
    private memberQueue: StorageMemberChecker[] = [];
    private  progressAction = useProgressStore.getState().actions;
    private memberHashmap : Map<string,HTMLElement> = new Map<string, HTMLElement>();


    constructor() {
        // Get the message from the chrome SkoolStorage

        const skoolStorage = new SkoolStorage();
        skoolStorage.getPopupData().then((data) => {
            this.setMessage(data.message);
            this.setMaximumMessagesPerHour(3 || data.messagePerHour);
        });

        // create storage for current members
        localStorage.setItem("currentMembers", JSON.stringify([]));

    }

    setMaximumMessagesPerHour(maximumMessagesPerHour: number) {
        this.maximumMessagesPerHour = maximumMessagesPerHour;
    }

    setMessage(message: string) {
        this.message = message;
    }

    getCurrentMessageCount() {
        return this.getProcessedMembersCount();
    }

    setCurrentMessageCount(count: number) {
        this.currentMessageCount = count;
    }

    getTotalMembers() {
        return this.totalMembers;
    }


    getMaximumMessagesPerHour() {
        return this.maximumMessagesPerHour;
    }

    getCurrentMaximumCount() {
        return this.currentMaximumCount;
    }

    setTotalMembers(totalMembers: number) {
        this.totalMembers = totalMembers;
    }

    setCurrentPage(currentPage: number) {
        this.currentPage = currentPage;
    }
    setCurrentMaximumCount(count: number) {
        this.currentMaximumCount = count;
    }

    setItemsPerPage(itemsPerPage: number) {
        this.itemsPerPage = itemsPerPage;
    }

    findMembers() {
        const domNodes = q(MEMBERSHIP_DOM, false);
        // Assign the childNodes to the property
        if (domNodes) {
            if (this.currentMembersToSpam.length === 0) {
                this.currentMembersToSpam = (domNodes.childNodes);
            } else {
                this.currentMembersToSpam.push(...domNodes.childNodes);
            }

            this.setItemsPerPage(this.currentMembersToSpam.length);
        } else {
            return null;
        }
        // extract the data and store in the Hashmap
        this.currentMembersToSpam.forEach((item) => {
            const member = this.extractMapMemberData(item);
            // check that it exists in the hashmap
            if(!this.memberHashmap.has(member.userId)){
                this.memberHashmap.set(member.userId,item);
            }
        });
    }

    getCurrentMembersRecord() {
        return this.currentMembersToSpam.length;
    }

    getMembers(): HTMLElement[] {
        this.removeDuplicatesFromQueueMember();
        // get the maximum messages from the localStorage currentQueue members using a slice from maximumMessagesPerHour
        const members = localStorage.getItem("currentQueueMembers");
        const memberQueue: StorageMemberChecker[] = JSON.parse(members);
        return memberQueue.filter((item) => (
            item.marked === false
        )).map(item => this.memberHashmap.get(item.id)).slice(0, this.maximumMessagesPerHour);
    }

    removeDuplicatesFromQueueMember() {
        // Remove duplicates from the this.memberQueue
        const memberQueue = this.memberQueue;
        this.memberQueue = memberQueue.filter
        ((v, i, a) =>
            a.findIndex(t => (t.id === v.id)) === i);
    }

    getProcessedMembersCount(): number {
        const members = localStorage.getItem("currentQueueMembers");
        const memberQueue: StorageMemberChecker[] = JSON.parse(members);
        return memberQueue.filter((item) => (
            item.marked === true
        )).length
    }


    extractMapMemberData(member: HTMLElement) {

        const parentNode = q(DISPLAY_SELECTOR, false, member);
        const memberData: SkoolMemberEntity<HTMLElement> = {
            data: member,
            displayName: parentNode.childNodes.item(0).innerText,
            userId: parentNode.nextSibling.innerText
        }
        return memberData
    }

    addProcessedMember(token: string, member: SkoolMemberEntity<HTMLElement>) {
        console.log(member)
        this.currentMembersProcessed.records.push({
            id: member.userId,
            name: member.displayName
        })
    }

    async process(item: SkoolMemberEntity<HTMLElement>) {
        const chatButton = this.findChatButton(item.data);
        if (!chatButton){

            this.currentMaximumCount++;
            this.progressAction.setProgress({
                totalCount: this.getTotalMembers(),
                currentCount: this.getCurrentMessageCount(),
                textContent: "-"
            });
            chrome.storage.local.set({
                progressEvent: {
                    currentCount: this.getCurrentMessageCount(),
                    totalCount: this.getTotalMembers(),
                    textContent: "-"
                }
            }).then();
            this.persistToLocalStorage(item);
            return new Promise((resolve, reject) => reject(false));
        }


        return new Promise(async (resolve, reject) => {
            await this.clickMemberChat(chatButton);
            //await this.sendMessageToMember(item.data,this.message);
            await this.clickCloseButton();
            resolve(true);
            this.addProcessedMember(item.userId, item);

            this.currentMaximumCount++;
            this.persistToLocalStorage(item);
            this.progressAction.setProgress({
                totalCount: this.getTotalMembers(),
                currentCount: this.getCurrentMessageCount(),
                textContent: "-"
            });
            chrome.storage.local.set({
                progressEvent: {
                    currentCount: this.getCurrentMessageCount(),
                    totalCount: this.getTotalMembers(),
                    textContent: "-"
                }
            }).then();

        });
    }

    debug() {
        console.log(this.currentMembersToSpam.length);
        // print all the pagination details
    }

    persistToLocalStorage(item: SkoolMemberEntity<HTMLElement>) {
        //Get the currentMember and add to it

        const currentMembers = localStorage.getItem("currentQueueMembers");
        const memberQueue: StorageMemberChecker[] = JSON.parse(currentMembers);
        // find the member and mark it as processed
        const member = memberQueue.find((member) => member.id === item.userId);
        if (member) {
            member.marked = true;
        }

        // make the selected memberQueue marked as true
        localStorage.setItem("currentQueueMembers", JSON.stringify(memberQueue));





    }

    persistTotalMembers() {

        const members = Array.of(...this.currentMembersToSpam);
        const filteredMembers = this.checkIfExistsInCurrentQueueStorage(members);
        const memberQueue: StorageMemberChecker[] = [];

        if(filteredMembers.length === 0) return;

        filteredMembers.forEach((item: HTMLElement) => {
            const isAdmin = this.findChatButton(item) === null;
            const member = this.extractMapMemberData(item);
            memberQueue.push({
                id: member.userId.toString(),
                name: member.displayName,
                marked: false,
                data: item,
                isAdmin

            });
            this.memberQueue.push({
                id: member.userId.toString(),
                name: member.displayName,
                marked: false,
                data: item,
                isAdmin
            });
        });
        // Get Member from the storage
        const currentMembers = localStorage.getItem("currentQueueMembers");
        const storageMemberQueue: StorageMemberChecker[] = JSON.parse(currentMembers);
        const newMemberQueue = [...storageMemberQueue, ...memberQueue];
        localStorage.setItem("currentQueueMembers", JSON.stringify(newMemberQueue));

    }

    findChatButton(node: HTMLElement): HTMLElement {
        if (node) {
            const buttons = q(BUTTON_WRAPPER, false, node)
            if (!buttons) return null;
            return buttons.childNodes.item(0);
        }
        return null;


    }

    async save() {
        const storage = new SkoolStorage();
        await storage.saveProcessedRecords(this.currentMembersProcessed.records);
        chrome.storage.local
            .set({clockData: {time: 0, counting: false}})
            .then()
    }


    // Order 1
    async clickMemberChat(node: HTMLElement) {
        return new Promise((resolve, reject) => {
            if (node) {
                node.click();
                resolve(true);
            }
        });

    }

    async sendMessageToMember(node: HTMLElement, message: string) {
        return new Promise<any>(async (resolve, reject) => {

            if (node) {
                const REACT_PROPS = /__reactProps/gi;
                const isModalFound = await this.checkElement(MODAL_MEMBER);
                if (isModalFound) {
                    const modalDom = q(MODAL_MEMBER, false);
                    await this.checkElement(TEXT_AREA, modalDom);
                    const textAreaDom = q(TEXT_AREA, false, modalDom);

                    // Find the React Props and send the message
                    setTimeout(async () => {
                        textAreaDom.innerText = message;
                        await sendMessage(message, this.getChannelName()).then((response) => {
                            setTimeout(() => {
                                textAreaDom.innerText = "";
                                resolve(true);
                            }, 2000);
                        });
                    }, 3000)


                }

            }
        })


    }

    getChannelName() {
        const channelName = "currentUser";
        return localStorage.getItem(channelName);
    }

    clickCloseButton() {
        return new Promise(async (resolve, reject) => {
            const isModalFound = await this.checkElement(MODAL_MEMBER);
            if (isModalFound) {
                const modalDom = q(MODAL_MEMBER, false);
                await this.checkElement(MODAL_CONTROLS, modalDom);
                const modalControlNodeCollections = q(MODAL_CONTROLS, true, modalDom)
                const [foundControlNode] = Array.of(...modalControlNodeCollections).filter((item) => {
                    return item.style.boxShadow === "none"
                });
                const modalControlNode = foundControlNode.childNodes[1];
                await this.checkElement("button.styled__ButtonWrapper-sc-dscagy-1", modalControlNode);
                if (modalControlNode) {
                    const closeButton = modalControlNode.childNodes.item(2) as HTMLElement;
                    setTimeout(() => {
                        closeButton.click();
                        resolve(true);
                    }, 4000)
                }

            }


        });

    }


    findPaginationInfo() {
        const paginationDOM = q(TOTAL_PAGES_DOM_ELEMENT, false);
        const paginationText = paginationDOM.innerText;
        console.log(paginationText);
        // write a regex for the following text capturing the number in it 1-30 of 565
        const regex = /(\d+)-(\d+) of (\d+)/g;
        const match = regex.exec(paginationText);
        if (match) {


            this.setTotalMembers(parseInt(match[3]));

            //Find the currentPage from activeButton innerText
            this.findActiveButton();

            chrome.storage.local.set({
                progressEvent: {
                    currentCount: this.getCurrentMessageCount(),
                    totalCount: this.getTotalMembers(),
                    textContent: "-"
                }
            }).then();

        }

    }

    private rafAsync() {
        return new Promise(resolve => {
            requestAnimationFrame(resolve); //faster than set time out
        });
    }

    async checkElement(selector: string, source?: HTMLElement) {
        let querySelector = null;
        while (querySelector === null) {
            await this.rafAsync();
            querySelector = !source ? document.querySelector(selector) : source.querySelector(selector);
        }
        return querySelector;
    }

    callNextButton() {
        const buttons = q(PAGINATION_CONTROL, true);
        const nextButton = buttons.item(buttons.length - 1);
        if (nextButton) {
            nextButton.parentNode.click();
        }
    }

    resetCount() {
        this.currentMessageCount = 0;
        this.currentMaximumCount = 0;

    }

    clear(clearStorage: boolean = false) {
        this.currentMembersToSpam = [];
        if (clearStorage) {
            this.currentMembersProcessed.records = [];
        }

    }

    findActiveButton() {

        this.setCurrentPage(1);
    }

    hasNextPage() {
        const totalPage = Math.floor(this.totalMembers / this.itemsPerPage);
        return (this.currentPage !== totalPage)
    }


    private checkIfExistsInCurrentQueueStorage(members: HTMLElement[]) {
        // Check if the member exists in the currentQueueMembers
        const currentMembers = localStorage.getItem("currentQueueMembers");
        const memberQueue: StorageMemberChecker[] = JSON.parse(currentMembers);
        if (memberQueue.length === 0) return members;


        const memberIds =
            memberQueue.map((item) => item.id);
        return Array.of(...members).filter((item) => {
            const member = this.extractMapMemberData(item);
            return (!memberIds.includes(member.userId))
        })


    }
}