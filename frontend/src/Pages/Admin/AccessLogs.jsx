import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { showNotification } from "../../Store/Slice/notificationSlice";
import { logService } from "../../services";

import {
  AccessLogStats,
  AccessLogFilters,
  AccessLogTable,
} from "../../features/access-logs/components";

const AccessLogs = () => {
  const dispatch = useDispatch();

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [decision, setDecision] = useState("ALL");
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
            error.response?.data?.detail || "Failed to fetch access logs.",
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

  // Filter access logs
  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !query ||
        log.username?.toLowerCase().includes(query) ||
        log.device?.toLowerCase().includes(query);

      const matchesDecision = decision === "ALL" || log.decision === decision;

      return matchesSearch && matchesDecision;
    });
  }, [logs, search, decision]);

  // Clear filters
  const handleClearFilters = () => {
    setSearch("");
    setDecision("ALL");
  };

  return (
    <div className="space-y-6">
      <AccessLogStats logs={logs} />

      <AccessLogFilters
        search={search}
        onSearchChange={setSearch}
        decision={decision}
        onDecisionChange={setDecision}
        onClear={handleClearFilters}
      />

      <AccessLogTable logs={filteredLogs} loading={loading} />
    </div>
  );
};

export default AccessLogs;
