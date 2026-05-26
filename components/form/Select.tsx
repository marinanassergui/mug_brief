import React, { useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "onBlur" | "onChange"> {
  label: string;
  options: SelectOption[];
  error?: string;
  registration: UseFormRegisterReturn;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, registration, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const selectRef = useRef<HTMLSelectElement | null>(null);

    const { ref: regRef, onChange: regOnChange, onBlur: regOnBlur, name } = registration;

    // Use RHF FormContext to watch changes programmatically (e.g. pre-fills and draft restores)
    const formContext = useFormContext();
    const watchedValue = formContext ? formContext.watch(name) : undefined;

    useEffect(() => {
      if (selectRef.current) {
        setValue(selectRef.current.value || "");
      }
    }, [watchedValue]);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      regOnBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      regOnChange(e);
    };

    // Float if focused, has local value, OR has RHF watched value
    const hasRHFValue = watchedValue !== undefined && watchedValue !== null && watchedValue !== "";
    const hasContent = value.length > 0 || hasRHFValue;
    const isFloating = isFocused || hasContent;

    return (
      <div className={`relative w-full flex flex-col pt-5 ${className}`}>
        <div
          className={`relative border-b transition-colors duration-200 flex items-center ${
            error
              ? "border-black border-b-[1.5px]"
              : isFocused
              ? "border-black"
              : "border-black/30"
          }`}
        >
          <select
            {...props}
            name={name}
            id={name}
            ref={(node) => {
              selectRef.current = node;
              if (typeof regRef === "function") regRef(node);
              else if (regRef) (regRef as React.MutableRefObject<HTMLSelectElement | null>).current = node;
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-required={props.required || props["aria-required"]}
            className="w-full pb-2 text-[18px] font-medium font-sans text-foreground-primary bg-transparent border-none outline-none appearance-none cursor-pointer pr-8 select-none"
          >
            <option value="" disabled hidden></option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-black py-2 font-medium">
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor={name}
            className={`absolute left-0 cursor-text select-none transition-all duration-200 ease-out pointer-events-none font-sans ${
              isFloating
                ? "-top-3.5 text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-primary opacity-100"
                : "top-0.5 text-[18px] font-medium text-foreground-tertiary opacity-50"
            }`}
          >
            {label}
          </label>
          <span className="absolute right-0 bottom-2 text-[12px] font-mono pointer-events-none text-foreground-secondary select-none">
            ↓
          </span>
        </div>
        {error && (
          <span
            id={`${name}-error`}
            className="mt-2 text-[12px] font-medium font-sans text-foreground-primary block select-none"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
