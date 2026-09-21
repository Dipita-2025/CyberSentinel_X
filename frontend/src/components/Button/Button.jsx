import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

function Button({ label = "button", onClickFunction, className = "" }) {
  const [processing, setProcessing] = useState(true);

  const handleClick = async (event) => {
    setProcessing(true);
    try {
      await onClickFunction?.(event);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-80">
      <button
        disabled={processing}
        aria-busy={processing}
        className={`h-11 bg-(--button) text-(--text) w-full  rounded-md border-0 outline-0 flex justify-center items-center`}
        onClick={handleClick}
      >
        {processing ? (
          <span className="inline-flex min-w-0 items-center justify-center gap-2">
            <LoaderCircle className="animate-spin" />
            <span className="truncate block ">Processing</span>
          </span>
        ) : (
          <span className="">{label}</span>
        )}
      </button>
    </div>
  );
}

export default Button;
