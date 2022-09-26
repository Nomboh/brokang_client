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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Transactions</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
