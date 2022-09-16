import React from "react";

function SellCategory() {
  return (
    <div className="sell_category">
      <div className="sc_main">
        {Array.from(Array(22).keys()).map(() => {
          return <p className="sc_main_items"> Category</p>;
        })}
      </div>
      <div className="sc_line"></div>
      <div className="sc_sub">
        {" "}
        {Array.from(Array(12).keys()).map(() => {
          return <p className="sc_sub_items"> Sub Category</p>;
        })}
      </div>
    </div>
  );
}

export default SellCategory;
