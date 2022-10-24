import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";

function Navbar({ setActive }) {
  const { user } = useAuth();
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src="/brokang_logo_svg.svg" alt="brokang" />
      </Link>
      <div className="nb_user">
        <img className="nb_photo" src={user.photo} alt={user.name} />
        <span>{user.name}</span>
      </div>

      <Close
        htmlColor="#fdefee"
        sx={{ cursor: "pointer", display: { sm: "block", md: "none" } }}
        onClick={() => setActive(false)}
        className="close_chat"
      />
    </div>
  );
}

export default Navbar;
