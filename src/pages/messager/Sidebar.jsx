import React from "react";
import Navbar from "./Navbar";
import Chats from "./Chats";
import useFetch from "../../hooks/useFetch";
import { useProduct } from "../../context/productContext";
import { useSearchParams } from "react-router-dom";

function Sidebar({ active, setActive }) {
  const { data } = useFetch("/conversation");

  const { setSelectedChat } = useProduct();

  const [searchParams, setSearchParam] = useSearchParams();

  const conversationId = searchParams.get("conversation");

  return (
    <div
      className={
        active
          ? "sidebar_container sidebar_container_active"
          : "sidebar_container"
      }
    >
      <Navbar setActive={setActive} />
      {data &&
        data?.map(conversation => (
          <div
            className={
              conversationId === conversation._id ? "chats_active" : ""
            }
            onClick={() => {
              setSelectedChat(conversation);

              setSearchParam({ conversation: conversation._id });
            }}
            key={conversation._id}
          >
            <Chats conversationId={searchParams} conversation={conversation} />
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
