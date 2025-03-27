"use client";

import { FC, ReactNode } from "react";

interface NormalInputProps {
  icon: ReactNode;
  type?: string;
  placeholder?: string;
  value?: string | number; // ✅ Make 'value' optional
  defaultValue?: string | number; // ✅ Make 'defaultValue' optional
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // ✅ Make 'onChange' optional
  disabled?: boolean;
  label?: string;
  max?: number;
  name?: string; // ✅ Make 'name' optional
}

const NormalInput: FC<NormalInputProps> = ({
  icon,
  type = "text",
  placeholder = "",
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  label,
  max,
}) => {
  return (
    <div className="flex flex-col w-full gap-y-2 font-inter">
      {label && (
        <label
          htmlFor={name}
          className="font-semibold text-sm 2xl:text-[12px] mb-1"
        >
          {label}
        </label>
      )}
      <div className="group flex items-center py-3 px-3 border gap-x-4 border-gray-600 border-opacity-20 rounded-md transition-all duration-300 hover:border-opacity-80 focus-within:border-opacity-80 hover:shadow-md focus-within:shadow-md">
        <div className="text-gray-700">{icon}</div>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={max}
          className="placeholder:!text-normal placeholder:text-opacity-10 outline-none bg-transparent border-none w-full text-sm 2xl:text-[13px] disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default NormalInput;
