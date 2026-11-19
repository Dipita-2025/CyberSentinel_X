import { useEffect, useState } from "react";

import {
  DashboardStats,
  AccessActivityChart,
  DecisionDistribution,
} from "../../features/analytics/components";

import { analyticsService } from "../../services";

import { getAccessActivity, getDecisionDistribution } from "../../utils";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalRoles: 0,
    totalRequests: 0,
  });

  const [activityData, setActivityData] = useState([]);
  const [decisionData, setDecisionData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Stats API error:", err);
        setError("Failed to load dashboard statistics.");
      }
    };

    const fetchCharts = async () => {
      try {
        const logs = await analyticsService.getAccessLogs();

        setActivityData(getAccessActivity(logs));
        setDecisionData(getDecisionDistribution(logs));
      } catch (err) {
        console.error("Charts API error:", err);
      }
    };

    fetchStats();
    fetchCharts();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Statistics cards */}
      <DashboardStats stats={stats} />

      {error && <p className="text-body text-blocked">{error}</p>}

      {/* Analytics charts */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AccessActivityChart data={activityData} />
        <DecisionDistribution data={decisionData} />
      </section>
    </div>
  );
};

export default AdminOverview;
