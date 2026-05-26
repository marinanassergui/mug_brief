import React, { useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";

// Helper to mask Brazilian phone numbers: (XX) XXXXX-XXXX
export function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "onBlur" | "onChange"> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  maskType?: "whatsapp" | "none";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, registration, maskType = "none", className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Sync input ref with react-hook-form and local ref
    const { ref: regRef, onChange: regOnChange, onBlur: regOnBlur, name } = registration;

    // Use RHF FormContext to watch changes programmatically (e.g. pre-fills and draft restores)
    const formContext = useFormContext();
    const watchedValue = formContext ? formContext.watch(name) : undefined;

    useEffect(() => {
      if (inputRef.current) {
        setValue(inputRef.current.value || "");
      }
    }, [watchedValue]);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      regOnBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value;
      if (maskType === "whatsapp") {
        rawValue = formatWhatsApp(rawValue);
        e.target.value = rawValue;
      }
      setValue(rawValue);
      regOnChange(e);
    };

    // Float if focused, has local value, OR has RHF watched value
    const hasRHFValue = watchedValue !== undefined && watchedValue !== null && watchedValue !== "";
    const hasContent = value.length > 0 || hasRHFValue;
    const isFloating = isFocused || hasContent;

    return (
      <div className={`relative w-full flex flex-col pt-5 ${className}`}>
        <div
          className={`relative border-b transition-colors duration-200 ${
            error
              ? "border-red-600 border-b-[1.5px]"
              : isFocused
              ? "border-black"
              : "border-black/30"
          }`}
        >
          <input
            {...props}
            name={name}
            id={name}
            autoComplete="off"
            ref={(node) => {
              inputRef.current = node;
              if (typeof regRef === "function") regRef(node);
              else if (regRef) (regRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-required={props.required || props["aria-required"]}
            className="w-full pb-2 text-[18px] font-medium font-sans text-foreground-primary bg-transparent border-none outline-none placeholder-transparent select-text"
            placeholder={label}
          />
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
        </div>
        {error && (
          <span
            id={`${name}-error`}
            className="mt-2 text-[12px] font-medium font-sans text-red-600 block select-none"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
