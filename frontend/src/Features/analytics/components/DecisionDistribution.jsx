import { PieChart } from "../../../components/charts";

const DECISION_COLORS = {
  ALLOW: "var(--allow)",
  REVIEW: "var(--review)",
  BLOCK: "var(--blocked)",
};

const DecisionDistribution = ({ data = [], loading = false }) => {
  const chartData = data.map((item) => ({
    ...item,
    color: DECISION_COLORS[item.name] || "var(--text-muted)",
  }));

  const total = chartData.reduce(
    (sum, item) => sum + (Number(item.value) || 0),
    0,
  );

  return (
    <div className="card-base min-w-0 p-4 sm:p-5">
      <div className="mb-5">
        <h3 className="text-head-sec text-primary-text">
          Decision Distribution
        </h3>

        <p className="mt-1 text-caption text-muted">
          Distribution of access decisions
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-body text-muted">
          Loading decision data...
        </div>
      ) : total === 0 ? (
        <div className="flex h-64 items-center justify-center text-body text-muted">
          No decision data available.
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="w-full min-w-0 sm:w-1/2">
            <PieChart data={chartData} total={total} />
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md border border-border bg-sidebar p-5 sm:w-1/2">
            {chartData
              .filter((item) => item.value > 0)
              .map((item) => {
                const percentage = ((item.value / total) * 100).toFixed(1);

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />

                      <span className="text-body font-medium text-primary-text">
                        {item.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-body font-semibold text-primary-text">
                        {item.value.toLocaleString()}
                      </span>

                      <span className="ml-2 text-caption text-muted">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionDistribution;
