import { Layers, FileText, FileWarning } from "lucide-react";
import { StatCard } from "../../../components/ui";

const ApplicationStats = ({ applications = [] }) => {
  const withDescription = applications.filter((app) =>
    app.description?.trim(),
  ).length;

  const withoutDescription = applications.length - withDescription;

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      description: "Registered applications",
      icon: Layers,
    },
    {
      title: "With Description",
      value: withDescription,
      description: "Applications with details",
      icon: FileText,
    },
    {
      title: "Without Description",
      value: withoutDescription,
      description: "Applications missing details",
      icon: FileWarning,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default ApplicationStats;
