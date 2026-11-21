import { LineChart } from "../../../components/charts";

const SecurityActivityChart = ({ data = [], loading = false }) => {
  return (
    <section className="card-base min-w-0 p-4 sm:p-5">
      <div className="mb-6">
        <h3 className="text-head-sec text-primary-text">
          Security Activity Trends
        </h3>

        <p className="mt-1 text-caption text-muted">
          Daily ALLOW, REVIEW, and BLOCK decisions over the last 7 days
        </p>
      </div>

      {loading ? (
        <div className="flex h-72 items-center justify-center text-body text-muted">
          Loading security activity...
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-body text-muted">
          No security activity data available.
        </div>
      ) : (
        <LineChart data={data} />
      )}
    </section>
  );
};

export default SecurityActivityChart;
