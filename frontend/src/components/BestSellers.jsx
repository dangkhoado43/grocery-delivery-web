import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../contexts/AppContext";

const BestSellers = () => {
    const { products, isLoading } = useAppContext();

    const bestSellingProducts = products
        .filter((product) => product.inStock)
        .slice(0, 5);

    if (!isLoading && bestSellingProducts.length === 0) {
        return null;
    }

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-bold">Best Sellers</p>
            {isLoading ? (
                <p className="mt-4 text-gray-600">Loading best sellers...</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                        {bestSellingProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    {products.filter((p) => p.inStock).length > 5 && (
                        <div className="text-center mt-8">
                            <Link
                                to="/products"
                                className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                            >
                                View All Products <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BestSellers;
