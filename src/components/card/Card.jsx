import "./card.css";

import React from "react";
import { truncate } from "../../utils/helper";
import { useProduct } from "../../context/productContext";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

function Card({ product, cardSm, showFavorite, reFetch }) {
  const { setCurrentProduct } = useProduct();

  const navigate = useNavigate();

  const { user } = useAuth();

  const handleClick = () => {
    setCurrentProduct(product);
  };

  const handleFavourite = async () => {
    if (user) {
      try {
        await axiosInstance().put(`/product/${product?._id}/likes`);
        reFetch();
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={cardSm ? "card card_sm" : "card"}>
      <div className="card_items">
        <Link to={`/product/${product?._id}`}>
          <img
            onClick={handleClick}
            src={product?.images[0]}
            alt="produnt 1"
            className={cardSm ? "card_img card_img_sm" : "card_img"}
          />

          <div className="card_content" onClick={handleClick}>
            <p className={cardSm ? "card_name card_name_sm" : "card_name"}>
              {truncate(
                product.name,
                window.innerWidth < 800 || cardSm ? 2 : 4
              )}
            </p>
            <h2 className={cardSm ? "card_price card_price_sm" : "card_price"}>
              {product.price.toLocaleString()} won
            </h2>
          </div>
        </Link>
        {showFavorite &&
          (product?.likes.includes(user?._id) ? (
            <FavoriteIcon
              className="card_favorite"
              sx={{
                height: "40px",
                width: "40px",
                fill: "#f44336",
                zIndex: 10000,
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={handleFavourite}
            />
          ) : (
            <FavoriteIcon
              sx={{
                height: "40px",
                width: "40px",
                stroke: "white",
                strokeWidth: "2px",
                fill: "#0000007f",
                zIndex: 10000,
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              className="card_favorite"
              onClick={handleFavourite}
            />
          ))}
      </div>
    </div>
  );
}

export default Card;
