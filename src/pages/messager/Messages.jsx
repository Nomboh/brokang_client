import React, { useEffect } from "react";
import { useRef } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import Message from "./Message";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function Messages({ messages }) {
  const chatScroll = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    chatScroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages &&
        messages?.map((message, i) => {
          return <Message key={message._id || i} message={message} />;
        })}

      <div ref={chatScroll}></div>
      {messages && messages.length > 0
        ? messages.map((m, i) =>
            i === messages.length - 1 && m.senderId === user._id ? (
              <span key={m._id || i} className="message_done">
                <DoneAllIcon
                  htmlColor={m.status === "seen" ? "#e95e51" : "#757575"}
                />
              </span>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
}

export default Messages;
