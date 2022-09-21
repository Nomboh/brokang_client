import "./productwidget.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TagIcon from "@mui/icons-material/Tag";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";

import React, { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import SmallWidget from "../smallWidget/SmallWidget";
import { Link } from "react-router-dom";

function ProductWidget({ currentProduct }) {
  const { data } = useFetch(
    `/product/sellerProducts/${currentProduct?.userId}?sort=-createdAt`
  );
  const [hasMoved, setHasMoved] = useState(false);

  const rowRef = useRef();

  const handleMove = direction => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      setHasMoved(scrollTo > 0 ? true : false);

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="pw_container">
      <div className="pw_left">
        <div className="pw_title">
          <h2 className="pw_heading">Seller's other products</h2>
          <Link to={`/seller/${currentProduct?.userId}`}>
            <div className="pw_viewall">
              View All <ChevronRightIcon />
            </div>
          </Link>
        </div>
        <div className="pw_grid">
          <div className="grid_sm">
            {hasMoved && (
              <div
                className="pw_chev pw_chev_left"
                onClick={() => handleMove("left")}
              >
                <ChevronLeftIcon />
              </div>
            )}

            <div className="grid_items_sm" ref={rowRef}>
              {data?.products
                .filter(p => p._id !== currentProduct?._id)
                .map(product => (
                  <Card product={product} cardSm={true} key={product._id} />
                ))}
            </div>

            <div
              className="pw_chev pw_chev_right"
              onClick={() => handleMove("right")}
            >
              <ChevronRightIcon />
            </div>
          </div>
        </div>

        <div className="pw_desc">
          <h2 className="pw_heading">Product Detailed Description</h2>

          <div className="pw_description">{currentProduct?.description}</div>
        </div>

        <div className="pw_tag">
          <div className="pw_tag_wrapper">
            <TagIcon />
            <div className="pw_tags">
              {currentProduct?.tags.map(tag => (
                <p key={tag} className="pw_tag_text">
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className="pw_tag_wrapper">
            <SellTwoToneIcon />
            <div className="pw_tags">
              <p className="pw_tag_text">bags</p>
              <ChevronRightIcon />
              <p className="pw_tag_text">women bags</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pw_right">
        <SmallWidget
          currentProduct={currentProduct}
          numberOfProducts={data?.length}
        />
      </div>
    </div>
  );
}

export default ProductWidget;
