import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../contexts/AppContext";

const BestSellers = () => {
    const { products } = useAppContext();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const bestSellingProducts = products.filter((product) => product.inStock);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = bestSellingProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(bestSellingProducts.length / productsPerPage);

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-bold">Best Sellers</p>
            {bestSellingProducts.length === 0 ? (
                <p>Loading best sellers...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {/* {bestSellingProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))} */}
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BestSellers;
