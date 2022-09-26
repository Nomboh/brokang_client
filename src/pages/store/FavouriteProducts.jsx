import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import useFetch from "../../hooks/useFetch";

function FavouriteProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const limit = 6;

  const { data: userLikedProducts, reFetch } = useFetch(
    `/product/userLikedProducts?search=${searchQuery}&page=${page}&limit=${limit}`
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [userLikedProducts]);

  const handleChange = (e, v) => {
    setPage(v);
  };

  return (
    <div className="sp_store">
      {userLikedProducts?.length > 0 ? (
        <>
          <div className="sr_top">
            <h3 className="sr_title">
              All (
              {searchQuery
                ? userLikedProducts?.length
                : userLikedProducts?.totalProducts}
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
                {userLikedProducts &&
                  userLikedProducts?.products.map(product => {
                    return (
                      <Card
                        product={product}
                        key={product._id}
                        showFavorite={true}
                        reFetch={reFetch}
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="pagination_wrapper">
            {userLikedProducts && (
              <Pagination
                count={
                  searchQuery
                    ? Math.ceil(userLikedProducts?.length / limit)
                    : Math.ceil(userLikedProducts?.totalProducts / limit)
                }
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        </>
      ) : (
        <p className="store_noproduct">There are no Favorite products</p>
      )}
    </div>
  );
}

export default FavouriteProducts;
