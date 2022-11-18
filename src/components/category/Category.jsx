import React from "react";
import "./category.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/productContext";

function Category() {
  const { data } = useFetch(`category`);

  const { setSelectedCat, setSubCatId, setSearch } = useProduct();

  const navigate = useNavigate();

  const handleCat = (category) => {
    setSelectedCat(category);
    setSearch("");
    navigate(`/search?category=${category._id}`);
    setSubCatId("");
  };
  return (
    <div className="cat_container">
      <div className="cat_top">
        {data?.categories && data?.categories.length > 0
          ? data.categories.map((cat) => {
              return (
                <div
                  key={cat._id}
                  className="cat_img_wrapper"
                  onClick={() => handleCat(cat)}
                >
                  <img src={cat.image} alt={cat.name} className="cat_img" />
                  <p className="cat_text">{cat.alias}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Category;
