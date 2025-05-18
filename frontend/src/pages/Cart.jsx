import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CircleX } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { dummyAddress, paymentMethodOptions } from "../assets/images/assets";
import SelectOption from "../components/SelectOption";

const Cart = () => {
    const {
        currency,
        cartItems,
        updateCartItemQuantity,
        getCartItemCount,
        getCartTotalAmount,
        navigate,
        isLoading,
    } = useAppContext();
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(
        addresses.length > 0 ? addresses[0] : null
    );
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const addressDropdownRef = useRef(null);
    const changeAddressButtonRef = useRef(null);

    useEffect(() => {
        setCartArray(Object.values(cartItems));
    }, [cartItems]);

    const cartSubtotal = getCartTotalAmount();
    const shippingFee = 0;
    const taxRate = 0.02;
    const taxAmount = cartSubtotal * taxRate;
    const totalOrderAmount = cartSubtotal + shippingFee + taxAmount;

    const placeOrder = async () => {};

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showAddressDropdown &&
                addressDropdownRef.current &&
                !addressDropdownRef.current.contains(event.target) &&
                changeAddressButtonRef.current &&
                !changeAddressButtonRef.current.contains(event.target)
            ) {
                setShowAddressDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAddressDropdown]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                <div className="flex flex-col items-center justify-center mt-6">
                    <ClipLoader
                        color={"#10B981"}
                        loading={isLoading}
                        size={30}
                    />
                    <p className="mt-2 text-gray-600">Loading products...</p>
                </div>
                Loading Cart...
            </div>
        );
    }

    if (getCartItemCount() === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 max-w-6xl w-full px-6 mx-auto mt-16 text-center">
                <h1 className="text-3xl font-medium mb-6">
                    Your Shopping Cart is Empty
                </h1>
                <p className="text-gray-600 mb-8">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="group cursor-pointer flex items-center gap-2 text-emerald-500 font-medium bg-emerald-50 hover:bg-emerald-100 px-6 py-3 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 transition group-hover:-translate-x-1" />
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full mx-auto">
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

                {cartArray.map((product) => (
                    <div
                        key={product._id}
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
                                <Link
                                    to={`/products/${product.category.toLowerCase()}/${
                                        product._id
                                    }`}
                                    className="hidden md:block font-semibold hover:underline"
                                >
                                    {product.name}
                                </Link>
                                <div className="font-normal text-gray-500/70">
                                    <p>
                                        Weight:{" "}
                                        <span>{product.weight || "N/A"}</span>
                                    </p>
                                    <div className="flex items-center">
                                        <p>Qty:</p>

                                        <select
                                            className="outline-none border border-gray-300 rounded px-1 py-0.5 ml-1 text-sm"
                                            value={product.quantity}
                                            onChange={(e) =>
                                                updateCartItemQuantity(
                                                    product._id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        >
                                            {Array.from(
                                                { length: 10 },
                                                (_, i) => i + 1
                                            ).map((qty) => (
                                                <option key={qty} value={qty}>
                                                    {qty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-semibold">
                            {currency}
                            {(product.offerPrice * product.quantity).toFixed(2)}
                        </p>
                        <button className="cursor-pointer mx-auto">
                            <CircleX
                                onClick={() =>
                                    updateCartItemQuantity(product._id, 0)
                                }
                                className="w-5 h-5 text-red-500 hover:text-red-600 transition"
                            />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => navigate("/products")}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-emerald-500 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 transition group-hover:-translate-x-1" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 rounded-lg">
                <h2 className="text-xl md:text-xl font-medium">
                    Order Summary
                </h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">
                        Delivery Address
                    </p>
                    <div className="relative flex justify-between items-start mt-2">
                        {selectedAddress ? (
                            <div className="text-gray-600 text-sm pr-2">
                                <p className="font-medium">
                                    {selectedAddress.firstName}{" "}
                                    {selectedAddress.lastName}
                                </p>
                                <p>
                                    {selectedAddress.street},{" "}
                                    {selectedAddress.city}
                                </p>
                                <p>
                                    {selectedAddress.state},{" "}
                                    {selectedAddress.country} -{" "}
                                    {selectedAddress.zipcode}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No address selected.
                            </p>
                        )}
                        <button
                            ref={changeAddressButtonRef}
                            onClick={() =>
                                setShowAddressDropdown(!showAddressDropdown)
                            }
                            className="text-emerald-500 hover:underline cursor-pointer text-sm flex-shrink-0"
                        >
                            Change
                        </button>
                        {showAddressDropdown && (
                            <div
                                ref={addressDropdownRef}
                                className="absolute top-full mt-1 py-1 bg-white border border-gray-300 text-sm w-full z-50 shadow-lg rounded-md"
                            >
                                {addresses.map((addr) => (
                                    <p
                                        key={addr._id}
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setShowAddressDropdown(false);
                                        }}
                                        className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {addr.firstName} {addr.lastName},{" "}
                                        {addr.street}, {addr.city}
                                    </p>
                                ))}
                                {addresses.length === 0 && (
                                    <p className="text-gray-500 p-2 text-center">
                                        No saved addresses.
                                    </p>
                                )}
                                <div className="border-t border-gray-200">
                                    <p
                                        onClick={() => {
                                            // navigate("/addresses");
                                            setShowAddressDropdown(false);
                                        }}
                                        className="text-emerald-500 text-center cursor-pointer p-2 hover:bg-emerald-500/10"
                                    >
                                        Add new address
                                    </p>
                                </div>
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
                        selectClassName="w-full bg-white mt-2 cursor-pointer"
                    />
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>
                            {currency}
                            {cartSubtotal.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">
                            {shippingFee === 0
                                ? "Free"
                                : currency + shippingFee.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax ({taxRate * 100}%)</span>
                        <span>
                            {currency}
                            {taxAmount.toFixed(2)}
                        </span>
                    </p>
                    <p className="flex justify-between text-lg font-medium text-gray-800 mt-3 pt-2 border-t border-gray-300">
                        <span>Total Amount:</span>
                        <span>
                            {currency}
                            {totalOrderAmount.toFixed(2)}
                        </span>
                    </p>
                </div>

                <button
                    onClick={placeOrder}
                    className="w-full py-3 mt-8 cursor-pointer bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition rounded-md"
                >
                    {paymentMethod === "COD"
                        ? "Place Order"
                        : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    );
};

export default Cart;
