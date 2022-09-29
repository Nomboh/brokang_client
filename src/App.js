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

function App() {
  const { user } = useAuth();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#E95E51",
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller/:id" element={<Seller />} />
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<Follow />}>
            <Route path="follower" element={<Follower />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route
            path="/sell"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <Sell />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
