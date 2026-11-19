const Card = ({
  children,
  title,
  description,
  action,
  padding = "md",
  className = "",
}) => {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <section
      className={`
        rounded-xl border border-border bg-card
        ${paddingStyles[padding] || paddingStyles.md}
        ${className}
      `}
    >
      {(title || description || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-primary-text">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
};

export default Card;
