import React, { useEffect } from "react";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import ProductDetail from "../../components/productdetails/ProductDetail";
import Upbar from "../../components/upbar/Upbar";
import { useProduct } from "../../context/productContext";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import "./product.css";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductWidget from "../../components/productwidget/ProductWidget";
import Comments from "../../components/comments/Comments";
import RecommentedProducts from "../../components/recommendproducts/RecommentedProducts";

function Product() {
  const { currentProduct, setCurrentProduct } = useProduct();
  const location = useLocation();

  const url = location.pathname.split("/")[2];

  const { data } = useFetch(`product/${url}`);

  useEffect(() => {
    if (!currentProduct) {
      setCurrentProduct(data?.product);
    }
  }, [data?.product, currentProduct, setCurrentProduct]);

  return (
    <div className="container">
      <Mtop />
      <Upbar />
      <Bellowbar />
      <Mmenu />
      <div className="product_container">
        {currentProduct && (
          <>
            <ProductDetail currentProduct={currentProduct} />
            <ProductWidget currentProduct={currentProduct} />
            <Comments />
            <RecommentedProducts productId={currentProduct?._id} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
