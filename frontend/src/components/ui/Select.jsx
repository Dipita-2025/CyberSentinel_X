import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-body font-medium text-primary-text"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none rounded-lg border-2 border-accent bg-card px-4 py-1.5 pr-10 text-body text-primary-text transition-colors focus:border-accent focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? "border-blocked" : ""
          } ${className}`}
        >
          {placeholder && <option value="">{placeholder}</option>}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>

      {error && <p className="mt-1 text-caption text-blocked">{error}</p>}
    </div>
  );
};

export default Select;
