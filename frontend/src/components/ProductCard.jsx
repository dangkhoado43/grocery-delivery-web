import { ShoppingCart, Star } from "lucide-react";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

const ProductCard = ({ product }) => {
    const {
        currency,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
    } = useAppContext();

    return (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={product.image[0]}
                    alt={product.name}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                    {product.name}
                </p>
                <div className="flex items-center gap-0.5">
                    {Array(5)
                        .fill("")
                        .map((_, i) =>
                            product.rating > i ? (
                                <Star
                                    key={i}
                                    strokeWidth={2}
                                    className="text-emerald-600 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    fill="currentColor"
                                />
                            ) : (
                                <Star
                                    key={i}
                                    strokeWidth={2}
                                    className="text-emerald-100 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                                    fill="currentColor"
                                />
                            )
                        )}
                    <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-emerald-500">
                        {currency}
                        {product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            {currency}
                            {product.price}
                        </span>
                    </p>
                    <div
                        className="text-emerald-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-emerald-100 border border-emerald-300 md:w-[80px] w-[64px] h-[34px] rounded text-emerald-600 font-medium cursor-pointer"
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart
                                    strokeWidth={2}
                                    className="text-emerald-600 w-4 h-4"
                                />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-emerald-500/25 rounded select-none">
                                <button
                                    onClick={() => removeFromCart(product)}
                                    className="cursor-pointer text-md px-2 h-full"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">
                                    {cartItems[product._id].quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        updateCartItemQuantity(
                                            product,
                                            cartItems[product._id].quantity + 1
                                        )
                                    }
                                    className="cursor-pointer text-md px-2 h-full"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
