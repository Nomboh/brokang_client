import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import useFetch from "../../hooks/useFetch";

function HiddenProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const limit = 6;

  const { data: hiddenProducts } = useFetch(
    `/product/hiddenProducts?sort=-createdAt&search=${searchQuery}&page=${page}&limit=${limit}`
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [hiddenProducts]);

  const handleChange = (e, v) => {
    setPage(v);
  };

  return (
    <div className="sp_store">
      {hiddenProducts?.length > 0 ? (
        <>
          <div className="sr_top">
            <h3 className="sr_title">
              All (
              {searchQuery
                ? hiddenProducts?.length
                : hiddenProducts?.totalProducts}
              ) Products
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
                {hiddenProducts &&
                  hiddenProducts?.products.map(product => {
                    return <Card product={product} key={product._id} />;
                  })}
              </div>
            </div>
          </div>

          <div className="pagination_wrapper">
            {hiddenProducts && (
              <Pagination
                count={
                  searchQuery
                    ? Math.ceil(hiddenProducts?.length / limit)
                    : Math.ceil(hiddenProducts?.totalProducts / limit)
                }
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </>
      ) : (
        <p className="store_noproduct">There are no Hidden product</p>
      )}
    </div>
  );
}

export default HiddenProducts;
