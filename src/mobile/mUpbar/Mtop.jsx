import "./mtop.css";

import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProduct } from "../../context/productContext";
import { useAuth } from "../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Mtop() {
  const [isSearch, setIsSearch] = useState(false);
  const { setPhoneMenu, setSearch, setSelectedCat } = useProduct();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setSearch(searchQuery);

      setSelectedCat(null);

      setSearchQuery("");
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleClick = () => {
    setSearch(searchQuery);

    setSelectedCat(null);

    setSearchQuery("");
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div className="mTop">
      {isSearch ? (
        <div className="mtop_input_wrapper">
          <ArrowBackIcon onClick={() => setIsSearch(false)} />
          <div className="m_top_wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="mtop_input"
            />
            <SearchIcon color="action" onClick={handleClick} />
          </div>
        </div>
      ) : (
        <>
          <div className="mtop_left">
            <MenuIcon onClick={() => setPhoneMenu(true)} />
          </div>
          <div className="mtop_middle">
            <Link to={"/"}>
              <img
                src="/brokang_logo_svg.svg"
                alt="logo"
                className="mtop_img"
              />
            </Link>
          </div>

          <div className="mtop_right">
            <SearchIcon onClick={() => setIsSearch(true)} color="action" />
            {user ? (
              <>
                <Badge badgeContent={4} color="primary" showZero={false}>
                  <MailIcon color="action" />
                </Badge>

                <Badge badgeContent={4} color="primary" showZero={false}>
                  <NotificationsIcon color="action" />
                </Badge>
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
        </>
      )}
    </div>
  );
}

export default Mtop;
