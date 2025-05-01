import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../contexts/AppContext";

const BestSellers = () => {
    const { products } = useAppContext();

    const bestSellingProducts = products.slice(0, 5);

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-bold">Best Sellers</p>
            {bestSellingProducts.length === 0 ? (
                <p>Loading best sellers...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {bestSellingProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-6 gap-6">
                {products && products.length > 0 && <ProductCard product={products[0]}/>}
            </div> */}
        </div>
    );
};

export default BestSellers;
