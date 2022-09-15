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
import { Link } from "react-router-dom";

function Mtop() {
  const [isSearch, setIsSearch] = useState(false);
  const { setPhoneMenu } = useProduct();
  const { user } = useAuth();

  return (
    <div className="mTop">
      {isSearch ? (
        <div className="mtop_input_wrapper">
          <ArrowBackIcon onClick={() => setIsSearch(false)} />
          <input type="text" className="mtop_input" />
        </div>
      ) : (
        <>
          <div className="mtop_left">
            <MenuIcon onClick={() => setPhoneMenu(true)} />
          </div>
          <div className="mtop_middle">
            <img src="/brokang_logo_svg.svg" alt="logo" className="mtop_img" />
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
