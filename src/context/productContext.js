import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { loadStripe } from "@stripe/stripe-js";

const ProductContext = createContext();

const stripePromise = loadStripe(
  "pk_test_51LYRWJHcwFlmTUzaKZEQnRmRXhEbldYOyw9gK5pKjdHjhiYT5umwXHKjuiDYtHhPgTBdzqCvw1lxXXqyeyzMRK6Y00yDF0C59s"
);

const ProductContextProvider = ({ children }) => {
  const [phoneMenu, setPhoneMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { data: followings, reFetch: reFollowings } =
    useFetch("/user/followings");

  const { data: followers, reFetch: reFollowers } = useFetch("/user/followers");

  const [selectedChat, setSelectedChat] = useState(null);
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
        stripePromise,
        selectedChat,
        setSelectedChat,
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
