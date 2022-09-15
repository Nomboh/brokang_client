import "./mmenu.css";
import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useProduct } from "../../context/productContext";
import CloseIcon from "@mui/icons-material/Close";
import UserMenu from "../../components/upbar/UserMenu";
import { useAuth } from "../../context/auth/AuthContext";

function Mmenu() {
  const { setPhoneMenu, phoneMenu } = useProduct();

  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div
      className={phoneMenu ? "mmenu_container mmenu_active" : "mmenu_container"}
    >
      <div className="mmenu_avater" onClick={handleClick}>
        <Avatar
          sx={{ height: "80px", width: "80px" }}
          src={user?.photo}
          alt={user?.name}
        />
        <span className="mmenu__span">{user?.name.split(" ")[0]}</span>
      </div>

      <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

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
