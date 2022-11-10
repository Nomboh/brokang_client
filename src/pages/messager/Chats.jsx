import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { truncate } from "../../utils/helper";

function Chats({ conversation, activeUser }) {
  const { user } = useAuth();
  return (
    <div className="chats">
      <div className="chat_img_wrapper">
        <img
          src={conversation.friendInfo?.photo}
          alt={conversation.friendInfo?.name}
          className="chats_img"
        />
        {activeUser && activeUser.length > 0
          ? activeUser.map(au => {
              if (au.userId === conversation.friendInfo?._id) {
                return <div key={au.userId} className="chat_activeUser"></div>;
              }
              return "";
            })
          : ""}
      </div>
      <div className="chats_info-container">
        <div className="name_seens">
          <p
            className={
              conversation.messageInfo?.senderId !== user._id &&
              conversation.messageInfo?.status !== undefined &&
              conversation.messageInfo?.status !== "seen"
                ? "chat_info_name message_text_unseen"
                : "chat_info_name"
            }
          >
            {conversation.friendInfo?.name.split(" ")[0]}
          </p>
          {user._id === conversation.messageInfo?.senderId ? (
            <div className="seen_deliverd">
              {conversation.messageInfo?.status === "seen"
                ? "😀"
                : conversation.messageInfo?.status === "delivered"
                ? "🖤"
                : ""}
            </div>
          ) : (
            <div className="seen_deliverd">
              {conversation.messageInfo?.status !== undefined &&
              conversation.messageInfo?.status !== "seen"
                ? "💥"
                : ""}
            </div>
          )}
        </div>
        <span
          className={
            conversation.messageInfo?.senderId !== user._id &&
            conversation.messageInfo?.status !== undefined &&
            conversation.messageInfo?.status !== "seen"
              ? "chat_info_msg message_text_unseen"
              : "chat_info_msg"
          }
        >
          {conversation.messageInfo?.message.text
            ? truncate(conversation.messageInfo?.message.text, 4)
            : conversation.messageInfo?.message.image
            ? "An image send"
            : ""}
        </span>
      </div>
    </div>
  );
}

export default Chats;
