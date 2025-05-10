const Input = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    error, // Pass error message as a string
    className = "",
    containerClassName = "",
    labelClassName = "",
    leftIcon,
    rightIcon,
    ...props // Allow passing other native input props
}) => {
    const baseInputClasses =
        "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1";
    const normalBorderClasses = "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500";
    const errorBorderClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

    return (
        <div className={`flex flex-col ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative flex items-center">
                {leftIcon && (
                    <span className="absolute left-3 text-gray-400">
                        {leftIcon}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
                        ${baseInputClasses}
                        ${error ? errorBorderClasses : normalBorderClasses}
                        ${leftIcon ? "pl-10" : ""}
                        ${rightIcon ? "pr-10" : ""}
                        ${className}
                    `}
                    {...props}
                />
                {rightIcon && (
                    <span className="absolute right-3 text-gray-400">{rightIcon}</span>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default Input;