import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";

const ProductDetail = () => {
    const {
        products,
        isLoading,
        navigate,
        currency,
        addToCart,
        cartItems,
        updateCartItemQuantity,
    } = useAppContext();

    const { id } = useParams();
    const product = products.find((product) => product._id === id);

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!isLoading && product && cartItems[product._id]) {
            setQuantity(cartItems[product._id].quantity);
        } else if (!isLoading && product) {
            setQuantity(1);
        }
    }, [id, product, cartItems, isLoading]);

    useEffect(() => {
        if (product && products.length > 0) {
            const filteredProducts = products
                .filter(
                    (item) =>
                        item.category === product.category &&
                        item._id !== product._id
                )
                .slice(0, 5);

            setRelatedProducts(filteredProducts);
        }
    }, [products, product]);

    useEffect(() => {
        if (product) {
            setThumbnail(product.image?.[0] || null);
        } else {
            setThumbnail(null);
        }
    }, [product]);

    const handleQuantityChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setQuantity("");
        } else {
            const numValue = parseInt(value, 10);

            if (!isNaN(numValue) && numValue > 0) {
                setQuantity(numValue);
            } else if (!isNaN(numValue) && numValue <= 0) {
                setQuantity(1);
            }
        }
    };

    const handleQuantityBlur = () => {
        if (
            quantity === "" ||
            parseInt(quantity, 10) < 1 ||
            isNaN(parseInt(quantity, 10))
        ) {
            setQuantity(1);
        } else {
            setQuantity(parseInt(quantity, 10));
        }
    };

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => (parseInt(prevQuantity, 10) || 0) + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) =>
            Math.max(1, (parseInt(prevQuantity, 10) || 1) - 1)
        );
    };

    const handleAddToCart = () => {
        const currentQuantity = parseInt(quantity, 10) || 1;

        if (cartItems[product._id]) {
            updateCartItemQuantity(product._id, currentQuantity);
        } else {
            addToCart(product._id, currentQuantity);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/cart");
    };

    if (isLoading) {
        return (
            <div className="mt-6 md:mt-12 max-w-6xl w-full flex flex-col items-center justify-center min-h-[50vh]">
                <ClipLoader color={"#10B981"} loading={isLoading} size={50} />
                <p className="text-2xl text-gray-700 mt-4">
                    Loading product details...
                </p>
            </div>
        );
    }

    if (!product && !isLoading) {
        return (
            <div className="mt-6 md:mt-12 max-w-6xl w-full flex flex-col items-center justify-center min-h-[50vh]">
                <p className="text-2xl text-gray-700 mb-4">
                    Product not found.
                </p>
                <Link
                    to="/products"
                    className="px-6 py-2.5 border rounded text-emerald-500 font-medium hover:bg-emerald-500/10 transition"
                >
                    Back to products
                </Link>
            </div>
        );
    }

    const displayableRelatedProducts = relatedProducts.filter(
        (product) => product.inStock
    );

    return (
        <div className="mt-6 md:mt-12 max-w-6xl w-full">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}>
                    {" "}
                    {product.category}
                </Link>{" "}
                /<span className="text-emerald-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image?.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(image)}
                                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-sm md:max-w-md rounded overflow-hidden flex items-center justify-center">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center mt-1">
                        <StarRating rating={product.rating} />
                        <p className="text-sm sm:text-base ml-1 sm:ml-2">
                            (
                            {product.rating % 1 === 0
                                ? product.rating
                                : product.rating.toFixed(1)}
                            )
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: {currency}
                            {product.price}
                        </p>
                        <p className="text-2xl font-medium">
                            MRP: {currency}
                            {product.offerPrice}
                        </p>
                        <span className="text-gray-500/70">
                            (inclusive of all taxes)
                        </span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description?.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3 mt-8 mb-6">
                        <p className="text-base font-medium text-gray-700">
                            Quantity:
                        </p>
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                                onClick={decrementQuantity}
                                className="px-3 py-1.5 text-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                                disabled={parseInt(quantity, 10) <= 1}
                            >
                                -
                            </button>
                            <input
                                inputMode="numeric"
                                value={quantity}
                                onChange={handleQuantityChange}
                                onBlur={handleQuantityBlur}
                                className="w-12 h-full text-center py-1.5 border-l border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-700"
                                aria-label="Product quantity"
                            />
                            <button
                                onClick={incrementQuantity}
                                className="px-3 py-1.5 text-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center mt-6 gap-4 text-base">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3.5 rounded cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="w-full py-3.5 rounded cursor-pointer font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {displayableRelatedProducts.length > 0 && (
                <div className="flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center w-max">
                        <p className="text-3xl font-medium">Related Products</p>
                        <div className="w-16 h-0.5 bg-emerald-500 rounded-full mt-2"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6 w-full">
                        {displayableRelatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            navigate("/products");
                        }}
                        className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-emerald-500 font-medium hover:bg-emerald-500/10 transition"
                    >
                        See more
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
