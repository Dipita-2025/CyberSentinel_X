const variants = {
  allow: "bg-allow/10 text-allow border-allow/20",
  review: "bg-review/10 text-review border-review/20",
  block: "bg-blocked/10 text-blocked border-blocked/20",
  active: "bg-allow/10 text-allow border-allow/20",
  inactive: "bg-elevated text-text-muted border-border",
  pending: "bg-review/10 text-review border-review/20",
  default: "bg-elevated text-text-muted border-border",
};

const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={`
        inline-flex items-center rounded-full border
        px-2.5 py-1 text-xs font-medium
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
