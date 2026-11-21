import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Select } from "../ui";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const getVisiblePages = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    start = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-caption text-muted">
        Showing {startIndex + 1} to {endIndex} of {totalItems} records
      </p>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        {/* Page Size */}
        <div className="flex items-center gap-2">
          <span className="text-caption text-muted">Rows:</span>

          <Select
            placeholder=""
            name="pageSize"
            value={String(pageSize)}
            onChange={onPageSizeChange}
            className="border-accent!"
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
            ]}
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <Button
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-white"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} strokeWidth={3} />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-9 px-2 text-white"
              >
                {page}
              </Button>
            ))}
          </div>

          {/* Next */}
          <Button
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-white"
            aria-label="Next page"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
