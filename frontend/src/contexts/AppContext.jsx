import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/images/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const currency = import.meta.env.VITE_CURRENCY;

    // Fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    };

    // Add Product to Cart
    const addToCart = async (product) => {
        let cartData = structuredClone(cartItems);

        if (cartData[product._id]) {
            cartData[product._id].quantity += 1;
        } else {
            cartData[product._id] = { ...product, quantity: 1 };
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    // Update Cart Item Quantity
    const updateCartItemQuantity = async (product, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity === 0) {
            delete cartData[product._id];
        } else {
            cartData[product._id].quantity = quantity;
        }
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    // Remove Product From Cart
    const removeFromCart = async (product) => {
        let cartData = structuredClone(cartItems);

        if (cartData[product._id].quantity > 1) {
            cartData[product._id].quantity -= 1;
        } else {
            delete cartData[product._id];
        }
        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    // Clear Cart
    const clearCart = async () => {
        setCartItems({});
        toast.success("Cart cleared");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        products,
        setProducts,
        currency,
        addToCart,
        cartItems,
        setCartItems,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
