import React, { ChangeEvent } from "react";

interface InputProps {
  value: string | number | undefined;
  type?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  setValue: (e: any) => void;
  error?: string;
}

const Input = ({
  value,
  type,
  label,
  required,
  placeholder,
  disabled,
  setValue,
  error,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <span className="text-xs tracking-wider">{label}</span>
        {required && <span className="text-red-700 font-bold">*</span>}
      </div>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={(e: any) => setValue(e.target.value)}
        className={`${disabled ? "bg-gray-200" : "bg-white"} border ${error ? "border-red-500 text-red-500" : "border-gray-200"}  outline-light-green rounded-md p-1 text-md pl-3 font-50 placeholder:text-sm placeholder:tracking-wider `}
      />

      <div>{error && <p className="text-xs text-red-400">{error}</p>}</div>
    </div>
  );
};

export default Input;
