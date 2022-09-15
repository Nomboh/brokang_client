import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { logoutCall } from "../../context/apiCalls";
import { useAuth } from "../../context/auth/AuthContext";

function UserMenu({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const { dispatch } = useAuth();
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Transactions</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
