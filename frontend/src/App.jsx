import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";

const App = () => {
    const isSellerPath = useLocation().pathname.includes("seller");

    return (
        <div className="flex flex-col min-h-screen">
            {isSellerPath ? null : <Navbar />}

            <Toaster />

            <div
                className={`flex-grow ${
                    isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 py-4"
                }`}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:category" element={<ProductCategory />} />
                    {/* <Route path="/cart" element={<Cart />} />
                    <Route path="/my-orders" element={<MyOrders />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>

            {isSellerPath ? null : <Footer />}
        </div>
    );
};

export default App;
