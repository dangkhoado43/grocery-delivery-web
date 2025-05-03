import React from "react";
import { assets, features } from "../assets/images/assets";

const BottomBanner = () => {
    return (
        <div className="relative mt-24">
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full md:h-80 lg:h-auto hidden md:block"
            />
            <img
                src={assets.bottom_banner_image_sm}
                alt="banner"
                className="w-full md:hidden"
            />

            <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-8 lg:pr-24">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-semibold text-emerald-500 mb-6">
                        Why We Are The Best?
                    </h1>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 mt-2"
                        >
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-9 lg:w-11"
                            />
                            <div>
                                <h3 className="text-lg lg:text-xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500/70 text-xs lg:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BottomBanner;
