import {
  AccessDecisionChart,
  DecisionTrendChart,
  OverviewStats,
  RecentAccessActivity,
  SecuritySummary,
} from "../../Features/dashboard/components";
import { PageHeader } from "../../Component";

function Dashboard() {
  return (
    <div className="flex flex-col gap-20 p-16 md:p-24">
      <PageHeader
        eyebrow="Security workspace"
        title="Admin Overview"
        description="Monitor access activity and security posture."
        actions={
          <span className="rounded-full border border-(--border) bg-(--sidebar) px-10 py-6 text-caption text-(--text-muted)">
            Static preview
          </span>
        }
      />

      <OverviewStats />

      <DecisionTrendChart />
      <div className="grid grid-cols-1 gap-16 xl:grid-cols-2">
        <AccessDecisionChart />
        <SecuritySummary />
      </div>

      <RecentAccessActivity />
    </div>
  );
}

export default Dashboard;
