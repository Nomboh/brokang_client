import "./upbar.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

function Upbar() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="upbar__container">
      <div className="upbar__left">
        <div className="upbar__imageWrapper">
          <Link to={"/"}>
            <img src="/brokang_logo_svg.svg" alt="" className="upbar__image" />
          </Link>
        </div>
      </div>
      <div className="upbar__middle">
        <SearchIcon
          color="action"
          sx={{ position: "absolute", top: "5px", right: "10px" }}
        />
        <input
          type="text"
          className="upbar__searchInput"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={"search for products"}
        />
      </div>
      <div className="upbar__right">
        <Badge badgeContent={0} color="primary" showZero={false}>
          <MailIcon color="action" />
        </Badge>

        <Badge badgeContent={4} color="primary" showZero={false}>
          <NotificationsIcon color="action" />
        </Badge>
        <div className="avater__wrapper">
          <Avatar sx={{ height: "60px", width: "60px" }} alt="Remy Sharp" />
          <span className="avater__name"> Lisa</span>
        </div>
      </div>
    </div>
  );
}

export default Upbar;
