import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || name;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full min-w-0 space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary-text"
          >
            {label}
            {required && <span className="ml-1 text-blocked">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full min-w-0 rounded-lg border
            bg-sidebar px-3 py-2
            text-sm text-primary-text
            placeholder:text-muted
            outline-none transition-colors duration-200
            focus:border-accent
            disabled:cursor-not-allowed disabled:opacity-60
            ${error ? "border-blocked" : "border-border"}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-start gap-2 text-caption text-blocked"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
