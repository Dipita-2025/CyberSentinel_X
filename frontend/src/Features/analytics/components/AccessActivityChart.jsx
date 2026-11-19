import { LineChart } from "../../../components/charts";

const AccessActivityChart = ({ data = [] }) => {
  return (
    <section className="card-base min-w-0 p-4 sm:p-5">
      <div className="mb-6">
        <div>
          <h3 className="text-head-sec text-primary-text">
            7-Day Access Activity
          </h3>

          <p className="mt-1 text-caption text-muted">
            Daily application access decisions over the last 7 days
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-body text-muted">
          No access activity data available.
        </div>
      ) : (
        <LineChart data={data} />
      )}
    </section>
  );
};

export default AccessActivityChart;
