import { DataTable } from "../../../components/tables";

const RecentAccessActivity = ({ logs = [], loading = false }) => {
  const columns = [
    {
      key: "username",
      label: "Username",
      sortable: true,
    },
    {
      key: "device",
      label: "Device",
      sortable: true,
      render: (value) => value || "Unknown",
    },
    {
      key: "trust_score",
      label: "Trust Score",
      sortable: true,
      render: (value) => (
        <span className="font-medium text-primary-text">
          {value != null ? Number(value).toFixed(2) : "—"}
        </span>
      ),
    },
    {
      key: "decision",
      label: "Decision",
      sortable: true,
      render: (value) => {
        const styles = {
          ALLOW: "bg-allow-bg text-allow",
          REVIEW: "bg-review-bg text-review",
          BLOCK: "bg-blocked-bg text-blocked",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              styles[value] || "bg-elevated text-muted"
            }`}
          >
            {value || "Unknown"}
          </span>
        );
      },
    },
    {
      key: "created_at",
      label: "Timestamp",
      sortable: true,
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
  ];

  return (
    <section className="card-base min-w-0 p-4 sm:p-5">
      <div className="mb-5">
        <h3 className="text-head-sec text-primary-text">
          Recent Access Activity
        </h3>

        <p className="mt-1 text-caption text-muted">
          Latest access attempts across the platform
        </p>
      </div>

      <DataTable
        columns={columns}
        data={logs.slice(0, 10)}
        loading={loading}
        emptyMessage="No access activity recorded yet."
        rowKey="id"
      />
    </section>
  );
};

export default RecentAccessActivity;
