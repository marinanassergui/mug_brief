import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  error?: string;
  registration: UseFormRegisterReturn;
  value?: string;
}

export function RadioGroup({ label, options, error, registration, value }: RadioGroupProps) {
  const { name, onChange, onBlur, ref } = registration;

  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary select-none">
        {label}
      </span>
      <div className="flex flex-col gap-2 w-full">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <label
              key={option.value}
              className={`border p-4 transition-all duration-200 cursor-pointer flex items-center justify-between font-sans ${
                isSelected
                  ? "bg-foreground-primary border-foreground-primary text-white"
                  : "border-black/20 bg-transparent text-foreground-secondary hover:border-black hover:text-foreground-primary"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                className="sr-only"
              />
              <span className="text-[15px] font-medium select-none">{option.label}</span>
              <span className="text-[14px] font-mono tracking-normal select-none">
                {isSelected ? "[X]" : "[ ]"}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <span className="text-[12px] font-medium font-sans text-red-600 block select-none">
          {error}
        </span>
      )}
    </div>
  );
}
