import { useState } from "react";
import { Download, Eye } from "lucide-react";

import { DataTable } from "../../../components/tables";
import { Button, Modal } from "../../../components/ui";

const ApplicationTable = ({ applications = [], loading = false }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const columns = [
    {
      key: "app_id",
      label: "ID",
      sortable: true,
    },
    {
      key: "app_name",
      label: "Application Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
      render: (value) => (
        <span className="block max-w-md truncate">{value || "—"}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, application) => (
        <Button
          size="sm"
          onClick={() => setSelectedApplication(application)}
          className="px-2 sm:px-3"
        >
          <Eye size={18} strokeWidth={2} />
          <span className="hidden lg:inline">View</span>
        </Button>
      ),
    },
  ];

  const handleExport = () => {
    const headers = ["Application ID", "Application Name", "Description"];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = applications.map((app) => [
      app.app_id,
      app.app_name,
      app.description,
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "cybersentinel-applications.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            size="md"
            onClick={handleExport}
            disabled={loading || applications.length === 0}
            display="flex justify-center items-center gap-1"
          >
            <Download size={18} strokeWidth={2} />
            Export CSV
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={applications}
          loading={loading}
          emptyMessage="No applications found."
          rowKey="app_id"
        />
      </div>

      <Modal
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
        title="Application Details"
        description="View registered application information."
        size="md"
      >
        {selectedApplication && (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted">Application ID</p>
              <p className="mt-1 font-medium text-primary-text">
                {selectedApplication.app_id}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Application Name</p>
              <p className="mt-1 font-medium text-primary-text">
                {selectedApplication.app_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Description</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-primary-text">
                {selectedApplication.description || "No description available."}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ApplicationTable;
