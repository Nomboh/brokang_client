import "./home.css";

import React from "react";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Mtop from "../../mobile/mUpbar/Mtop";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";

function Home() {
  const { data } = useFetch(`/product?sort=-createdAt`);

  return (
    <div className="container">
      <Mtop />
      <Upbar />
      <Bellowbar />
      <Mmenu />

      <div className="grid">
        <div className="grid_items">
          {data?.products &&
            data?.products.map(product => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
