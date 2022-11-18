import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import Upbar from "../../components/upbar/Upbar";
import { useAuth } from "../../context/auth/AuthContext";
import useFetch from "../../hooks/useFetch";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./search.css";
import { useProduct } from "../../context/productContext";

function Search() {
  const searchParam = new URLSearchParams(document.location.search);

  const categoryId = searchParam.get("category");
  const query = searchParam.get("q");

  const [page, setPage] = useState(1);
  const { selectedCat, subCatId, setSubCatId, status, setstatus, search } =
    useProduct();

  const productStatus = ["all", "new", "used", "semiused"];

  const { user } = useAuth();
  useFetch("category/" + categoryId, "category");

  const {
    accData: products,
    loading,
    hasMore,
  } = useFetch(
    `product?category=${
      selectedCat || categoryId ? selectedCat?._id || categoryId : ""
    }&page=${page}&sort=-createdAt&subCategory=${
      subCatId ? subCatId : ""
    }&status=${status}&search=${
      query || search ? query || search : ""
    }&limit=12`
  );

  const { ref: lastCardRef, inView } = useInView({
    threshold: 0,
  });

  const goToTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  const handleSubCats = (id) => {
    setSubCatId(id);
  };

  console.log(products);

  return (
    <div className="container">
      <Mtop />
      <Upbar />
      <Bellowbar />
      <Mmenu />
      <div className="searchContainer">
        <div className="search_left">
          <div className="search_cat">
            {!search && (
              <h2 className="search_cat_title">{selectedCat?.alias}</h2>
            )}

            {selectedCat && selectedCat?.subCategories.length > 0
              ? selectedCat?.subCategories.map((item) => {
                  return (
                    <p
                      onClick={() => handleSubCats(item._id)}
                      key={item._id}
                      className="search_cat_items"
                    >
                      {item.name}
                    </p>
                  );
                })
              : ""}

            {(search || query) && <h2 className="search_cat_title">{query}</h2>}
          </div>
          <div className="search_condition">
            <h2 className="search_cat_title">Product condition</h2>

            {productStatus.map((item, index) => {
              return (
                <div key={index} className="search_condition_wrapper">
                  <input
                    type="checkbox"
                    name={"status"}
                    value={item === "all" ? "" : item}
                    id={`search_check_${index}`}
                    checked={
                      item === status || (item === "all" && "" === status)
                    }
                    onChange={(e) => setstatus(e.target.value)}
                  />
                  <label htmlFor={`search_check_${index}`}>{item}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="search_right">
          <div className="grid">
            <div className="grid_items">
              {loading && <LoadingSkeleton countTime={16} imageHieght={280} />}

              {products && products?.length > 0 ? (
                products
                  .filter((p) => p.userId !== user?._id)
                  .map((product) => {
                    return <Card key={product._id} product={product} />;
                  })
              ) : (
                <p className="no_search_products">
                  No products match this query
                </p>
              )}

              {products.length >= 12 && (
                <div
                  ref={lastCardRef}
                  style={{ height: "5px", width: "100%" }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {products.length > 12 && (
        <div className="move_to_top" onClick={goToTop}>
          <NavigationIcon
            sx={{ height: "40px", width: "40px" }}
            htmlColor="#464646"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Search;
