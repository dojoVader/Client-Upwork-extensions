/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/skool/Queue.ts":
/*!****************************!*\
  !*** ./src/skool/Queue.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueueMap: () => (/* binding */ QueueMap)
/* harmony export */ });
class QueueMap {
    constructor() {
        //We will store the elements of Nodes to be processed in the map
        this.list = new Map();
    }
    enqueue(token, payload) {
        this.list.set(token, payload);
    }
    dequeue(token) {
        // you can pass token for removing specific item
        if (token) {
            const itemShouldRemove = this.list.has(token) ? this.list.get(token) : null;
            if (itemShouldRemove) {
                this.list.delete(token); // Remove from the Queue
            }
            return itemShouldRemove;
        }
    }
    inList(token) {
        return this.list.has(token);
    }
    isEmpty() {
        return this.list.size <= 0;
    }
    clear() {
        this.list.clear();
    }
    getList() {
        return (Array.of(...this.list.entries()));
    }
}


/***/ }),

/***/ "./src/skool/Scheduler.ts":
/*!********************************!*\
  !*** ./src/skool/Scheduler.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scheduler: () => (/* binding */ Scheduler)
/* harmony export */ });
const duration = 5;
class Scheduler {
    constructor() {
        this.startTiming = 0;
        this.callback = null;
    }
    onElapsed(timestamp) {
        // If the initial timing is not set let's set the timing
        if (!this.startTiming) {
            this.startTiming = timestamp;
        }
        const timeElasped = (timestamp - this.startTiming) / 1000;
        if (timeElasped > duration) {
            console.log("10 Seconds Elapsed, time to fire callback....");
            this.startTiming = 0; // reset
            this.callback();
        }
        else {
            window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
        }
    }
    onAnimationEnd(callback) {
        if (callback) {
            this.callback = callback;
        }
    }
    start() {
        console.log("Starting the scheduler...");
        console.log(this.callback);
        window.requestAnimationFrame((elapse) => this.onElapsed(elapse));
    }
}


/***/ }),

/***/ "./src/skool/SkoolAutomation.ts":
/*!**************************************!*\
  !*** ./src/skool/SkoolAutomation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SkoolAutomation: () => (/* binding */ SkoolAutomation)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const TOTAL_PAGES_DOM_ELEMENT = "div.styled__DesktopPaginationMeta-sc-4zz1jl-2 ";
const MEMBERSHIP_DOM = "div.styled__MembersListWrapper-sc-ne2uns-0";
const BUTTON_WRAPPER = "div.styled__ButtonWrapper-sc-qwyv4g-4";
const MODAL_MEMBER = "div.skool-ui-base-modal";
const TEXT_AREA = "textarea.styled__MultiLineInput-sc-1k6d9cc-2";
const DISPLAY_SELECTOR = "div.styled__UserNameHandleWrapper-sc-qwyv4g-3 > div";
const MODAL_CONTROLS = ".skool-ui-base-modal .Box-sc-1kefve6-0.Row-sc-w8j4n-0.kUmgoq";
const PAGINATION_CONTROL = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button > span";
const PAGINATION_ACTIVE_BUTTON = ".styled__DesktopPaginationControls-sc-4zz1jl-1 button.dJCdCN";
class SkoolAutomation {
    constructor() {
        this.totalPages = 0;
        this.currentPage = 0;
        this.itemsPerPage = 0;
        this.currentMembersToSpam = [];
        this.currentMembersProcessed = new Map();
        this.highestInterval = 10000;
    }
    setTotalPages(totalPages) {
        this.totalPages = totalPages;
    }
    setCurrentPage(currentPage) {
        this.currentPage = currentPage;
    }
    setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
    findMembers() {
        const domNodes = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(MEMBERSHIP_DOM, false);
        // Assign the childNodes to the property
        this.currentMembersToSpam = (domNodes.childNodes);
        this.setItemsPerPage(this.currentMembersToSpam.length);
    }
    getMembers() {
        return this.currentMembersToSpam;
    }
    extractMapMemberData(member) {
        const parentNode = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(DISPLAY_SELECTOR, false, member);
        const memberData = {
            data: member,
            displayName: parentNode.childNodes.item(0).innerText,
            userId: parentNode.nextSibling.innerText
        };
        return memberData;
    }
    addProcessedMember(token, member) {
        this.currentMembersProcessed.set(token, member);
    }
    process(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatButton = this.findChatButton(item.data);
            if (!chatButton)
                return new Promise((resolve, reject) => reject(false));
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.clickMemberChat(chatButton);
                yield this.sendMessageToMember(item.data, "Hello, how are you ?  ");
                yield this.clickCloseButton();
                resolve(true);
                this.addProcessedMember(item.userId, item.data);
            }));
        });
    }
    debug() {
        console.log(this.currentMembersToSpam.length);
        // print all the pagination details
        console.log(this.currentPage);
        console.log(this.itemsPerPage);
        console.log(this.totalPages);
    }
    findChatButton(node) {
        if (node) {
            const buttons = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(BUTTON_WRAPPER, false, node);
            if (!buttons)
                return null;
            return buttons.childNodes.item(0);
        }
        return null;
    }
    // Order 1
    clickMemberChat(node) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (node) {
                    node.click();
                    resolve(true);
                }
            });
        });
    }
    sendMessageToMember(node, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (node) {
                    const REACT_PROPS = /__reactProps/gi;
                    const isModalFound = yield this.checkElement(MODAL_MEMBER);
                    if (isModalFound) {
                        const modalDom = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(MODAL_MEMBER, false);
                        yield this.checkElement(TEXT_AREA, modalDom);
                        const textAreaDom = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(TEXT_AREA, false, modalDom);
                        // Find the React Props and send the message
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            textAreaDom.innerText = message;
                            yield (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(message, this.getChannelName()).then((response) => {
                                setTimeout(() => {
                                    textAreaDom.innerText = "";
                                    resolve(true);
                                }, 2000);
                            });
                        }), 3000);
                    }
                }
            }));
        });
    }
    getChannelName() {
        const channelName = "cmsg";
        const data = localStorage.getItem(channelName);
        const parsed = JSON.parse(data);
        const [keys] = Object.keys(parsed.value);
        return keys;
    }
    clickCloseButton() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const isModalFound = yield this.checkElement(MODAL_MEMBER);
            if (isModalFound) {
                const modalDom = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(MODAL_MEMBER, false);
                yield this.checkElement(MODAL_CONTROLS, modalDom);
                const modalControlNode = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(MODAL_CONTROLS, false, modalDom);
                yield this.checkElement("button.styled__ButtonWrapper-sc-dscagy-1", modalControlNode);
                if (modalControlNode) {
                    const closeButton = modalControlNode.childNodes.item(2);
                    setTimeout(() => {
                        closeButton.click();
                        resolve(true);
                    }, 4000);
                }
            }
        }));
    }
    findPaginationInfo() {
        const paginationDOM = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(TOTAL_PAGES_DOM_ELEMENT, false);
        const paginationText = paginationDOM.innerText;
        console.log(paginationText);
        // write a regex for the following text capturing the number in it 1-30 of 565
        const regex = /(\d+)-(\d+) of (\d+)/g;
        const match = regex.exec(paginationText);
        if (match) {
            this.setTotalPages(parseInt(match[3]));
            //Find the currentPage from activeButton innerText
            this.findActiveButton();
        }
    }
    rafAsync() {
        return new Promise(resolve => {
            requestAnimationFrame(resolve); //faster than set time out
        });
    }
    checkElement(selector, source) {
        return __awaiter(this, void 0, void 0, function* () {
            let querySelector = null;
            while (querySelector === null) {
                yield this.rafAsync();
                querySelector = !source ? document.querySelector(selector) : source.querySelector(selector);
            }
            return querySelector;
        });
    }
    callNextButton() {
        const buttons = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(PAGINATION_CONTROL, true);
        const nextButton = buttons.item(buttons.length - 1);
        if (nextButton) {
            nextButton.parentNode.click();
        }
    }
    clear() {
        this.currentMembersToSpam = [];
        this.currentMembersProcessed.clear();
    }
    findActiveButton() {
        const button = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_0__.q)(PAGINATION_ACTIVE_BUTTON, false);
        this.setCurrentPage(parseInt(button.childNodes.item(0).innerText));
    }
    hasNextPage() {
        const totalPage = Math.floor(this.totalPages / this.itemsPerPage);
        return (this.currentPage !== totalPage);
    }
}


/***/ }),

/***/ "./src/utils/helpers.ts":
/*!******************************!*\
  !*** ./src/utils/helpers.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   dom: () => (/* binding */ dom),
/* harmony export */   getReactProps: () => (/* binding */ getReactProps),
/* harmony export */   q: () => (/* binding */ q),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function dom(dom, attrib, cb) {
    let domNode = document.createElement(dom);
    let key = "";
    for (key in attrib) {
        domNode.setAttribute(key, attrib[key]);
    }
    //Create a callback to allow us embed inner dom in it
    if (cb) {
        return cb(domNode);
    }
    return domNode;
}
function getReactProps(parent, target) {
    var _a;
    const keyof_ReactProps = Object.keys(parent).find(k => k.startsWith("__reactProps$"));
    const symof_ReactFragment = Symbol.for("react.fragment");
    //Find the path from target to parent
    let path = [];
    let elem = target;
    while (elem !== parent) {
        let index = 0;
        for (let sibling = elem; sibling != null;) {
            if (sibling[keyof_ReactProps])
                index++;
            sibling = sibling.previousElementSibling;
        }
        path.push({ child: elem, index });
        elem = elem.parentElement;
    }
    //Walk down the path to find the react state props
    let state = elem[keyof_ReactProps];
    for (let i = path.length - 1; i >= 0 && state != null; i--) {
        //Find the target child state index
        let childStateIndex = 0, childElemIndex = 0;
        while (childStateIndex < state.children.length) {
            let childState = state.children[childStateIndex];
            if (childState instanceof Object) {
                //Fragment children are inlined in the parent DOM element
                let isFragment = childState.type === symof_ReactFragment && childState.props.children.length;
                childElemIndex += isFragment ? childState.props.children.length : 1;
                if (childElemIndex === path[i].index)
                    break;
            }
            childStateIndex++;
        }
        let childState = (_a = state.children[childStateIndex]) !== null && _a !== void 0 ? _a : (childStateIndex === 0 ? state.children : null);
        state = childState === null || childState === void 0 ? void 0 : childState.props;
        elem = path[i].child;
    }
    return state;
}
function q(selector, multiElements = false, source = null) {
    if (multiElements) {
        return (source || document).querySelectorAll(selector);
    }
    return (source || document).querySelector(selector);
}
// write a debounce function
function debounce(func, timeout = 300) {
    console.log("debounce...");
    let timer;
    return (...args) => {
        console.log("clear...");
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
function sendMessage(message, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(`https://api.skool.com/channels/${channel}/messages?ct=wdm`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://www.skool.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                content: message,
                attachments: [],
            }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./src/contentScript/contentScript.tsx ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skool_SkoolAutomation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../skool/SkoolAutomation */ "./src/skool/SkoolAutomation.ts");
/* harmony import */ var _skool_Queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../skool/Queue */ "./src/skool/Queue.ts");
/* harmony import */ var _skool_Scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../skool/Scheduler */ "./src/skool/Scheduler.ts");



console.log("Now fired in the School Extension....");
// Initiate the SkoolAutomator to find the elements in the page
const automator = new _skool_SkoolAutomation__WEBPACK_IMPORTED_MODULE_0__.SkoolAutomation();
setTimeout(() => {
    // Create the Queue to Hold the tasks to be processed
    const queueManager = new _skool_Queue__WEBPACK_IMPORTED_MODULE_1__.QueueMap();
    //Find the members in the page and the Pagination Information
    automator.debug();
    const clear = () => {
        automator.clear();
        queueManager.clear();
    };
    const scheduler = new _skool_Scheduler__WEBPACK_IMPORTED_MODULE_2__.Scheduler();
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
        });
        const iterator = queueManager.getList().entries();
        // We need to trigger the Queue as long as it has items
        const peekAtQueue = () => {
            // Do we have data in the queue
            const iteratorValue = iterator.next();
            if (!iteratorValue.done) {
                const [_, item] = iteratorValue.value;
                const [key, value] = item;
                automator.process(value).then(() => {
                    console.log('Clicked finish');
                    setTimeout(() => peekAtQueue(), 2000);
                }, () => {
                    setTimeout(() => peekAtQueue(), 2000);
                });
            }
            else {
                // Click the next page
                // Check if it has a next page
                automator.findMembers();
                automator.findPaginationInfo();
                if (automator.hasNextPage()) {
                    automator.callNextButton();
                    setTimeout(() => {
                        clear();
                        scheduler.start();
                    }, 3000);
                }
                else {
                    //We might
                    alert("Finished");
                }
            }
        };
        peekAtQueue();
    });
    scheduler.start();
}, 3000);

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map