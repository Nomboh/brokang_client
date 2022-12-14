import "./upbar.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import UserMenu from "./UserMenu";
import { useProduct } from "../../context/productContext";

function Upbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();

  const { setSearch, setSelectedCat } = useProduct();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSearch = () => {
    setSearch(searchQuery);

    setSearchQuery("");

    setSelectedCat(null);

    navigate(`/search?q=${searchQuery}`);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      setSearch(searchQuery);

      setSearchQuery("");

      setSelectedCat(null);

      navigate(`/search?q=${searchQuery}`);
    }
  };
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
          onClick={handleClickSearch}
          color="action"
          sx={{
            position: "absolute",
            top: "12px",
            right: "10px",
            height: "30px",
            width: "30px",
          }}
        />
        <input
          type="text"
          className="upbar__searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder={"search for products"}
        />
      </div>
      <div className="upbar__right">
        {user ? (
          <>
            <Badge badgeContent={0} color="primary" showZero={false}>
              <MailIcon color="action" />
            </Badge>

            <Badge badgeContent={4} color="primary" showZero={false}>
              <NotificationsIcon color="action" />
            </Badge>
            <div className="avater__wrapper" onClick={handleClick}>
              <Avatar
                sx={{ height: "60px", width: "60px" }}
                src={user?.photo}
                alt={user?.name}
              />
              <span className="avater__name"> {user?.name.split(" ")[0]}</span>
            </div>
            <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </>
        ) : (
          <>
            <div className="ub_login">
              <Link to={"/login"}>
                <span className="ub_login_btn">Login</span>
              </Link>{" "}
              &frasl;{" "}
              <Link to={"/register"}>
                <span className="ub_login_btn">Register</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Upbar;
