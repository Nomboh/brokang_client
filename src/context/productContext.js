import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [phoneMenu, setPhoneMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  return (
    <ProductContext.Provider
      value={{ phoneMenu, setPhoneMenu, currentProduct, setCurrentProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;
