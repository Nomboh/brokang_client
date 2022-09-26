import "./following.css";

import React from "react";
import { Avatar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import axiosInstance from "../../utils/axiosInstance";
import { useProduct } from "../../context/productContext";
import { getProductQty } from "../../utils/helper";
import { Link } from "react-router-dom";

function Following() {
  const { followings: data, reFollowings, reFollowers } = useProduct();

  const handleUnfollow = async userId => {
    try {
      await axiosInstance().put("/user/unfollow/" + userId);
      reFollowers();
      reFollowings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="following_container">
      {data?.users.map(user => {
        return (
          <div className="follow_list" key={user._id}>
            <Link to={"/seller/" + user._id}>
              <div className="fl_info">
                <Avatar
                  sx={{ height: "120px", width: "120px" }}
                  src={user.photo}
                />

                <div className="info_details">
                  <p className="fl_info_name">{user.name}</p>
                  <p className="fl_info_qty">
                    Product <span>({getProductQty(data.stats, user._id)})</span>
                  </p>
                </div>
              </div>
            </Link>

            <div className="fl_buttons">
              <button
                onClick={() => handleUnfollow(user?._id)}
                className="sw_btn_fill sw_unfollow"
              >
                unfollow <DoneIcon htmlColor="#fff" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Following;
