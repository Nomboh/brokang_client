import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import axiosInstance from "../../utils/axiosInstance";

function Input({ reFetchMsg, conversationId }) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const { data } = await axiosInstance().post("/message", {
      conversationId,
      text: message,
    });
    reFetchMsg();
    setMessage("");
  };
  return (
    <div className="input">
      <input
        type="text"
        className="chat_input"
        placeholder="type something ..."
        onChange={e => setMessage(e.target.value)}
        value={message}
      />

      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" />
        <AttachFileIcon htmlColor="#9c9c9c" />
        <label htmlFor="file">
          <ImageIcon htmlColor="#9c9c9c" />
        </label>

        <button onClick={handleSend} className="chat_btn">
          send
        </button>
      </div>
    </div>
  );
}

export default Input;
