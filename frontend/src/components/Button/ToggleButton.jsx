import React from "react";

function ToggleButton({ enable = true, onClickFunction }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enable}
      aria-label="Cognitive SOC Assistant"
      onClick={onClickFunction}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
        enable ? "bg-(--accent)" : "bg-(--border)"
      }`}
    >
      <span
        className={`inline-block size-4 rounded-full bg-(--bg) transition-transform ${
          enable ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default ToggleButton;
