import "./seller.css";

import React, { useState } from "react";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import Mtop from "../../mobile/mUpbar/Mtop";
import Mmenu from "../../mobile/mmenu/Mmenu";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SmallWidget from "../../components/smallWidget/SmallWidget";
import { Search } from "@mui/icons-material";
import Card from "../../components/card/Card";
import { Pagination } from "@mui/material";
import { useEffect } from "react";

function Seller() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const sellerId = useLocation().pathname.split("/")[2];
  const limit = 6;
  const { data } = useFetch(
    `/product/sellerProducts/${sellerId}?sort=-createdAt&search=${searchQuery}&page=${page}&limit=${limit}`
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [data]);

  const handleChange = (e, v) => {
    setPage(v);
  };

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <Mmenu />
      <div className="seller_container">
        <div className="seller_left">
          <SmallWidget
            buttons={true}
            numberOfProducts={data?.totalProducts}
            userId={sellerId}
          />
        </div>
        <div className="seller_right">
          <div className="sr_top">
            <h3 className="sr_title">
              All ({searchQuery ? data?.length : data?.totalProducts}) Products
            </h3>
            <div className="sr_search">
              <div className="sr_search_wrapper">
                <input
                  className="sr_input"
                  type="text"
                  name="search"
                  placeholder="search products"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  id="search"
                />
                <Search color="action" sx={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>

          <div className="sr_bottom">
            <div className="grid">
              <div className="grid_items">
                {data &&
                  data?.products.map(product => {
                    return <Card product={product} key={product._id} />;
                  })}
              </div>
            </div>
          </div>

          <div className="pagination_wrapper">
            {data && (
              <Pagination
                count={
                  searchQuery
                    ? Math.ceil(data?.length / limit)
                    : Math.ceil(data?.totalProducts / limit)
                }
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Seller;
