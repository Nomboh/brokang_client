import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import Sell from "./pages/sell/Sell";

function App() {
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
          <Route path="/sell" element={<Sell />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
