import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Shop from "./Shop";
import Cart from "./Cart";

import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <>
    <CartProvider>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          
          <Route exact path="/Shop" element={<Shop />} />
          <Route exact path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
      </CartProvider>
    </>
  );
};
export default App;
