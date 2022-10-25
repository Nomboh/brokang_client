import React, { useState } from "react";
import "./messager.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Messager() {
  const [active, setActive] = useState(false);

  return (
    <div className="chat">
      <div className="chat_container">
        <Sidebar active={active} setActive={setActive} />
        <Chat active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default Messager;
