import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetailCard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import MainHeader from "./components/MainHeader";
import Footerbar from "./components/Footer";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footerbar />
      </BrowserRouter>
    </>
  );
}

export default App;
