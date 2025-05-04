import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

const getProductsPerPage = (width) => {
    if (width >= 1024) {
        return 10;
    } else if (width >= 640) {
        return 6;
    } else {
        return 4;
    }
};

const Products = () => {
    const { products, isLoading } = useAppContext();

    const [searchQuery, setSearchQuery] = useState("");

    // Pagination
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

    const productsInStock = useMemo(
        () => products.filter((product) => product.inStock),
        [products]
    );

    const filteredProducts = useMemo(() => {
        if (!searchQuery) {
            return productsInStock;
        }

        return productsInStock.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [productsInStock, searchQuery]);

    const totalPages = useMemo(
        () => Math.ceil(filteredProducts.length / productsPerPage),
        [filteredProducts, productsPerPage]
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = useMemo(
        () => filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
        [filteredProducts, indexOfFirstProduct, indexOfLastProduct]
    );

    useEffect(() => {
        const validTotalPages = Math.max(totalPages, 1);

        if (currentPage > validTotalPages) {
            setCurrentPage(validTotalPages);
        } else if (searchQuery && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage, searchQuery]);

    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex flex-col items-center md:items-end w-max">
                    <p className="text-2xl font-medium uppercase">
                        All Products
                    </p>
                    <div className="w-16 h-0.5 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4 pl-10 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                </div>
            </div>

            {isLoading ? (
                <p className="text-center mt-6 text-gray-600">
                    Loading products...
                </p>
            ) : products.length === 0 ? (
                <p className="text-center mt-6 text-gray-600">
                    No products available at the moment.
                </p>
            ) : filteredProducts.length === 0 ? (
                <p className="text-center mt-6 text-gray-600">
                    No products found matching your search.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {currentProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )}

            {!isLoading && totalPages > 1 && productsInStock.length > 0 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;
