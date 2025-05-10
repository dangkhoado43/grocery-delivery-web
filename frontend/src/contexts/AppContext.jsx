import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/images/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const currency = import.meta.env.VITE_CURRENCY;

    // Fetch all products
    const fetchProducts = async () => {
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setProducts(dummyProducts);
        } finally {
            setIsLoading(false);
        }
    };

    // Add Product to Cart
    const addToCart = async (productId, quantityToAdd = 1) => {
        if (quantityToAdd <= 0) {
            toast.error("Quantity must be greater than 0");

            return;
        }

        let cartData = structuredClone(cartItems);
        const productDetails = products.find(
            (product) => product._id === productId
        );

        if (!productDetails) {
            toast.error("Product not found to add to cart.");

            return;
        }

        if (cartData[productId]) {
            cartData[productId].quantity += quantityToAdd;
        } else {
            cartData[productId] = {
                ...productDetails,
                quantity: quantityToAdd,
            };
        }

        console.log(cartData);
        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    // Update Cart Item Quantity
    const updateCartItemQuantity = async (productId, quantity) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[productId]) {
            toast.error("Product not in cart.");

            return;
        }

        if (quantity <= 0) {
            delete cartData[productId];
        } else {
            cartData[productId].quantity = quantity;
        }
        console.log(cartData);
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    // Remove Product From Cart
    const removeFromCart = async (productId) => {
        let cartData = structuredClone(cartItems);

        if (!cartData[productId]) {
            toast.error("Product not in cart.");

            return;
        }

        if (cartData[productId].quantity > 1) {
            cartData[productId].quantity -= 1;
        } else {
            delete cartData[productId];
        }
        console.log(cartData);
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
        isLoading,
        user,
        setUser,
        isSeller,
        setIsSeller,
        products,
        setProducts,
        currency,
        addToCart,
        cartItems,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
