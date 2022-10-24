import moment from "moment";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";

function Message({ message }) {
  const { user } = useAuth();
  return (
    <div
      className={user._id === message.sender._id ? "message owner" : "message"}
    >
      <div className="message_info">
        <img src={message.sender.photo} alt={user.name} />

        {user._id === message.sender._id && (
          <span>{moment(message.createdAt).from()}</span>
        )}
      </div>
      <div className="message_content">
        <p className="message_text">{message.text}</p>

        {/* <img src={user.photo} alt={"product photo"} /> */}
      </div>
    </div>
  );
}

export default Message;
