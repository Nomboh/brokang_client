import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { logoutCall } from "../../context/apiCalls";
import { useAuth } from "../../context/auth/AuthContext";
import { useProduct } from "../../context/productContext";

function UserMenu({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const { dispatch } = useAuth();
  const { setPhoneMenu } = useProduct();

  const handleClose = () => {
    setAnchorEl(null);
    setPhoneMenu(false);
  };

  const handleLogout = () => {
    logoutCall(dispatch);
    setPhoneMenu(false);
    setAnchorEl(null);
  };
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={"/store"}>
          <MenuItem onClick={handleClose}>Store</MenuItem>
        </Link>
        <Link to={"/profile"}>
          {" "}
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <Link to="/transaction">
          <MenuItem onClick={handleClose}>Transactions</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
