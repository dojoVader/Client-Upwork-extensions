// Only fire the event when the URL has changed

// Background worker

import {getActiveTab} from "../utils/chrome-utils";

chrome.runtime.onInstalled.addListener(async() => {
    // Find all the tabs with skool and refresh the tabs
    chrome.tabs.query({url: 'https://skool.com/*'}, (tabs) => {
        tabs.forEach(async(tab) => {
            await chrome.tabs.reload(tab.id);
        });
    });
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log('message received', request);
    if (request.message === 'inject-script') {
        await chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            files: ['interceptor.js'],
            world: "MAIN"

        });
    }
    // notification
    if (request.type === 'notification') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'img.png',
            title: request.data.title,
            message: request.data.message
        });
    }

    if(request.type === 'refresh'){
        getActiveTab().then(async(tab) => {
           await chrome.tabs.reload(tab.id)
        });
    }

});










