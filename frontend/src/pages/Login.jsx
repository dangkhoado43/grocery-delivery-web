import React, { useState } from "react";
import { assets } from "../assets/images/assets";
import { Lock, Mail } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

const Login = () => {
    const { setUser, navigate } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUser({ email: "admin@gmail.com", name: "Admin", password });
        navigate("/");
    };

    return (
        <div className="flex h-[700px] w-full mt-12">
            <div className="w-full hidden md:inline-block">
                <img
                    className="h-full"
                    src={assets.login_image}
                    alt="Login Image"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                >
                    <h2 className="text-4xl text-gray-900 font-medium">
                        Sign In
                    </h2>
                    <p className="text-sm text-gray-500/90 mt-3">
                        Welcome back! Please sign in to continue
                    </p>

                    <button
                        type="button"
                        className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full cursor-pointer"
                    >
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                            alt="googleLogo"
                        />
                    </button>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">
                            or sign in with email
                        </p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Mail width={16} />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Lock width={16} />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input
                                className="h-5 cursor-pointer"
                                type="checkbox"
                                id="remember"
                            />
                            <label
                                className="text-sm cursor-pointer"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>
                        </div>
                        <a className="text-sm underline" href="#">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-full text-white bg-emerald-500 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Login
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">
                        Don’t have an account?{" "}
                        <a
                            className="text-emerald-500 hover:underline"
                            href="/register"
                        >
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
