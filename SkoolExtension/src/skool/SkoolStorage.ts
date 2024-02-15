import {SkoolMemberEntity} from "./SkoolAutomation";

export type storagePageSettings = {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number
}

type processedMember<T> = {
    data: T;
    marked: boolean,
    id: string;
}

export type processedRecords<T> = {
    records: processedMember<T>[]
}

const SETTINGS_PAGINATION_DETAILS = 'automation:settings';
const PROCESSED_RECORDS = 'automation:records';


export class SkoolStorage{

    async saveSettings(data: storagePageSettings){
        await chrome.storage.local.set({SETTINGS_PAGINATION_DETAILS: JSON.stringify(data)});
    }

    async getSettings(){
        const data =  await chrome.storage.local.get([SETTINGS_PAGINATION_DETAILS])
        return (data[SETTINGS_PAGINATION_DETAILS]) ? data[SETTINGS_PAGINATION_DETAILS] : null;
    }

    async saveRecords<T>(records: processedRecords<T>){
        await chrome.storage.local.set({PROCESSED_RECORDS: JSON.stringify(records)});
    }

    async getRecords(){
        const data =  await chrome.storage.local.get([PROCESSED_RECORDS])
        return (data[PROCESSED_RECORDS]) ? data[PROCESSED_RECORDS] : null;
    }




}