import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../contexts/AppContext";

const getProductsPerPage = (width) => {
    if (width >= 1024) {
        return 5;
    } else if (width >= 640) {
        return 3;
    } else {
        return 2;
    }
};

const BestSellers = () => {
    const { products } = useAppContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(() =>
        getProductsPerPage(window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            setProductsPerPage(getProductsPerPage(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const bestSellingProducts = products.filter((product) => product.inStock);

    const totalPages = Math.ceil(bestSellingProducts.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = bestSellingProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    useEffect(() => {
        const validTotalPages = Math.max(totalPages, 1);

        if (currentPage > validTotalPages) {
            setCurrentPage(validTotalPages);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-bold">Best Sellers</p>
            {bestSellingProducts.length === 0 ? (
                <p>Loading best sellers...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {totalPages > 1 && bestSellingProducts.length > 0 && (
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
