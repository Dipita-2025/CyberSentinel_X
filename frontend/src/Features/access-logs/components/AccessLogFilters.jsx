import { Search, X } from "lucide-react";
import { Input, Select, Button } from "../../../components/ui";

const AccessLogFilters = ({
  search = "",
  onSearchChange,
  decision = "ALL",
  onDecisionChange,
  onClear,
}) => {
  const hasFilters = search.trim() !== "" || decision !== "ALL";

  return (
    <div className="card-base flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <Input
          name="search"
          placeholder="Search username or device..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="w-full lg:w-48">
        <Select
          name="decision"
          value={decision}
          onChange={onDecisionChange}
          placeholder="Filter decision"
          options={[
            { value: "ALL", label: "All Decisions" },
            { value: "ALLOW", label: "Allowed" },
            { value: "REVIEW", label: "Under Review" },
            { value: "BLOCK", label: "Blocked" },
          ]}
        />
      </div>

      {hasFilters && (
        <Button
          size="md"
          variant="outline"
          onClick={onClear}
          className="shrink-0"
        >
          <X size={16} strokeWidth={3} />
          Clear
        </Button>
      )}
    </div>
  );
};

export default AccessLogFilters;
