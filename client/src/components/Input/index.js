import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  className = "",
  inputClassName = "",
  placeholder = "",
  onChange,
  value,
  onBlur,
  errors,
}) => {
  return (
    <div className={`w-1/2 ${className}`}>
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500 dark:focus:border-blue-500 !${inputClassName}`}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {errors ? (
        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
