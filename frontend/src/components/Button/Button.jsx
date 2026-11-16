import React, { useState } from "react";
import { icons, LoaderCircle } from "lucide-react";

function Button({
  label = "button",
  onClickFunction,
  className = "",
  Icon,
  iconSize = 20,
}) {
  const [processing, setProcessing] = useState(false);
  const handleClick = async (event) => {
    setProcessing(true);
    try {
      await onClickFunction?.(event);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button
      disabled={processing}
      aria-busy={processing}
      key={label}
      className={`h-10 bg-(--button) text-base text-(--text)  rounded-md border-2 border-(--border) outline-0 flex justify-center items-center p-2 ${className}`}
      onClick={handleClick}
    >
      {processing ? (
        // processing text
        <span className="inline-flex min-w-0 items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span className="truncate block ">Processing</span>
        </span>
      ) : (
        // default texts
        <div className=" h-full flex gap-2 justify-center items-center text-nowrap leading-none">
          <p className="text-md font-medium leading-none">{label}</p>
          {Icon && <Icon size={iconSize} strokeWidth={3} />}
        </div>
      )}
    </button>
  );
}

export default Button;
