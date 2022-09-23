import "./smallWidget.css";
import StarIcon from "@mui/icons-material/Star";

import React from "react";
import { Avatar } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";

function SmallWidget({ userId, numberOfProducts }) {
  const { data: seller } = useFetch("user/" + userId);

  const following = false;

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

      <div className="sw_button_wrapper">
        <button className="sw_btn_outline sw_talk">
          <MessageIcon color="action" /> brokang talk
        </button>

        {following ? (
          <button className="sw_btn_fill sw_unfollow">
            unfollow <DoneIcon color="action" />
          </button>
        ) : (
          <button className="sw_btn_outline sw_follow">
            follow <AddIcon color="primary" />
          </button>
        )}

        <button className="sw_btn_circle">
          <NotificationAddIcon />
        </button>
      </div>

      <Link to={`/seller/${userId}`}>
        <div className="sw_details">
          <span className="sw_item">Goods</span>
          <span className="sw_value">{numberOfProducts}</span>
        </div>
      </Link>

      <div className="sw_details">
        <span className="sw_item">Transaction review</span>
        <span className="sw_value">(0)</span>
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
