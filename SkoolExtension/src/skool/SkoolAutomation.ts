import {q, sendMessage} from "../utils/helpers";

const TOTAL_PAGES_DOM_ELEMENT = "div.styled__DesktopPaginationMeta-sc-4zz1jl-2 ";
const MEMBERSHIP_DOM = "div.styled__MembersListWrapper-sc-ne2uns-0";
const BUTTON_WRAPPER = "div.styled__ButtonWrapper-sc-qwyv4g-4";
const MODAL_MEMBER = "div.skool-ui-base-modal";
const TEXT_AREA = "textarea.styled__MultiLineInput-sc-1k6d9cc-2";
const DISPLAY_SELECTOR = "div.styled__UserNameHandleWrapper-sc-qwyv4g-3 > div";
const MODAL_CONTROLS = ".skool-ui-base-modal .Box-sc-1kefve6-0.Row-sc-w8j4n-0.kUmgoq";
const PAGINATION_CONTROL = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button > span";
const PAGINATION_ACTIVE_BUTTON = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button.dJCdCN";


export interface SkoolMemberEntity<T> {
    displayName: string;
    userId: string;
    data: T

}

export class SkoolAutomation{


    private totalPages = 0
    private currentPage = 0;
    private itemsPerPage = 0;
    private currentMembersToSpam: HTMLElement[] = [];
    private currentMembersProcessed: Map<string,HTMLElement> = new Map();
    private highestInterval = 10000;


    constructor() {
    }

    setTotalPages(totalPages: number){
        this.totalPages = totalPages;
    }

    setCurrentPage(currentPage: number){
        this.currentPage = currentPage;
    }

    setItemsPerPage(itemsPerPage: number){
        this.itemsPerPage = itemsPerPage;
    }
    findMembers(){
        const domNodes = q(MEMBERSHIP_DOM,false);
        // Assign the childNodes to the property
        this.currentMembersToSpam = (domNodes.childNodes);
        this.setItemsPerPage(this.currentMembersToSpam.length);
    }

    getMembers(){
        return this.currentMembersToSpam;
    }

    extractMapMemberData(member: HTMLElement){

        const parentNode  = q(DISPLAY_SELECTOR,false, member);
        const memberData: SkoolMemberEntity<HTMLElement> = {
            data: member,
            displayName:parentNode.childNodes.item(0).innerText,
            userId: parentNode.nextSibling.innerText
        }
        return memberData
    }

    addProcessedMember(token:string, member: HTMLElement){
        this.currentMembersProcessed.set(token,member);
    }

    async process(item: SkoolMemberEntity<HTMLElement>){
        const chatButton = this.findChatButton(item.data);
        if(!chatButton) return new Promise((resolve,reject) => reject(false));
        return new Promise(async(resolve,reject) => {
           await this.clickMemberChat(chatButton);
           await this.sendMessageToMember(item.data,"Hello, how are you ?  ");
           await this.clickCloseButton();
            resolve(true);
            this.addProcessedMember(item.userId,item.data);
        });
    }
    debug(){
        console.log(this.currentMembersToSpam.length);
        // print all the pagination details
        console.log(this.currentPage);
        console.log(this.itemsPerPage);
        console.log(this.totalPages);

    }

    findChatButton(node: HTMLElement): HTMLElement{
        if(node){
            const buttons = q(BUTTON_WRAPPER,false, node)
            if(!buttons) return null;
            return buttons.childNodes.item(0);
        }
        return null;


    }


    // Order 1
    async clickMemberChat(node: HTMLElement){
        return new Promise((resolve,reject) => {
            if(node){
                node.click();
                resolve(true);
            }
        });

    }

    async sendMessageToMember(node: HTMLElement, message: string){
        return new Promise<any>(async (resolve,reject) => {

            if(node){
                const REACT_PROPS = /__reactProps/gi;
                const isModalFound = await this.checkElement(MODAL_MEMBER);
                if(isModalFound){
                    const modalDom = q(MODAL_MEMBER,false);
                    await this.checkElement(TEXT_AREA,modalDom);
                    const textAreaDom = q(TEXT_AREA,false,modalDom);

                        // Find the React Props and send the message
                    setTimeout(async () => {
                        textAreaDom.innerText = message;
                        await sendMessage(message,this.getChannelName()).then((response) => {
                            setTimeout(() => {
                                textAreaDom.innerText = "";
                                resolve(true);
                            },2000 );
                        });
                    },3000)



                }

            }
        })


    }

    getChannelName(){
        const channelName = "currentUser";
        return localStorage.getItem(channelName);
    }
    clickCloseButton(){
        return new Promise(async(resolve,reject)=> {
                const isModalFound = await this.checkElement(MODAL_MEMBER);
                if(isModalFound){
                    const modalDom = q(MODAL_MEMBER,false);
                    await this.checkElement(MODAL_CONTROLS,modalDom);
                    const modalControlNode = q(MODAL_CONTROLS,false,modalDom)
                    await this.checkElement("button.styled__ButtonWrapper-sc-dscagy-1",modalControlNode);
                    if(modalControlNode){
                        const closeButton = modalControlNode.childNodes.item(2) as HTMLElement;
                        setTimeout(() => {
                            closeButton.click();
                            resolve(true);
                        },4000)
                    }

                }


        });

    }


    findPaginationInfo(){
        const paginationDOM = q(TOTAL_PAGES_DOM_ELEMENT,false);
        const paginationText = paginationDOM.innerText;
        console.log(paginationText);
        // write a regex for the following text capturing the number in it 1-30 of 565
        const regex = /(\d+)-(\d+) of (\d+)/g;
        const match = regex.exec(paginationText);
        if(match){



            this.setTotalPages(parseInt(match[3]));

            //Find the currentPage from activeButton innerText
            this.findActiveButton();


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

    callNextButton(){
        const buttons = q(PAGINATION_CONTROL,true);
        const nextButton = buttons.item(buttons.length - 1);
        if(nextButton){
            nextButton.parentNode.click();
        }
    }
    clear(){
        this.currentMembersToSpam = [];
        this.currentMembersProcessed.clear();
    }

    findActiveButton(){
        const button = q(PAGINATION_ACTIVE_BUTTON,false);
        this.setCurrentPage(parseInt(button.childNodes.item(0).innerText));
    }

    hasNextPage(){
        const totalPage = Math.floor(this.totalPages / this.itemsPerPage);

        return (this.currentPage !== totalPage )


    }




}