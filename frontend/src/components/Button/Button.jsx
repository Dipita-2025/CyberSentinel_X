import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

function Button({ label = "button", onClickFunction, className = "", Icon }) {
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
    <div className="w-full ">
      <button
        disabled={processing}
        aria-busy={processing}
        key={label}
        className={` h-10 bg-(--button) text-base font-semibold text-(--text) w-full min-w-35  rounded-md border-0 outline-0 flex justify-center items-center ${className} p-2`}
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
          <span className="flex gap-2 justify-center items-center text-nowrap">
            {label}
            {Icon && <Icon size={20} strokeWidth={3} />}
          </span>
        )}
      </button>
    </div>
  );
}

export default Button;
