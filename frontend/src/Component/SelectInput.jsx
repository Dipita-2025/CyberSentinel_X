function SelectInput({
  id,
  name = id,
  label,
  value = "",
  options = [],
  onChange,
  disabled = false,
  required = false,
  className = "",
  containerClassName = "",
  labelClassName = "",
}) {
  return (
    <div className={`min-w-0 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-8 block text-body font-medium text-(--text-muted) ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(event) => onChange?.(event.target.value)}
        className={`h-45 w-full rounded-md border border-(--border) bg-(--sidebar) px-12 text-body text-(--text) outline-none focus:border-(--accent-light) disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
