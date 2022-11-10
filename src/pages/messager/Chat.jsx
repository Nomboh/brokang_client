import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import { useProduct } from "../../context/productContext";

function Chat(props) {
  const {
    handleSend,
    messages,
    message,
    setActive,
    handleInput,
    handleImages,
    typingMessage,
  } = props;

  const { selectedChat } = useProduct();

  return (
    <div className="chat_main">
      <div className="chat_header">
        <h3 className="chat_name">{selectedChat?.friendInfo?.name}</h3>

        <p className="ch_list" onClick={() => setActive(true)}>
          Users
        </p>
      </div>
      <Messages messages={messages} />

      {typingMessage &&
      typingMessage.message &&
      typingMessage.senderId === selectedChat?.friendInfo._id ? (
        <p className="typing_icon">
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
        </p>
      ) : (
        ""
      )}

      <Input
        handleSend={handleSend}
        message={message}
        handleInput={handleInput}
        handleImages={handleImages}
      />
    </div>
  );
}

export default Chat;
