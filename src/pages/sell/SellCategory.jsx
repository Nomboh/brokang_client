import React, { useState } from "react";
import { CREATE_ACTION_TYPES } from "../../context/CreateProduct/formAction";
import useFetch from "../../hooks/useFetch";

function SellCategory({ dispatch, catI, setCatI, subI, setSubI }) {
  const [subCat, setSubCat] = useState([]);

  const { data: cat } = useFetch("category");

  const handleCat = (e, catId, subCat, index) => {
    e.preventDefault();

    setSubCat(subCat);
    setCatI(index);
    dispatch({ type: CREATE_ACTION_TYPES.ADD_CAT, payload: catId });
  };

  const handleSubCat = (e, subCatId, index) => {
    e.preventDefault();
    setSubI(index);
    dispatch({ type: CREATE_ACTION_TYPES.ADD_SUB_CAT, payload: subCatId });
  };

  return (
    <div className="sell_category">
      <div className="sc_main">
        <h3 className="sc_cat_heading">Categories</h3>
        {cat &&
          cat?.categories.map((k, i) => {
            return (
              <p
                key={k._id}
                className={
                  catI === i ? "sc_main_items sc_active" : "sc_main_items"
                }
                onClick={e => handleCat(e, k._id, k.subCategories, i)}
              >
                {k.name}
              </p>
            );
          })}
      </div>
      <div className="sc_line"></div>
      <div className="sc_sub">
        <h3 className="sc_cat_heading">Sub Categories</h3>{" "}
        {subCat.length > 0 &&
          subCat.map((k, i) => {
            return (
              <p
                key={k._id}
                className={
                  subI === i ? "sc_sub_items sc_active" : "sc_sub_items"
                }
                onClick={e => handleSubCat(e, k._id, i)}
              >
                {k.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default SellCategory;
