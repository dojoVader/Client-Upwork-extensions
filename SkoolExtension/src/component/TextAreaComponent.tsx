import React from "react";
// create props for the component
type TextAreaComponentProps = {
    message: string;
    setMessage: (message: string) => void;
    };

function TextAreaComponent(props: TextAreaComponentProps) {
    const { message, setMessage } = props;
  return (
    <div>
      <textarea
        className="skool__input"
        name="custom-message"
        id="custom-message"
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        defaultValue={message}
      ></textarea>
    </div>
  );
}

export default TextAreaComponent;
