import "./bellowbar.css";
import React from "react";
import { Button } from "@mui/material";

function Bellowbar() {
  return (
    <div className="bellow__container">
      <div className="bellow__left">
        <Button>Categories</Button>

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
