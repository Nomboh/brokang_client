import "./smallWidget.css";
import StarIcon from "@mui/icons-material/Star";

import React, { useState } from "react";
import { Avatar } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useProduct } from "../../context/productContext";

function SmallWidget({ userId, numberOfProducts, buttons, follow }) {
  const { data: seller, reFetch } = useFetch("user/" + userId);

  const [openNotification, setOpenNotification] = useState(false);

  const { followings, followers, reFollowings } = useProduct();
  const { user } = useAuth();

  const handleFollow = async () => {
    try {
      const { data } = await axiosInstance().put(`user/follow/${userId}`);
      if (data.status === "success") {
        reFollowings();
        reFetch();
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        closeOnClick: true,
        type: "error",
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await axiosInstance().put(`user/unfollow/${userId}`);
      if (data.status === "success") {
        reFollowings();
        reFetch();
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        closeOnClick: true,
        type: "error",
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  const addNotifications = async () => {
    setOpenNotification(false);
  };

  const offNotifications = async () => {
    setOpenNotification(false);
  };

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

      <ToastContainer />
      {buttons && (
        <div className="sw_button_wrapper">
          <button className="sw_btn_outline sw_talk">
            <MessageIcon color="action" /> brokang talk
          </button>

          {seller?.data.followers.includes(user?._id) ? (
            <>
              <button
                onClick={handleUnfollow}
                className="sw_btn_fill sw_unfollow"
              >
                unfollow <DoneIcon htmlColor="#fff" />
              </button>

              <button
                onClick={() => setOpenNotification(!openNotification)}
                className="sw_btn_circle"
              >
                <NotificationAddIcon htmlColor="#e95e51" />
              </button>
              {openNotification && (
                <div className="sw_notification">
                  <ul className="sw_list">
                    <li className="sw_list_items" onClick={addNotifications}>
                      Add Notifications
                    </li>
                    <li className="sw_list_items" onClick={offNotifications}>
                      Off Notifications
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button onClick={handleFollow} className="sw_btn_outline sw_follow">
              follow <AddIcon color="primary" />
            </button>
          )}
        </div>
      )}

      {follow && (
        <>
          <div className="sw_follow_wrapper">
            <Link to={"/following"}>
              {" "}
              <p className="sw_follow_none">
                following <span>({followings?.length})</span>{" "}
              </p>
            </Link>
            <p className="sw_follow_line"></p>
            <Link to={"/follower"}>
              <p className="sw_follow_none">
                follower <span>({followers?.length})</span>
              </p>
            </Link>
          </div>
        </>
      )}

      <Link to={userId === user?._id ? "/store" : `/seller/${userId}`}>
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
