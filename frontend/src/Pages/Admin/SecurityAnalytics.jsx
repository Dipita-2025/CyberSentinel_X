import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "../../components/ui";

import { showNotification } from "../../Store/Slice/notificationSlice";
import { logService } from "../../services";

import { RefreshCw } from "lucide-react";

import { RecentAccessActivity } from "../../features/analytics/components";

import {
  SecurityAnalyticsStats,
  SecurityActivityChart,
  RiskDistributionChart,
  TrustScoreChart,
} from "../../features/security-analytics/components";

const SecurityAnalytics = () => {
  const dispatch = useDispatch();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch access logs
  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);

      const response = await logService.getLogs();

      setLogs(response.logs || []);
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail ||
            "Failed to load security analytics.",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Calculate security statistics
  const stats = useMemo(
    () => ({
      totalRequests: logs.length,
      allowed: logs.filter((log) => log.decision === "ALLOW").length,
      review: logs.filter((log) => log.decision === "REVIEW").length,
      blocked: logs.filter((log) => log.decision === "BLOCK").length,
    }),
    [logs],
  );

  // Prepare last 7 days of access activity
  const activityData = useMemo(() => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      days.push({
        key,
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        allowed: 0,
        review: 0,
        blocked: 0,
      });
    }

    const dayMap = new Map(days.map((day) => [day.key, day]));

    logs.forEach((log) => {
      if (!log.created_at) return;

      const date = new Date(log.created_at);

      if (Number.isNaN(date.getTime())) return;

      const key = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      const day = dayMap.get(key);

      if (!day) return;

      if (log.decision === "ALLOW") day.allowed++;
      if (log.decision === "REVIEW") day.review++;
      if (log.decision === "BLOCK") day.blocked++;
    });

    return days.map(({ key, ...day }) => day);
  }, [logs]);

  // Prepare ML risk distribution
  const riskData = useMemo(() => {
    const attack = logs.filter((log) => Number(log.ml_risk) >= 50).length;

    const benign = logs.filter((log) => Number(log.ml_risk) < 50).length;

    return [
      { name: "ATTACK", value: attack },
      { name: "BENIGN", value: benign },
    ];
  }, [logs]);

  // Prepare trust score distribution
  const trustData = useMemo(() => {
    return [
      {
        name: "HIGH",
        value: logs.filter((log) => Number(log.trust_score) >= 80).length,
      },
      {
        name: "MEDIUM",
        value: logs.filter(
          (log) =>
            Number(log.trust_score) >= 50 && Number(log.trust_score) < 80,
        ).length,
      },
      {
        name: "LOW",
        value: logs.filter((log) => Number(log.trust_score) < 50).length,
      },
    ];
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="flex gap-3  sm:items-center justify-end">
        <Button
          size="md"
          onClick={fetchLogs}
          loading={loading}
          disabled={loading}
          className="px-4!"
        >
          <RefreshCw size={16} />
          Refresh
        </Button>
      </div>

      <SecurityAnalyticsStats stats={stats} loading={loading} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 ">
        <SecurityActivityChart data={activityData} loading={loading} />

        <RiskDistributionChart data={riskData} loading={loading} />
      </div>
      <TrustScoreChart data={trustData} loading={loading} />
      <RecentAccessActivity logs={logs} loading={loading} />
    </div>
  );
};

export default SecurityAnalytics;
