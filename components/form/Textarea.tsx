import React, { useState, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "onBlur" | "onChange"> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, registration, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const { ref: regRef, onChange: regOnChange, onBlur: regOnBlur, name } = registration;

    useEffect(() => {
      if (textareaRef.current) {
        setValue(textareaRef.current.value || "");
      }
    }, []);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      regOnBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      regOnChange(e);
    };

    const hasContent = value.length > 0;
    const isFloating = isFocused || hasContent;

    return (
      <div className={`relative w-full flex flex-col pt-5 ${className}`}>
        <div
          className={`relative border-b transition-colors duration-200 ${
            error
              ? "border-black border-b-[1.5px]"
              : isFocused
              ? "border-black"
              : "border-black/30"
          }`}
        >
          <textarea
            {...props}
            name={name}
            id={name}
            ref={(node) => {
              textareaRef.current = node;
              if (typeof regRef === "function") regRef(node);
              else if (regRef) (regRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-required={props.required || props["aria-required"]}
            className="w-full h-32 pt-2 pb-2 text-[18px] font-medium font-sans text-foreground-primary bg-transparent border-none outline-none resize-none select-text"
            placeholder={label}
          />
          <label
            htmlFor={name}
            className={`absolute left-0 cursor-text select-none transition-all duration-200 ease-out pointer-events-none font-sans ${
              isFloating
                ? "-top-3.5 text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-primary opacity-100"
                : "top-2 text-[18px] font-medium text-foreground-tertiary opacity-50"
            }`}
          >
            {label}
          </label>
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

Textarea.displayName = "Textarea";
