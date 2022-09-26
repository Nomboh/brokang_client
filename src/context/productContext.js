import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [phoneMenu, setPhoneMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { data: followings, reFetch: reFollowings } =
    useFetch("/user/followings");

  const { data: followers, reFetch: reFollowers } = useFetch("/user/followers");
  return (
    <ProductContext.Provider
      value={{
        phoneMenu,
        setPhoneMenu,
        currentProduct,
        setCurrentProduct,
        followings,
        reFollowings,
        followers,
        reFollowers,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;
