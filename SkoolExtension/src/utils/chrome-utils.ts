import Tab = chrome.tabs.Tab;

declare var chrome: any;

export type MessageType = {
    type: string;
    data?: any;
};

/**
 * Determines if the code is running in a ContentScript context
 * @return boolean
 */
export function isContentScript(): boolean {
    return !chrome.hasOwnProperty('tabs');
}

export async function sendToSkool(data: MessageType) {

    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        currentWindow: true,
    });
    const [tab] = tabs;


    if (tabs.length <= 0) {
        try{
            const pingResponse = await chrome.tabs.sendMessage(tab?.id, {type: 'ping'});
            if (pingResponse.message === 'pong') {
                const fetchTabs = await chrome.tabs.query({});
                const skoolTab: Tab | undefined = fetchTabs.find((tab: Tab) => tab.url?.includes('skool'));
                if (skoolTab) {
                    await chrome.tabs.sendMessage(skoolTab.id, data, (response: any) => {
                        console.log(response)
                    });
                }
            }
        }
        catch(e){
            const fetchTabs = await chrome.tabs.query({});
            const skoolTab: Tab | undefined = fetchTabs.find((tab: Tab) => tab.url?.includes('skool'));
            await injectScript(skoolTab, data);
        }

    } else {
        try {
            const [tab] = tabs;
            const pingResponse = await chrome.tabs.sendMessage(tab?.id, {type: 'ping'});
            if (pingResponse.message === 'pong') {
                await chrome.tabs.sendMessage(tab?.id, data, (response: any) => {
                    console.log(response)
                });

            }
        }
        catch(e){
            await injectScript(tab, data);
        }
    }


}

async function injectScript(tab: Tab, data: MessageType) {
    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['contentScript.js'],
    }, () => {
        alert("ContentScript was not injected, please click ok to re-initiate the process")
        setTimeout(() => {
            // send a content message to the contentscript
            chrome.tabs.sendMessage(tab.id, data, (response: any) => {
                console.log(response)
            });
        },2000);
    });
}

export async function sendToContentScript(data: MessageType) {

    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        currentWindow: true,
    });
    if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, data, (response: any) =>
            console.log(response)
        );
    } else {
        console.log('CHECK AGAIN');
    }
}

export async function getActiveTab(): Promise<Tab> {

    return new Promise(async (resolve, reject) => {
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
            currentWindow: true,
        });

        if (tab?.id) {
            resolve(tab);
        }
    });

}

export const getActivateCookieDuration = () => {
    return 60 * 60 * 1000;
};

export async function localStorageSet(
    key: string,
    value: any,
    ttl: number
) {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };

    await chrome.storage.local.set({
        [`${key}`]: JSON.stringify(item),
    });
}

export async function localStorageGet(
    key: string,
): Promise<any> {

    const itemStr = await chrome.storage.local.get([key]);
    // if the item doesn't exist, return null
    if (!itemStr[`${key}`]) {
        return null;
    }

    const item = JSON.parse(itemStr[`${key}`]);
    const now = new Date();

    // compare the expiry time of the item with the current time
    const shouldDelete = now.getTime() > item.expiry;
    if (shouldDelete) {
        // If the item is expired, delete the item from storage
        // and return null
        await chrome.storage.local.remove([`${key}`]);
        return null;
    }
    return item.value;
}
