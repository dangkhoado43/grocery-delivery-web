import React from "react";
import { Loader2 } from "lucide-react"; // Icon for loading state

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary", // 'primary', 'secondary', 'outline', 'ghost', 'link'
    size = "md", // 'sm', 'md', 'lg'
    isLoading = false,
    disabled = false,
    className = "",
    leftIcon,
    rightIcon,
    ...props // Allow passing other native button props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";

    const variantStyles = {
        primary:
            "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        outline:
            "border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 focus:ring-emerald-500",
        ghost: "text-emerald-500 hover:bg-emerald-500/10 focus:ring-emerald-500",
        link: "text-emerald-500 hover:underline focus:ring-emerald-500 p-0", // No padding for link-like buttons
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed";

    const combinedClassName = `
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled || isLoading ? disabledStyles : ""}
        ${className}
    `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={combinedClassName.trim()}
            {...props}
        >
            {isLoading && (
                <Loader2
                    className={`animate-spin ${
                        leftIcon || children ? "mr-2" : ""
                    }`}
                    size={size === "sm" ? 14 : size === "lg" ? 20 : 18}
                />
            )}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && (
                <span className="ml-2">{rightIcon}</span>
            )}
        </button>
    );
};

export default Button;