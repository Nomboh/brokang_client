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

function Seller() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const sellerId = useLocation().pathname.split("/")[2];
  const limit = 6;
  const { data } = useFetch(
    `/product/sellerProducts/${sellerId}?sort=-createdAt&search=${searchQuery}&page=${page}&limit=${limit}`
  );

  const { data: pdt } = useFetch(`/product/sellerProducts/${sellerId}`);

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
          <SmallWidget numberOfProducts={pdt?.length} userId={sellerId} />
        </div>
        <div className="seller_right">
          <div className="sr_top">
            <h3 className="sr_title">
              All ({searchQuery ? data?.length : pdt?.length}) Products
            </h3>
            <div className="sr_search">
              <select
                className="sr_select"
                onChange={() => {}}
                name="categories"
                id="categories"
              >
                <option value={""}>All Categories</option>
              </select>

              <div className="sr_search_wrapper">
                <input
                  className="sr_input"
                  type="text"
                  name="search"
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
            {data && pdt && (
              <Pagination
                count={
                  searchQuery
                    ? Math.ceil(data?.length / limit)
                    : Math.ceil(pdt?.length / limit)
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
