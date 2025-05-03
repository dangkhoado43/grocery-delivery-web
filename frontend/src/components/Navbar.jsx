import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser, navigate } = useAppContext();

    const handleLogout = async () => {
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className="hover:text-emerald-500">
                    Home
                </NavLink>
                <NavLink to="/products" className="hover:text-emerald-500">
                    Products
                </NavLink>
                <NavLink to="/" className="hover:text-emerald-500">
                    Contact
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <Search />
                </div>

                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <ShoppingCart />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-emerald-500 w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>

                {user ? (
                    <div className="relative group">
                        <img
                            src={assets.profile_icon}
                            className="w-10"
                            alt="avatar"
                        />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-3 w-30 rounded-md text-sm z-40">
                            <li
                                onClick={() => navigate("/my-orders")}
                                className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer"
                            >
                                My Orders
                            </li>
                            <li
                                onClick={() => handleLogout()}
                                className="p-1.5 pl-3 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="cursor-pointer px-8 py-2 bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-full"
                    >
                        Login
                    </button>
                )}
            </div>

            <button
                onClick={() => (open ? setOpen(false) : setOpen(true))}
                aria-label="Menu"
                className="sm:hidden cursor-pointer"
            >
                <Menu />
            </button>

            <div
                className={`${
                    open ? "flex" : "hidden"
                } absolute z-50 top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-3 px-5 text-sm md:hidden`}
            >
                {user ? (
                    <>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                src={assets.profile_icon}
                                className="w-8"
                                alt="avatar"
                            />
                            <p>User</p>
                        </div>
                    </>
                ) : (
                    <></>
                )}
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
                    <>
                        <button
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/login");
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-emerald-500 hover:bg-emerald-600 transition text-white rounded-full text-sm"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
