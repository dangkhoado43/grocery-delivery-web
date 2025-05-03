import React, { useState } from "react";
import { assets } from "../assets/images/assets";
import { Lock, Mail, User } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

const Register = () => {
    const { setUser } = useAppContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUser({ name, email, password });
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
                        Sign Up
                    </h2>
                    <p className="text-sm text-gray-500/90 mt-3">
                        Welcome back! Choose your preferred sign-up method
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
                            or register with email
                        </p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User width={16} />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-3 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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

                    <div className="flex items-center mt-3 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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

                    <div className="flex items-center mt-3 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <Lock width={16} />
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            placeholder="Confirm Password"
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
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-full text-white bg-emerald-500 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Register
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">
                        Already have an account?{" "}
                        <a
                            className="text-emerald-500 hover:underline"
                            href="/login"
                        >
                            Sign in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
