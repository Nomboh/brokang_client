import "./home.css";

import React, { useState, useEffect } from "react";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Mtop from "../../mobile/mUpbar/Mtop";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import NavigationIcon from "@mui/icons-material/Navigation";

import "react-loading-skeleton/dist/skeleton.css";
import useFetch from "../../hooks/useFetch";
import { useInView } from "react-intersection-observer";
import Category from "../../components/category/Category";

function Home() {
  const [page, setpage] = useState(1);

  const { ref: lastCardRef, inView } = useInView({
    threshold: 0,
  });

  const { loading, accData, hasMore } = useFetch(
    `/product?sort=-createdAt&page=${page}&limit=${12}`
  );

  useEffect(() => {
    if (inView && hasMore) {
      setpage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  const goToTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { user } = useAuth();

  return (
    <div className="container">
      <Mtop />
      <Upbar />
      <Bellowbar />
      <Mmenu />

      <div className="home_cat_wrapper">
        <Category />
      </div>

      <div className="grid">
        <div className="grid_items">
          {loading && <LoadingSkeleton countTime={16} imageHieght={280} />}

          {accData && accData?.length > 0
            ? accData
                .filter((p) => p.userId !== user?._id)
                .map((product) => {
                  return <Card key={product._id} product={product} />;
                })
            : ""}
          <div ref={lastCardRef} style={{ height: "5px", width: "100%" }}></div>
        </div>
      </div>
      <Link to={"/sell"}>
        <button className="home_toSell">Sell Your Items</button>
      </Link>

      <div className="move_to_top" onClick={goToTop}>
        <NavigationIcon
          sx={{ height: "40px", width: "40px" }}
          htmlColor="#464646"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
