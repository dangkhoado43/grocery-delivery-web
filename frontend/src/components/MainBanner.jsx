import { ArrowRight } from "lucide-react";
import { assets } from "../assets/images/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
    return (
        <div className="relative">
            <img
                src={assets.main_banner_bg}
                alt="banner"
                className="w-full hidden md:block"
            />
            <img
                src={assets.main_banner_bg_sm}
                alt="banner"
                className="w-full md:hidden"
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
                    Freshness You Can Trust, Savings You will Love!
                </h1>
                <div className="flex items-center mt-6 font-medium gap-2">
                    <Link
                        to="/products"
                        className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-emerald-500 hover:bg-emerald-600 transition rounded text-white cursor-pointer"
                    >
                        Shop Now
                        <ArrowRight className="md:hidden w-5 h-5 transition group-focus:translate-x-1" />
                    </Link>

                    <Link
                        to="/products"
                        className="group hidden md:flex items-center gap-2 px-9 py-3 transition cursor-pointer"
                    >
                        Explore deals
                        <ArrowRight className="w-5 h-5 transition group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
