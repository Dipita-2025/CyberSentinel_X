import { TrendingDown, TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}) => {
  const isPositive = trend === "up";

  return (
    <div className="card-base min-w-0 p-4 ">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body text-muted">{title}</p>

          <h3 className="mt-3 text-2xl font-semibold text-primary-text">
            {value ?? "—"}
          </h3>
        </div>

        {Icon && (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-light/10 text-accent">
            <Icon size={21} className="text-accent-light" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {trendValue && (
          <span
            className={`inline-flex items-center gap-1 text-caption font-medium ${
              isPositive ? "text-allow" : "text-blocked"
            }`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </span>
        )}

        {description && (
          <span className="text-caption text-muted">{description}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
