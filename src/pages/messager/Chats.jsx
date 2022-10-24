import React from "react";
import { useAuth } from "../../context/auth/AuthContext";

function Chats({ conversation }) {
  const { user } = useAuth();

  const seller = conversation.members.filter(member => member._id !== user._id);

  return (
    <div className="chats">
      <img src={seller[0].photo} alt={seller[0].name} className="chats_img" />
      <div className="chats_info-container">
        <h4 className="chat_info_name">{seller[0].name}</h4>
        <span className="chat_info_msg">
          {conversation.latestMessage?.text}
        </span>
      </div>
    </div>
  );
}

export default Chats;
