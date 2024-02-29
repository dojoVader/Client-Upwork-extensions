import {SkoolMemberEntity} from "./SkoolAutomation";

export type PopupData = {
    message:string;
    messagePerHour: number;

}




const SETTINGS_PAGINATION_DETAILS = 'automation:settings';
export const PROCESSED_RECORDS = 'automation:records';


export class SkoolStorage{

    async saveProcessedRecords(records: SkoolMemberEntity<any>[]){
        await chrome.storage.local.set({[PROCESSED_RECORDS]: JSON.stringify(records)});
    }

    async getProcessedRecords(): Promise<{id: number, name: string}[]>{
        const data =  await chrome.storage.local.get([PROCESSED_RECORDS])
        return (data[PROCESSED_RECORDS]) ? JSON.parse(data[PROCESSED_RECORDS]) as any : [];
    }

    async savePopupData(data: PopupData){
        await chrome.storage.local.set({popupData: JSON.stringify(data)});
    }

    async getPopupData(): Promise<PopupData>{
        const data =  await chrome.storage.local.get(['popupData'])
        return (data['popupData']) ? (data['popupData']) as PopupData : null;
    }


    async clearProcessedRecords() {
        await chrome.storage.local.remove(PROCESSED_RECORDS);
    }
}