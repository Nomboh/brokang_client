import "./bellowbar.css";
import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import Category from "../category/Category";

function Bellowbar() {
  const [mouseState, setMouseState] = useState(false);

  return (
    <div className="bellow__container">
      <div className="bellow__left">
        <button
          className={mouseState ? "cat_btn cat_btn_hover" : "cat_btn"}
          onMouseEnter={() => setMouseState(true)}
          onMouseLeave={() => setMouseState(false)}
        >
          {" "}
          <MenuIcon /> <span>categories</span>{" "}
          {mouseState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        <div
          className="cat_wrapper"
          onMouseEnter={() => {
            setMouseState(true);
          }}
          onMouseLeave={() => {
            setMouseState(false);
          }}
        >
          <Category />
        </div>
        <div className="bellow__middle">
          <span className="bellow__span">Cars</span>
          <span className="bellow__span">Admin</span>
          <span className="bellow__span">Help</span>
          <span className="bellow__span">Advertisement</span>
          <span className="bellow__span">Chat</span>
        </div>
      </div>

      <div className="bellow__right">
        <Button href="/sell" sx={{ height: "60px" }} variant="contained">
          Sell Your Items
        </Button>
      </div>
    </div>
  );
}

export default Bellowbar;
