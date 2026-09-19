import React, { useEffect, useState } from "react";

function Input({ name = "Email", type = "text", classname = "", Icon }) {
  return (
    <div className="">
      <label
        className="text-sm text-(--text-sec) font-semibold mb-1 block px-1"
        htmlFor={name}
      >
        {name}
      </label>
      <div
        className={`border-2 border-(--border) bg-(--accent-bg) rounded-md h-10 w-80 px-2 gap-2 flex items-center justify-center `}
      >
        {Icon && <Icon strokeWidth={2} className="text-(--text-sec)" />}
        <input
          placeholder={name}
          type={type}
          autoComplete="off"
          className="w-full outline-0 border-0 text-sm p-0 focus:outline-0  placeholder:text-(--text-sec)  "
          name={name}
        />
      </div>
    </div>
  );
}

export default Input;
