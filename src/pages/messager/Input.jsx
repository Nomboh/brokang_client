import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";

function Input({ handleSend, message, handleInput, handleImages }) {
  return (
    <div className="input">
      <input
        type="text"
        className="chat_input"
        placeholder="type something ..."
        onChange={handleInput}
        value={message}
      />

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleImages}
        />
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
