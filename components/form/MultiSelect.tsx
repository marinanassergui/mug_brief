import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: CheckboxOption[];
  error?: string;
  registration: UseFormRegisterReturn;
  values?: string[];
}

export function MultiSelect({ label, options, error, registration, values = [] }: MultiSelectProps) {
  const { name, onChange, onBlur, ref } = registration;

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary select-none">
        {label}
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {options.map((option) => {
          const isChecked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={`border p-4 transition-all duration-200 cursor-pointer flex items-center justify-between font-sans ${
                isChecked
                  ? "bg-foreground-primary border-foreground-primary text-white"
                  : "border-black/20 bg-transparent text-foreground-secondary hover:border-black hover:text-foreground-primary"
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                className="sr-only"
              />
              <span className="text-[14px] font-medium select-none">{option.label}</span>
              <span className="text-[12px] font-mono tracking-normal select-none">
                {isChecked ? "[X]" : "[ ]"}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <span className="text-[12px] font-medium font-sans text-foreground-primary block select-none">
          {error}
        </span>
      )}
    </div>
  );
}
