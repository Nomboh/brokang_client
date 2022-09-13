import "./productdetail.css";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProductDetail({ currentProduct }) {
  const [index, setIndex] = useState(0);

  const moveImage = direction => {
    const totalImages = currentProduct?.images.length;
    if (direction === "right") {
      setIndex(prev => (prev < totalImages - 1 ? prev + 1 : totalImages - 1));
    }

    if (direction === "left") {
      setIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleFavourite = () => {};

  return (
    <div className="pd_container">
      <div className="pd_left">
        <div className="pd_left_img">
          <div
            className="pd_arrows pd_arrow_left"
            onClick={() => moveImage("left")}
          >
            <ArrowBackIosIcon sx={{ width: "100%", height: "100%" }} />
          </div>
          <img src={currentProduct?.images[index]} alt="main product" />
          <div
            className="pd_arrows pd_arrow_right"
            onClick={() => moveImage("right")}
          >
            <ArrowForwardIosIcon sx={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <div className="pd_left_thumb">
          <ArrowBackIosIcon
            sx={{ cursor: "pointer" }}
            onClick={() => moveImage("left")}
          />
          <div className="pd_thumb_wrapper">
            {currentProduct &&
              currentProduct?.images.map((img, i) => {
                return (
                  <div
                    key={i}
                    className={
                      index === i
                        ? "pd_thumb_img pd_thumb_img_active"
                        : "pd_thumb_img"
                    }
                    onMouseOver={() => setIndex(i)}
                  >
                    <img src={img} alt={`thumb ${i}`} />
                  </div>
                );
              })}
            {Array.from(Array(5).keys(5)).map(i => (
              <div key={i + 10} className="pd_thumb_img pd_thumb_no">
                <img
                  src={
                    "https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-camera-icon-png-image_1751156.jpg"
                  }
                  alt={`thumb ${i}`}
                />
              </div>
            ))}
          </div>

          <ArrowForwardIosIcon
            sx={{ cursor: "pointer" }}
            onClick={() => moveImage("right")}
          />
        </div>
      </div>
      <div className="pd_right">
        <div className="pd_right_top">
          <div className="pd_right_top_chips">
            <div className="pd_chips">{currentProduct?.status}</div>
            <div className="pd_chips">
              {currentProduct?.shipping[0]?.burden === "seller"
                ? "Shipping not included"
                : "shipping included"}
            </div>
          </div>

          <div className="pd_duration">3 days ago</div>
        </div>

        <div className="pd_price_wrapper">
          <p className="pd_title">{currentProduct?.name}</p>
          <h1 className="pd_price">
            {currentProduct?.price.toLocaleString()} won
          </h1>
        </div>

        <div className="pd_desc">
          <div className="pd_desc_wrapper">
            <div className="pd_desc_name">Transaction method</div>
            <div className="pd_desc_value">
              {currentProduct?.transactionMethod}
            </div>
          </div>

          <div className="pd_desc_wrapper">
            <div className="pd_desc_name">Delivery fee</div>
            <div className="pd_desc_value">
              {currentProduct?.shipping[0]?.deliveryFee}
            </div>
          </div>

          <div className="pd_desc_wrapper">
            <div className="pd_desc_name">Shipping method</div>
            <div className="pd_desc_value">
              {currentProduct?.shipping[0]?.shippingMethod}
            </div>
          </div>

          <div className="pd_desc_wrapper">
            <div className="pd_desc_name">Shipping origin</div>
            <div className="pd_desc_value">
              {currentProduct?.shipping[0]?.shippingOrigin}
            </div>
          </div>
        </div>

        <div className="pd_notice_wrapper">
          <h3 className="pd_notice_heading">
            Direct transaction inducement notice
          </h3>
          <div className="pd_notice_content">
            <p className="pd_notice">
              Brokang market is only avaailable for Brokang pay safe transaction{" "}
            </p>
            <p className="pd_notice">
              Please if you induce account deposit or direct transaction report
              them{" "}
            </p>
            <p className="pd_notice">
              Transactions other than Brokang Pay are not eligible for fraud
              protection{" "}
            </p>
          </div>
        </div>

        <div className="pd_buttons">
          <div className="pd_favourite" onClick={handleFavourite}>
            <FavoriteBorderIcon color="primary" />
          </div>
          <button className="pd_btn_talk">Brokang Talk</button>
          <button className="pd_btn_pay">Brokang Pay</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
