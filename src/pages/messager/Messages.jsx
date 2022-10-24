import React, { useEffect } from "react";
import { useRef } from "react";
import Message from "./Message";

function Messages({ messages }) {
  const chatScroll = useRef(null);

  useEffect(() => {
    chatScroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages &&
        messages?.map(message => (
          <Message message={message} key={message._id} />
        ))}

      <div ref={chatScroll}></div>
    </div>
  );
}

export default Messages;
