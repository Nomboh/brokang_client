import "./card.css";

import React from "react";
import { truncate } from "../../utils/helper";
import { useProduct } from "../../context/productContext";
import { Link } from "react-router-dom";

function Card({ product, cardSm }) {
  const { setCurrentProduct } = useProduct();
  return (
    <Link to={`/product/${product?._id}`}>
      <div className={"card"} onClick={() => setCurrentProduct(product)}>
        <div className="card_items">
          <img
            src={product?.images[0]}
            alt="produnt 1"
            className={cardSm ? "card_img card_img_sm" : "card_img"}
          />
          <div className="card_content">
            <p className={cardSm ? "card_name card_name_sm" : "card_name"}>
              {truncate(
                product.name,
                window.innerWidth || cardSm < 800 ? 2 : 4
              )}
            </p>
            <h2 className={cardSm ? "card_price card_price_sm" : "card_price"}>
              {product.price.toLocaleString()} won
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
