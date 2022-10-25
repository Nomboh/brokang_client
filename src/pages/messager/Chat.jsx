import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useProduct } from "../../context/productContext";
import useFetch from "../../hooks/useFetch";

function Chat({ setActive }) {
  const { selectedChat } = useProduct();

  const conversationId = new URLSearchParams(window.location.search).get(
    "conversation"
  );

  const { data, reFetch } = useFetch("/message/" + conversationId);
  return (
    <div className="chat_main">
      <div className="chat_header">
        <h3 className="chat_name">{selectedChat?.members[1].name}</h3>

        <p className="ch_list" onClick={() => setActive(true)}>
          Users
        </p>
      </div>
      <Messages messages={data} />
      <Input reFetchMsg={reFetch} conversationId={conversationId} />
    </div>
  );
}

export default Chat;
