import moment from "moment";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";

import { useProduct } from "../../context/productContext";

function Message({ message }) {
  const { user } = useAuth();
  const { selectedChat } = useProduct();

  return (
    <div
      className={user._id === message.senderId ? "message owner" : "message"}
    >
      <img className="friend_img" src={selectedChat.friendInfo.photo} alt="" />
      <div className="message_content">
        {message.message.text ? (
          <p className="message_text">{message.message.text}</p>
        ) : (
          <div className="mc_image">
            <img src={message.message.image} alt={"chat"} />
          </div>
        )}

        {user._id === message.senderId && (
          <span className="msg_date">
            {moment(message.createdAt).format("LT")}
          </span>
        )}
      </div>
    </div>
  );
}

export default Message;
