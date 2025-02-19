import { IconType } from "react-icons";
import { ReactNode } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Select({
  label,
  placeholder,
  icon,
  options,
  value,
  onChange,
  disabled = false,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-sm">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full p-2 ${
            icon ? "pl-10" : "pl-3"
          } border rounded-md bg-background disabled:opacity-50`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 