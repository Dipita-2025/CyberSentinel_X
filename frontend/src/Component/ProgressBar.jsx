function ProgressBar({
  value = 0,
  color = "var(--accent)",
  className = "",
  label = "Progress",
}) {
  const progress = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className={`w-full h-3 overflow-hidden rounded-full bg-(--border) ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-300 }`}
        style={{ width: `${value}%`, backgroundColor: `${color}` }}
      />
    </div>
  );
}

export default ProgressBar;
