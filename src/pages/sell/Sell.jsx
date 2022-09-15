import "./sell.css";

import Upbar from "../../components/upbar/Upbar";
import Footer from "../../components/footer/Footer";
import MMenu from "../../mobile/mmenu/Mmenu";

import React from "react";
import Mtop from "../../mobile/mUpbar/Mtop";

function Sell() {
  return (
    <div className="container">
      <Upbar />
      <Mtop />
      <MMenu />
      <div className="sell_container"></div>
      <Footer />
    </div>
  );
}

export default Sell;
