function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <header
      className={`flex flex-wrap items-end justify-between gap-12 ${className}`}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-caption font-semibold uppercase tracking-wide text-(--accent-light)">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-8 text-head-page font-semibold text-(--text)">
          {title}
        </h1>
        {description && (
          <p className="mt-8 text-body text-(--text-muted)">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}

export default PageHeader;
