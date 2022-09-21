import "./seller.css";

import React from "react";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import Mtop from "../../mobile/mUpbar/Mtop";
import Mmenu from "../../mobile/mmenu/Mmenu";

function Seller() {
  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <Mmenu />
      <div className="seller_container">Seller</div>
      <Footer />
    </div>
  );
}

export default Seller;
