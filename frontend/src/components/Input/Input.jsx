import React, { useEffect, useState } from "react";

function Input({
  name = "Email",
  type = "text",
  classname = "",
  onInputChange,
  Icon,
  Element,
}) {
  return (
    <div className="">
      {/* label */}
      <label
        className="text-xs text-(--text-sec) font-semibold  block px-1"
        htmlFor={name}
      >
        {name}
      </label>

      {/* input box */}
      <div
        className={`border border-(--border) bg-(--bg-sec) rounded-md h-10 w-full  px-2 gap-2 flex items-center justify-center `}
      >
        {/* input icon */}
        {Icon && <Icon strokeWidth={2} className="text-(--text-sec)" />}

        {/* input feild */}
        <input
          placeholder={name}
          type={type}
          onChange={onInputChange}
          autoComplete="off"
          className="w-full outline-0 border-0 text-sm p-0 focus:outline-0  placeholder:text-(--text-sec) placeholder:text-xs "
          name={name}
        />

        {/* any extra element (like password show button) */}
        {Element}
      </div>
    </div>
  );
}

export default Input;
