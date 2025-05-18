import { useRef } from "react";
import { categories } from "../assets/images/assets";
import { useAppContext } from "../contexts/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = () => {
    const { navigate } = useAppContext();
    const scrollContainerRef = useRef(null);

    const scroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-bold">Categories</p>
            <div className="relative mt-6">
                <button
                    onClick={() => scroll(-200)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition hidden sm:block cursor-pointer"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 md:space-x-6 py-2 scroll-smooth no-scrollbar" // Added flex, overflow, spacing, padding, smooth scroll, hide scrollbar
                >
                    {categories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center flex-shrink-0 w-36 sm:w-40 md:w-44"
                                style={{ background: category.bgColor }}
                                onClick={() => {
                                    navigate(
                                        `/products/${category.path.toLowerCase()}`
                                    );
                                }}
                            >
                                <img
                                    src={category.image}
                                    alt={category.text}
                                    className="group-hover:scale-110 transition duration-300 ease-in-out max-w-28"
                                />
                                <p className="text-sm font-medium">
                                    {category.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => scroll(200)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition hidden sm:block cursor-pointer">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default Categories;
