import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import SmallWidget from "../../components/smallWidget/SmallWidget";
import Upbar from "../../components/upbar/Upbar";
import { useAuth } from "../../context/auth/AuthContext";
import useFetch from "../../hooks/useFetch";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import "./follow.css";

function Follow() {
  const { data: userProducts } = useFetch("/product/userProducts");

  const { user } = useAuth();

  const location = useLocation();

  const path = location.pathname.split("/")[1];

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <Mmenu />

      <div className="follow_container">
        <div className="follow_left">
          <SmallWidget
            numberOfProducts={userProducts?.totalProducts}
            userId={user?._id}
            follow={true}
          />
        </div>
        <div className="follow_right">
          <div className="tabs_wrapper">
            <Link to={"following"}>
              <p className={`tab ${path === "following" ? "tab_active" : ""}`}>
                following
              </p>
            </Link>
            <Link to={"follower"}>
              <p className={`tab ${path === "follower" ? "tab_active" : ""}`}>
                follower
              </p>
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Follow;
