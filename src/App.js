import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Product from "./pages/product/Product";

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
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
