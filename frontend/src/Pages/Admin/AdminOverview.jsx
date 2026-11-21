import { useEffect, useState } from "react";

import { analyticsService } from "../../services";

import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

import {
  DashboardStats,
  AccessActivityChart,
  DecisionDistribution,
  RecentAccessActivity,
} from "../../features/analytics/components";

import { getAccessActivity, getDecisionDistribution } from "../../utils";

const AdminOverview = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalRoles: 0,
    totalRequests: 0,
  });

  const [logs, setLogs] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [decisionData, setDecisionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await analyticsService.getDashboardData();

        setStats(data.stats);
        setActivityData(getAccessActivity(data.logs));
        setDecisionData(getDecisionDistribution(data.logs));
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail || "Failed to load dashboard data.";

        setError(errorMessage);

        dispatch(
          showNotification({
            message: errorMessage,
            type: "error",
          }),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {error && <p className="text-body text-blocked">{error}</p>}

      <DashboardStats stats={stats} loading={loading} />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AccessActivityChart data={activityData} loading={loading} />
        <DecisionDistribution data={decisionData} loading={loading} />
      </section>

      <RecentAccessActivity logs={logs} loading={loading} />
    </div>
  );
};

export default AdminOverview;
