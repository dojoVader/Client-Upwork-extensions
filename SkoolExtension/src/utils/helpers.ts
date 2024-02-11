import {configuration} from "../constant/config";


export function dom(dom: string, attrib: any, cb?: Function) {
    let domNode = document.createElement(dom);
    let key = "";
    for (key in attrib) {
        domNode.setAttribute(key, attrib[key])
    }
    //Create a callback to allow us embed inner dom in it
    if (cb) {
        return cb(domNode)
    }
    return domNode;
}

export function q(selector: string, multiElements: boolean = false, source: HTMLElement = null): any {
    if (multiElements) {
        return (source || document).querySelectorAll(selector);
    }
    return (source || document).querySelector(selector)
}

// write a debounce function
export function debounce(func, timeout = 300){

    console.log("debounce...")
    let timer;
    return (...args) => {
        console.log("clear...")
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function isTwitterProfilePage(): boolean{
    return q(TWITTER_SELECTOR);
}

export type TwitterTagData = {color: string, profile: string, label: string};

export async function saveTag(data: TwitterTagData ){
 const tags = await chrome.storage.local.get(configuration.STORAGE.SCHEMA_TAGS);
 const items: TwitterTagData[] = tags[configuration.STORAGE.SCHEMA_TAGS];
 if(items){
     // CHeck thet the tags doesn't exists
     const found = items.filter(item => item.profile.includes(data.profile));
     if(!found.length){
         items.push({...data})
         // Persist the new data back
         return await chrome.storage.local.set({[configuration.STORAGE.SCHEMA_TAGS]: items })
     }else{
         const _found = found[0];
         _found.color = data.color;
         _found.label = data.label;
         return await chrome.storage.local.set({[configuration.STORAGE.SCHEMA_TAGS]: items});
     }


 }
 return await chrome.storage.local.set({[configuration.STORAGE.SCHEMA_TAGS]: [{...data}] })

}

export async function loadTags() {
    const tags = await chrome.storage.local.get(configuration.STORAGE.SCHEMA_TAGS);
    return tags[configuration.STORAGE.SCHEMA_TAGS];
}


export const TWITTER_SELECTOR = "div[data-testid='UserName']";
export const TWITTER_PRIMARY_COLUMN = "div[data-testid='primaryColumn']";
export const TWITTER_COLLECTION_PROFILE = "div[data-testid='cellInnerDiv']";
export const MAIN_TIMELINE_READ = "[aria-label='Timeline: Your Home Timeline']";
export const SEARCH_TIMELINE_READ = "[aria-label='Timeline: Search timeline']";
export const TWITTER_USER_NAME_NODE = 'div[data-testid="User-Name"]';
export const TWITTER_USERNAME_LINK_SPAN_NODE = "a[role='link'] > div > span";


