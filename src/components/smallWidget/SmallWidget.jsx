import "./smallWidget.css";
import StarIcon from "@mui/icons-material/Star";

import React from "react";
import { Avatar } from "@mui/material";
import useFetch from "../../hooks/useFetch";

function SmallWidget({ currentProduct, numberOfProducts }) {
  const { data: seller } = useFetch("user/" + currentProduct?.userId);

  return (
    <div className="sw_container">
      <Avatar
        sx={{
          height: "100px",
          width: "100px",
          alignSelf: "center",
          cursor: "pointer",
        }}
        src={seller?.data.photo}
      />
      <div className="sw_name">{seller?.data.name}</div>

      <div className="sw_details">
        <span className="sw_item">Goods</span>
        <span className="sw_value">{numberOfProducts}</span>
      </div>

      <div className="sw_details">
        <span className="sw_item">Transaction review</span>
        <span className="sw_value">({currentProduct?.reviews?.length})</span>
      </div>
      <div className="sw_stars">
        <StarIcon className="sw_star" />
        <StarIcon className="sw_star" />
        <StarIcon className="sw_star" />
        <StarIcon className="sw_star" />
        <StarIcon className="sw_star" />
      </div>
    </div>
  );
}

export default SmallWidget;
