import { Activity, CircleCheckBig, ShieldAlert } from "lucide-react";
import ProgressBar from "../../../Component/ProgressBar";

const indicators = [
  { label: "Threats detected", value: "14", Icon: ShieldAlert },
  { label: "Pending reviews", value: "12", Icon: Activity },
  { label: "Resolved today", value: "38", Icon: CircleCheckBig },
];

function SecuritySummary() {
  return (
    <section className="rounded-lg border border-(--border) bg-(--sidebar) p-16">
      <div className="flex items-start justify-between gap-12">
        <div>
          <h2 className="text-head-sec font-semibold text-(--text)">
            Security Summary
          </h2>
          <p className="mt-6 text-caption text-(--text-muted)">
            Current system posture · Sample data
          </p>
        </div>
        <span className="inline-flex items-center gap-6 rounded-full bg-(--allow)/10 px-10 py-6 text-caption font-medium text-(--allow)">
          <span className="size-6 rounded-full bg-(--allow)" />
          Monitoring
        </span>
      </div>

      <div className="mt-20 rounded-md border border-(--border) bg-(--card) p-16">
        <div className="mb-10 flex items-end justify-between gap-12">
          <div>
            <p className="text-caption text-(--text-muted)">Overall risk score</p>
            <p className="mt-6 text-head-page font-semibold text-(--text)">
              24
              <span className="ml-4 text-body font-normal text-(--text-muted)">
                / 100
              </span>
            </p>
          </div>
          <span className="rounded-full bg-(--allow)/10 px-10 py-6 text-caption font-medium text-(--allow)">
            Low risk
          </span>
        </div>
        <ProgressBar
          value={24}
          color="var(--allow)"
          label="Overall risk score, 24 out of 100"
        />
      </div>

      <ul className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
        {indicators.map(({ label, value, Icon }) => (
          <li
            key={label}
            className="flex items-center gap-8 rounded-md bg-(--card) p-12"
          >
            <Icon
              aria-hidden="true"
              className="shrink-0 text-(--text-muted)"
              size={18}
            />
            <div className="min-w-0">
              <p className="text-head-sec font-semibold text-(--text)">
                {value}
              </p>
              <p className="mt-4 text-caption text-(--text-muted)">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecuritySummary;
