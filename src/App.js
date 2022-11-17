import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import Sell from "./pages/sell/Sell";
import { useAuth } from "./context/auth/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Seller from "./pages/seller/Seller";
import Store from "./pages/store/Store";
import Follow from "./pages/follow/Follow";
import Follower from "./pages/follower/Follower";
import Following from "./pages/following/Following";
import Profile from "./pages/profile/Profile";
import Order from "./pages/order/Order";
import Success from "./pages/success/Success";
import { Elements } from "@stripe/react-stripe-js";
import { useProduct } from "./context/productContext";
import Messager from "./pages/messager/Messager";
import Transaction from "./pages/transaction/Transaction";
import { SkeletonTheme } from "react-loading-skeleton";
import Search from "./pages/search/Search";

function App() {
  const { user } = useAuth();

  const { stripePromise } = useProduct();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E95E51",
      },
    },
  });
  return (
    <div className="App">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller/:id" element={<Seller />} />
            <Route
              path="/success"
              element={
                <Elements stripe={stripePromise}>
                  {" "}
                  <Success />
                </Elements>
              }
            />

            <Route
              path="/store"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Store />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Messager />
                </ProtectedRoute>
              }
            />

            <Route
              path="/order/:id"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Elements stripe={stripePromise}>
                    <Order />
                  </Elements>
                </ProtectedRoute>
              }
            />

            <Route element={<Follow />}>
              <Route path="follower" element={<Follower />} />
              <Route path="following" element={<Following />} />
            </Route>

            <Route path="search" element={<Search />} />

            <Route
              path="/sell"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Sell />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Transaction />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
