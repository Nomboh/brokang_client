import "./sell.css";

import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import MMenu from "../../mobile/mmenu/Mmenu";

import React, { useState } from "react";
import Mtop from "../../mobile/mUpbar/Mtop";
import SellCategory from "./SellCategory";
import SellImages from "./SellImages";

function Sell() {
  const [status, setStatus] = useState("");

  console.log(status);

  const handleStatus = (e, type) => {
    e.preventDefault();
    if (type === "used") {
      setStatus("used");
    } else if (type === "simiUsed") {
      setStatus("semiused");
    } else {
      setStatus("new");
    }
  };
  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <MMenu />
      <div className="sell_container">
        <div className="sell_heading">
          <h1 className="sell_title">Register Your Goods</h1>
          <p className="sell_required">
            <span>*</span> please fill the requird fields
          </p>
        </div>
        <form className="sell_form">
          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="images">
                Product Images <span>*</span>
              </label>
              <span className="label_span">(0 / 12)</span>
            </div>
            <div className="sell_inputs_wrapper">
              <SellImages />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Title <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <input
                className="sell_text_input"
                placeholder="Enter the product title"
                type="text"
                name="name"
                id="name"
              />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Category <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <SellCategory />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Condition <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="pc_sell">
                <h3 className="pc_sell_title">
                  Please select the condition of the product to be sold
                </h3>
                <div className="pc_sell_wrapper">
                  <button
                    onClick={(e) => handleStatus(e, "new")}
                    className="pc_sell_item"
                  >
                    New
                  </button>
                  <button
                    onClick={(e) => handleStatus(e, "simiUsed")}
                    className="pc_sell_item"
                  >
                    Almost new
                  </button>
                  <button
                    onClick={(e) => handleStatus(e, "used")}
                    className="pc_sell_item"
                  >
                    Used
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Price <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="sell_price">
                <input
                  className="sell_text_input sell_price_input"
                  placeholder="Enter the product price"
                  type="number"
                  name="name"
                  id="name"
                />

                <span>won</span>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Tags (Optional)
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="sell_price">
                <input
                  className="sell_text_input sell_price_input"
                  placeholder="Enter the product price"
                  type="number"
                  name="name"
                  id="name"
                />

                <span>won</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Sell;
