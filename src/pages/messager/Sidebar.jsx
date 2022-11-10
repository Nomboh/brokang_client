import React from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import { useProduct } from "../../context/productContext";

function Sidebar(props) {
  const {
    active,
    setActive,
    conversations,
    handleSelectedConversation,
    activeUser,
  } = props;

  const { selectedChat } = useProduct();

  return (
    <div
      className={
        active
          ? "sidebar_container sidebar_container_active"
          : "sidebar_container"
      }
    >
      <Navbar setActive={setActive} />
      {conversations &&
        conversations?.map(conversation => (
          <div
            className={
              selectedChat?.friendInfo._id === conversation?.friendInfo?._id
                ? "chats_active"
                : ""
            }
            onClick={handleSelectedConversation(conversation)}
            key={conversation.friendInfo?._id}
          >
            <Chats conversation={conversation} activeUser={activeUser} />
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
