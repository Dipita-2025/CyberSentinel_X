import { forwardRef } from "react";
import { Check } from "lucide-react";

const Checkbox = forwardRef(
  (
    {
      label,
      description,
      name,
      checked = false,
      onChange,
      disabled = false,
      error,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`space-y-1 ${className}`}>
        <label
          className={`
            flex items-start gap-3
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          `}
        >
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              ref={ref}
              type="checkbox"
              name={name}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
              {...props}
            />

            <span
              className="
                flex h-5 w-5 items-center justify-center rounded
                border border-border bg-elevated
                transition-colors
                peer-checked:border-accent peer-checked:bg-accent
                peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40
              "
            >
              <Check
                size={14}
                className="text-white opacity-0 peer-checked:opacity-100"
              />
            </span>
          </span>

          <span className="min-w-0">
            {label && (
              <span className="block text-sm font-medium text-primary-text">
                {label}
              </span>
            )}

            {description && (
              <span className="mt-1 block text-xs text-text-muted">
                {description}
              </span>
            )}
          </span>
        </label>

        {error && (
          <p className="text-xs text-blocked" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
