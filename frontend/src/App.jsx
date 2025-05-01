import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
    const isSellerPath = useLocation().pathname.includes("seller");

    return (
        <div>
            {isSellerPath ? null : <Navbar />}

            <Toaster />

            <div
                className={`${
                    isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 py-4"
                }`}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> */}
                </Routes>
            </div>
        </div>
    );
};

export default App;
