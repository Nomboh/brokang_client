import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import SmallWidget from "../../components/smallWidget/SmallWidget";
import Upbar from "../../components/upbar/Upbar";
import { useAuth } from "../../context/auth/AuthContext";
import useFetch from "../../hooks/useFetch";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import FavouriteProducts from "./FavouriteProducts";
import HiddenProducts from "./HiddenProducts";
import SaleProducts from "./SaleProducts";
import "./store.css";

function Store() {
  const { user } = useAuth();

  const [index, setIndex] = useState(1);

  let [searchParams, setSearchParams] = useSearchParams();

  const handleTab = type => {
    setSearchParams({ tab: type });
  };

  useEffect(() => {
    if (searchParams.get("tab") === "favorite") {
      setIndex(3);
    }

    if (searchParams.get("tab") === "hidden") {
      setIndex(2);
    }

    if (searchParams.get("tab") === "sale") {
      setIndex(1);
    }
  }, [searchParams]);

  const { data: userProducts } = useFetch("/product/userProducts");

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mmenu />
      <Mtop />
      <div className="store_container">
        <div className="store_left">
          <SmallWidget
            numberOfProducts={userProducts?.totalProducts}
            userId={user._id}
            follow={true}
          />
        </div>

        <div className="store_right">
          <div className="tabs_wrapper">
            <p
              className={`tab ${index === 1 ? "tab_active" : ""}`}
              onClick={() => handleTab("sale")}
            >
              products for sale
            </p>
            <p
              className={`tab ${index === 2 ? "tab_active" : ""}`}
              onClick={() => handleTab("hidden")}
            >
              hidden sale
            </p>
            <p
              className={`tab ${index === 3 ? "tab_active" : ""}`}
              onClick={() => handleTab("favorite")}
            >
              favorite product
            </p>
          </div>

          <div className="store_content">
            {searchParams.get("tab") === "favorite" ? (
              <FavouriteProducts />
            ) : searchParams.get("tab") === "hidden" ? (
              <HiddenProducts />
            ) : (
              <SaleProducts />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Store;
