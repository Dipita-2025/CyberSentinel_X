import { LoaderCircle } from "lucide-react";

const Loader = ({ size = "md", text, fullScreen = false, className = "" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <div
      className={`
        flex items-center justify-center gap-3
        ${fullScreen ? "min-h-screen w-full" : ""}
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className={`animate-spin text-accent ${sizes[size] || sizes.md}`}
      />

      {text && <span className="text-sm text-text-muted">{text}</span>}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
