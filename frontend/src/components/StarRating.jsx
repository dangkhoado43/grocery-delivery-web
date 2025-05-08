import { Star } from "lucide-react";

const StarRating = ({ rating, starClassName, containerClassName }) => {
    const totalStars = 5;
    const numericRating = parseFloat(rating) || 0;

    return (
        <div
            className={`flex items-center gap-0.5 ${containerClassName || ""}`}
        >
            {Array(totalStars)
                .fill(0)
                .map((_, i) => (
                    <Star
                        key={i}
                        strokeWidth={2}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                            starClassName || ""
                        } ${
                            numericRating > i
                                ? "text-emerald-500 fill-emerald-500"
                                : "text-gray-300 fill-gray-300"
                        }`}
                    />
                ))}
        </div>
    );
};

export default StarRating;
