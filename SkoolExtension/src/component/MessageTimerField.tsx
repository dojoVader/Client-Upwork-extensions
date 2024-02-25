import React from "react";
import "boxicons";

function MessageTimerField() {
  return (
    <div className="message__field">


      <div className="timer-wrapper">
        <div className="timer__svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 24 24"
            // style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 14.707L11 12.414V6h2v5.586l3.707 3.707-1.414 1.414z"></path>
          </svg>
        </div>

        <input type="text" className="timer-input" placeholder="1 Hour" />
      </div>
    </div>
  );
}

export default MessageTimerField;
