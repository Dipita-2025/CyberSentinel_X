import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const Textarea = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      placeholder,
      rows = 4,
      error,
      disabled = false,
      required = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id || name}
            className="block text-sm font-medium text-primary-text"
          >
            {label}
            {required && <span className="ml-1 text-blocked">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={props.id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`
            w-full resize-y rounded-lg border bg-elevated
            px-4 py-3 text-sm text-primary-text
            placeholder:text-text-muted outline-none transition-colors
            focus:border-accent focus:ring-2 focus:ring-accent/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-blocked" : "border-border"}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p
            id={`${name}-error`}
            className="flex items-center gap-2 text-xs text-blocked"
          >
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
