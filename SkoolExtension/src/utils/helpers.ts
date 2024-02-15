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

export function getReactProps(parent: Element, target: Element): any {
    const keyof_ReactProps = Object.keys(parent).find(k => k.startsWith("__reactProps$"));
    const symof_ReactFragment = Symbol.for("react.fragment");

    //Find the path from target to parent
    let path = [];
    let elem = target;
    while (elem !== parent) {
        let index = 0;
        for (let sibling = elem; sibling != null;) {
            if (sibling[keyof_ReactProps]) index++;
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
                if (childElemIndex === path[i].index) break;
            }
            childStateIndex++;
        }
        let childState = state.children[childStateIndex] ?? (childStateIndex === 0 ? state.children : null);
        state = childState?.props;
        elem = path[i].child;
    }
    return state;
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

export async function sendMessage(message:string, channel:string){
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
}









