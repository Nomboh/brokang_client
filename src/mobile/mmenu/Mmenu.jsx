import "./mmenu.css";
import React from "react";
import { Avatar } from "@mui/material";
import { useProduct } from "../../context/productContext";
import CloseIcon from "@mui/icons-material/Close";

function Mmenu() {
  const { setPhoneMenu, phoneMenu } = useProduct();
  return (
    <div
      className={phoneMenu ? "mmenu_container mmenu_active" : "mmenu_container"}
    >
      <div className="mmenu_avater">
        <Avatar sx={{ height: "80px", width: "80px" }} />
        <span className="mmenu__span">Lisa</span>
      </div>

      <div className="mmenu__middle">
        <span className="mmenu__span">Cars</span>
        <span className="mmenu__span">Admin</span>
        <span className="mmenu__span">Help</span>
        <span className="mmenu__span">Advertisement</span>
        <span className="mmenu__span">Chat</span>
      </div>

      <CloseIcon
        sx={{ position: "absolute", top: "10px", right: "20px" }}
        onClick={() => setPhoneMenu(false)}
      />
    </div>
  );
}

export default Mmenu;
