import "./home.css";

import React from "react";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Mtop from "../../mobile/mUpbar/Mtop";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { data } = useFetch(`/product?sort=-createdAt`);

  const { user } = useAuth();

  return (
    <div className="container">
      <Mtop />
      <Upbar />
      <Bellowbar />
      <Mmenu />

      <div className="grid">
        <div className="grid_items">
          {data?.products &&
            data?.products
              .filter(p => p.userId !== user?._id)
              .map(product => {
                return <Card key={product._id} product={product} />;
              })}
        </div>
      </div>
      <Link to={"/sell"}>
        <button className="home_toSell">Sell Your Items</button>
      </Link>

      <Footer />
    </div>
  );
}

export default Home;
