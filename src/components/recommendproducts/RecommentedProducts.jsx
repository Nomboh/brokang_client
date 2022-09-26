import "./recommendedProduct.css";

import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";

function RecommentedProducts({ productId }) {
  const { data, reFetch } = useFetch(
    `product/recommendedProducts/${productId}?limit=16&sort=-createdAt`
  );

  return (
    <div className="rp_container">
      <h3 className="rp_header">Recommended products</h3>

      <div className="grid">
        <div className="grid_items">
          {data &&
            data?.products.map(product => (
              <Card
                product={product}
                key={product._id}
                showFavorite={true}
                reFetch={reFetch}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default RecommentedProducts;
