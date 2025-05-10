import { ChevronDown } from "lucide-react";

const SelectOption = ({
    id,
    label,
    value,
    onChange,
    options = [],
    placeholder,
    containerClassName = "",
    labelClassName = "",
    selectClassName = "",
    disabled = false,
    required = false,
}) => {
    return (
        <div className={`flex flex-col ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            {/* <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${selectClassName}`}
            >
                {placeholder && (
                    <option value="" disabled={required}>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}
            <div className="relative w-full">
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`appearance-none w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${selectClassName}`}
                >
                    {placeholder && (
                        <option value="" disabled={required}>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute top-5 right-2 flex items-center text-gray-700">
                    <ChevronDown
                        size={18}
                        className={disabled ? "text-gray-400" : ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectOption;
