import "./follower.css";

import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useProduct } from "../../context/productContext";
import { getProductQty } from "../../utils/helper";
import { Link } from "react-router-dom";

function Follower() {
  const { user } = useAuth();

  const { followers: data, reFollowers, reFollowings } = useProduct();

  const handleUnfollow = async userId => {
    try {
      await axiosInstance().put("/user/unfollow/" + userId);
      reFollowers();
      reFollowings();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async userId => {
    try {
      await axiosInstance().put("/user/follow/" + userId);
      reFollowers();
      reFollowings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="follower_container">
      {data?.users.map(follower => {
        return (
          <div className="follow_list" key={follower._id}>
            <Link to={"/seller/" + follower._id}>
              {" "}
              <div className="fl_info">
                <Avatar
                  sx={{ height: "120px", width: "120px" }}
                  src={follower.photo}
                />

                <div className="info_details">
                  <p className="fl_info_name">{follower.name}</p>
                  <p className="fl_info_qty">
                    Product{console.log(follower)}
                    <span>({getProductQty(data?.stats, follower._id)})</span>
                  </p>
                </div>
              </div>
            </Link>

            <div className="fl_buttons">
              {follower.followers.includes(user._id) ? (
                <button
                  onClick={() => handleUnfollow(follower._id)}
                  className="sw_btn_fill sw_unfollow"
                >
                  unfollow <DoneIcon htmlColor="#fff" />
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(follower._id)}
                  className="sw_btn_outline sw_follow"
                >
                  follow <AddIcon color="primary" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Follower;
