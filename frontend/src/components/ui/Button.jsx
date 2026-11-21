import { LoaderCircle } from "lucide-react";

const VARIANTS = {
  primary:
    "border border-accent bg-accent text-(--button-text)! hover:opacity-90",

  secondary:
    "border border-accent-light! bg-elevated text-primary-text hover:border-accent",

  outline:
    "border-2 border-accent! bg-transparent text-(--accent)! hover:border-accent hover:bg-elevated",

  ghost:
    "border border-transparent bg-transparent text-muted hover:bg-elevated hover:text-primary-text",

  danger:
    "border border-blocked bg-(--blocked) text-primary-text hover:opacity-90",
};

const SIZES = {
  sm: "px-3 py-2 text-caption",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  display = "",
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        inline-flex min-w-0 items-center justify-center
        gap-2 p-2! rounded-lg font-medium
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-accent-light
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        disabled:cursor-not-allowed disabled:opacity-50
        ${VARIANTS[variant] || VARIANTS.primary}
        ${SIZES[size] || SIZES.md}
        ${className}
      `}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="shrink-0 animate-spin" />}

      <span className="inline-flex items-center justify-center gap-2 font-semibold text-inherit">
        {children}
      </span>
    </button>
  );
};

export default Button;
