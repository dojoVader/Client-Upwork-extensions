// Only fire the event when the URL has changed

// Background worker

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

});










