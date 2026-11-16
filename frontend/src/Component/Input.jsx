function Input({
  name = "Email",
  id = name,
  type = "text",
  value,
  autoComplete = "off",
  className = "",
  labelClassName = "",
  inputClassName = "",
  onInputChange,
  Icon,
  Element,
}) {
  return (
    <>
      {/* label */}
      <label
        className={`text-body text-(--text-sec) font-semibold block px-1 mb-2 ${labelClassName}`}
        htmlFor={id}
      >
        {name}
      </label>

      {/* input box */}
      <div
        className={`border border-(--border) bg-[#111B2E] rounded-md h-45 w-full  px-8 gap-8 flex items-center justify-center ${className.trim()}`}
      >
        {/* input icon */}
        {Icon && <Icon strokeWidth={2} className="text-(--text-sec)" />}

        {/* input feild */}
        <input
          placeholder={name}
          type={type}
          onChange={onInputChange}
          autoComplete={autoComplete}
          className={`w-full outline-0 text-body border-0 p-0 focus:outline-0 placeholder:text-(--text-mute) placeholder:text-body ${inputClassName}`}
          name={name}
          id={id}
          value={value}
        />

        {/* any extra element (like password show button) */}
        {Element}
      </div>
    </>
  );
}

export default Input;
