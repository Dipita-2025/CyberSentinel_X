import { useCallback, useEffect, useMemo, useState } from "react";

import { Modal, Button } from "../../components/ui";

import { useDispatch } from "react-redux";
import { showNotification } from "../../Store/Slice/notificationSlice";

import {
  ApplicationStats,
  ApplicationFilters,
  ApplicationTable,
  ApplicationForm,
} from "../../features/applications/components";

import { applicationService } from "../../services";
import { Plus } from "lucide-react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const response = await applicationService.getApplications();

      setApplications(response.applications || []);
    } catch (error) {
      dispatch(
        showNotification({
          message:
            error.response?.data?.detail || "Failed to fetch applications.",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Search applications
  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return applications;

    return applications.filter(
      (application) =>
        application.app_name?.toLowerCase().includes(query) ||
        application.description?.toLowerCase().includes(query),
    );
  }, [applications, search]);

  // Create application
  const handleCreateApplication = async (formData) => {
    try {
      setCreating(true);

      await applicationService.createApplication(formData);

      setIsCreateModalOpen(false);

      await fetchApplications();

      dispatch(
        showNotification({
          message: "Application created successfully.",
          type: "success",
        }),
      );
    } catch (error) {
      const detail = error.response?.data?.detail;

      const errorMessage = Array.isArray(detail)
        ? detail.map((item) => item.msg).join(", ")
        : typeof detail === "string"
          ? detail
          : "Failed to create application.";

      dispatch(
        showNotification({
          message: errorMessage,
          type: "error",
        }),
      );
    } finally {
      setCreating(false);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
  };

  return (
    <div className="space-y-6">
      {/* Create Application */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} strokeWidth={3} />
          <span>Add Application</span>
        </Button>
      </div>

      {/* Application Statistics */}
      <ApplicationStats applications={applications} />

      {/* Application Filters */}
      <ApplicationFilters
        search={search}
        onSearchChange={setSearch}
        onClear={handleClearFilters}
      />

      {/* Application Table */}
      <ApplicationTable applications={filteredApplications} loading={loading} />

      {/* Create Application Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Application"
        description="Register a new application on CyberSentinel."
        size="md"
      >
        <ApplicationForm
          onSubmit={handleCreateApplication}
          applications={applications}
          loading={creating}
        />
      </Modal>
    </div>
  );
};

export default Applications;
