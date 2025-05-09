import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { dummyAddress, paymentMethodOptions } from "../assets/images/assets";
import SelectOption from "../components/SelectOption";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        updateCartItemQuantity,
        removeFromCart,
        getCartItemCount,
        getCartTotalAmount,
        navigate,
        isLoading,
    } = useAppContext();
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const getCart = () => {
        let tempArray = [];

        console.log(tempArray);

        for (const productId in cartItems) {
            console.log(cartItems);
            console.log(productId);
            console.log(cartItems[productId]);
            // const product = products.find((item) => item._id === productId);
            // tempArray.push({
            //     ...product,
            //     quantity: cartItems[productId].quantity,
            // });
            tempArray.push(cartItems[productId]);
        }
        setCartArray(tempArray);
    };

    useEffect(() => {
        if (products.length > 0 && cartItems.length > 0) {
            getCart();
        }
    }, [products, cartItems]);

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto mt-16">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart{" "}
                    <span className="text-sm text-emerald-500">
                        {getCartItemCount()} Items
                    </span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
                    >
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() =>
                                    navigate(
                                        `/products/${product.category.toLowerCase()}/${
                                            product._id
                                        }`
                                    )
                                }
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                            >
                                <img
                                    className="max-w-full h-full object-cover"
                                    src={product.image[0]}
                                    alt={product.name}
                                />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">
                                    {product.name}
                                </p>
                                <div className="font-normal text-gray-500/70">
                                    <p>
                                        Size:{" "}
                                        <span>{product.size || "N/A"}</span>
                                    </p>
                                    <div className="flex items-center">
                                        <p>Qty:</p>
                                        <select className="outline-none">
                                            {Array(5)
                                                .fill("")
                                                .map((_, index) => (
                                                    <option
                                                        key={index}
                                                        value={index + 1}
                                                    >
                                                        {index + 1}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">
                            ${product.offerPrice * product.quantity}
                        </p>
                        <button className="cursor-pointer mx-auto">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                    stroke="#FF532E"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => navigate("/products")}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-emerald-500 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">
                    Order Summary
                </h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">
                        Delivery Address
                    </p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p>
                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-emerald-500 hover:underline cursor-pointer"
                        >
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p
                                    onClick={() => setShowAddress(false)}
                                    className="text-gray-500 p-2 hover:bg-gray-100"
                                >
                                    New York, USA
                                </p>
                                <p
                                    onClick={() => setShowAddress(false)}
                                    className="text-emerald-500 text-center cursor-pointer p-2 hover:bg-emerald-500/10"
                                >
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">
                        Payment Method
                    </p>

                    <SelectOption
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        options={paymentMethodOptions}
                        selectClassName="w-full bg-white mt-2"
                    />
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>$20</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span>
                        <span>$20</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
