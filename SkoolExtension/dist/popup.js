(()=>{"use strict";var e,n,t,r={8758:(e,n,t)=>{t.d(n,{Z:()=>l});var r=t(8081),a=t.n(r),o=t(3645),i=t.n(o)()(a());i.push([e.id,"* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\ndiv.sidebar-ui {\n  width: 20%;\n  background: red;\n}\n\n.container {\n  padding: 20px 20px;\n  width: 417px;\n  height: 515px;\n}\n.skool__input {\n  border-radius: 5px;\n  width: 100%;\n  height: 127px;\n  padding: 20px 10px;\n}\n\n.message__field {\n  margin-top: 15px;\n\n  display: flex;\n  justify-content: space-between;\n}\n\n.timer-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n}\n\n.timer-input {\n  width: 100px;\n  height: 33px;\n  border: 1px solid #333;\n  padding: 20px;\n  font-size: 13px;\n}\n\n.logo {\n  font-size: 25px;\n  padding: 15px 20px;\n  border-bottom: 0.5px solid orangered;\n}\n\n.secondary__heading {\n  margin-top: 10px;\n}\n\n.message__per {\n  display: flex;\n  gap: 15px;\n  /* justify-content: center; */\n  align-items: center;\n}\n\n.message_input {\n  width: 57px;\n  height: 33px;\n  border: 1 solid #333;\n  padding: 20px;\n}\n\n.message-label {\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.action-btns {\n  display: flex;\n  justify-content: space-between;\n\n  margin-top: 135px;\n}\n\n.action-btn {\n  width: 155px;\n  padding: 15px;\n  /* background: orange; */\n  text-transform: uppercase;\n  outline: none;\n  border: none;\n  border-radius: 5px;\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n}\n\n.action-btn__purple {\n  background-color: #690eff;\n}\n\n.action-btn__green {\n  background-color: #1f8956;\n}\n",""]);const l=i},6251:(e,n,t)=>{var r=t(7294),a=t(745),o=t(3379),i=t.n(o),l=t(7795),s=t.n(l),c=t(569),p=t.n(c),d=t(3565),m=t.n(d),u=t(9216),g=t.n(u),f=t(4589),b=t.n(f),x=t(8758),h={};h.styleTagTransform=b(),h.setAttributes=m(),h.insert=p().bind(null,"head"),h.domAPI=s(),h.insertStyleElement=g(),i()(x.Z,h),x.Z&&x.Z.locals&&x.Z.locals;const v=function(){return r.createElement("div",null,r.createElement("textarea",{className:"skool__input",name:"custom-message",id:"custom-message"},"Custom Message..."))},_=function({title:e}){return r.createElement("div",null,r.createElement("h2",{className:"secondary__heading"},e))};t(4264);const y=function(){return r.createElement("div",{className:"message__field"},r.createElement("div",{className:"message__per"},r.createElement("input",{className:"message_input",type:"text",name:"Message-input",id:"message-input",placeholder:"5"}),r.createElement("span",{className:"message-label"},"Messages per")),r.createElement("div",{className:"timer-wrapper"},r.createElement("div",{className:"timer__svg"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"33",height:"33",viewBox:"0 0 24 24"},r.createElement("path",{d:"M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 14.707L11 12.414V6h2v5.586l3.707 3.707-1.414 1.414z"}))),r.createElement("input",{type:"text",className:"timer-input",placeholder:"1 Hour"})))};var E=t(6969);const w=document.createElement("div");(0,a.s)(w).render(r.createElement((()=>r.createElement(r.Fragment,null,r.createElement("p",{className:"logo"},"Logo"),r.createElement("div",{className:"container"},r.createElement(v,null),r.createElement(_,{title:"Message / Hr"}),r.createElement(y,null),r.createElement(_,{title:"Message / Interval"}),r.createElement(E.ZP,{"aria-label":"Temperature",defaultValue:30,color:"primary"}),r.createElement("div",{className:"action-btns"},r.createElement("button",{className:"action-btn action-btn__purple"},"Stop"),r.createElement("button",{className:"action-btn action-btn__green"},"Start"))))),null)),document.body.appendChild(w)}},a={};function o(e){var n=a[e];if(void 0!==n)return n.exports;var t=a[e]={id:e,exports:{}};return r[e](t,t.exports,o),t.exports}o.m=r,e=[],o.O=(n,t,r,a)=>{if(!t){var i=1/0;for(p=0;p<e.length;p++){for(var[t,r,a]=e[p],l=!0,s=0;s<t.length;s++)(!1&a||i>=a)&&Object.keys(o.O).every((e=>o.O[e](t[s])))?t.splice(s--,1):(l=!1,a<i&&(i=a));if(l){e.splice(p--,1);var c=r();void 0!==c&&(n=c)}}return n}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[t,r,a]},o.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return o.d(n,{a:n}),n},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var a=Object.create(null);o.r(a);var i={};n=n||[null,t({}),t([]),t(t)];for(var l=2&r&&e;"object"==typeof l&&!~n.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((n=>i[n]=()=>e[n]));return i.default=()=>e,o.d(a,i),a},o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={42:0};o.O.j=n=>0===e[n];var n=(n,t)=>{var r,a,[i,l,s]=t,c=0;if(i.some((n=>0!==e[n]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(s)var p=s(o)}for(n&&n(t);c<i.length;c++)a=i[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(p)},t=self.webpackChunkTwitterTAG=self.webpackChunkTwitterTAG||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})(),o.nc=void 0;var i=o.O(void 0,[887],(()=>o(6251)));i=o.O(i)})();