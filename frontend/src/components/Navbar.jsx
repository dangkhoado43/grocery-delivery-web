import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate } = useAppContext();

    const handleLogout = async () => {
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to="/">
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <Search />
                </div>

                <div className="relative cursor-pointer">
                    <ShoppingCart />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>

                {!user ? (
                    <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img
                            src={assets.profile_icon}
                            className="w-10"
                            alt="avatar"
                        />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-3 w-30 rounded-md text-sm z-40">
                            <li className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer">My Orders</li>
                            <li className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <button
                onClick={() => (open ? setOpen(false) : setOpen(true))}
                aria-label="Menu"
                className="sm:hidden"
            >
                <Menu />
            </button>

            <div
                className={`${
                    open ? "flex" : "hidden"
                } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-3 px-5 text-sm md:hidden`}
            >
                <NavLink to="/" onClick={() => setOpen(false)}>
                    Home
                </NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>
                    Products
                </NavLink>
                {user ? (
                    <NavLink to="/my-orders" onClick={() => setOpen(false)}>
                        My Orders
                    </NavLink>
                ) : (
                    <></>
                )}
                <NavLink to="/" onClick={() => setOpen(false)}>
                    Contact
                </NavLink>
                {user ? (
                    <button
                        onClick={() => {
                            setOpen(false);
                            handleLogout();
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
