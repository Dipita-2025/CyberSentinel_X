import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

function Button({
  label = "button",
  onClickFunction,
  className = "",
  contentClassName = "",
  type,
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
      className={`h-45 bg-(--button) text-base text-(--text)  rounded-md  outline-0 flex justify-center items-center py-12 px-16 ${className}`}
      onClick={handleClick}
      type={type}
    >
      {processing ? (
        // processing text
        <span className="inline-flex min-w-0 items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span className="truncate block text-body text-(--button-text) ">
            Processing
          </span>
        </span>
      ) : (
        // default texts
        <div
          className={`h-full flex gap-8 justify-center items-center text-nowrap leading-none ${contentClassName}`}
        >
          <p className="text-body font-medium leading-none text-(--button-text)">
            {label}
          </p>
          {Icon && (
            <Icon
              size={iconSize}
              strokeWidth={3}
              className="text-(--button-text)"
            />
          )}
        </div>
      )}
    </button>
  );
}

export default Button;
