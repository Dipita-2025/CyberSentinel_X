import { Search, X } from "lucide-react";
import { Input, Button } from "../../../components/ui";

const ApplicationFilters = ({ search = "", onSearchChange, onClear }) => {
  const hasFilters = search.trim() !== "";

  return (
    <div className="card-base flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <Input
          name="search"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {hasFilters && (
        <Button size="md" onClick={onClear} className="shrink-0">
          <X size={16} strokeWidth={3} />
          Clear
        </Button>
      )}
    </div>
  );
};

export default ApplicationFilters;
