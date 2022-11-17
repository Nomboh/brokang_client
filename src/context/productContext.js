import { createContext, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const ProductContext = createContext();

const stripePromise = loadStripe(
  "pk_test_51LYRWJHcwFlmTUzaKZEQnRmRXhEbldYOyw9gK5pKjdHjhiYT5umwXHKjuiDYtHhPgTBdzqCvw1lxXXqyeyzMRK6Y00yDF0C59s"
);

const ProductContextProvider = ({ children }) => {
  const [phoneMenu, setPhoneMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [subCatId, setSubCatId] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [status, setstatus] = useState("");
  const [search, setSearch] = useState("");
  return (
    <ProductContext.Provider
      value={{
        phoneMenu,
        setPhoneMenu,
        currentProduct,
        setCurrentProduct,
        stripePromise,
        selectedChat,
        setSelectedChat,
        selectedCat,
        setSelectedCat,
        subCatId,
        setSubCatId,
        status,
        setstatus,
        search,
        setSearch,
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
