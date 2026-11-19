import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, MoveUp, MoveDown } from "lucide-react";
import Pagination from "./Pagination";
import TableSkeleton from "./TableSkeleton";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  rowKey = "id",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const sortedData = useMemo(() => {
    // Return original data order when sorting is inactive.
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      let comparison = 0;

      if (sortConfig.key === "created_at") {
        comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue ?? "").localeCompare(
          String(bValue ?? ""),
          undefined,
          { numeric: true, sensitivity: "base" },
        );
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig((current) => {
      // First click: ascending.
      if (current.key !== key) {
        return { key, direction: "asc" };
      }

      // Second click: descending.
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }

      // Third click: unsorted.
      return { key: null, direction: null };
    });

    setCurrentPage(1);
  };

  const getSortIcon = (column) => {
    if (!column.sortable || sortConfig.key !== column.key) {
      return <ArrowUpDown size={14} />;
    }

    if (sortConfig.direction === "asc") {
      return <MoveUp size={14} />;
    }

    return <MoveDown size={14} />;
  };

  if (loading) {
    return (
      <div className="card-base overflow-hidden">
        <TableSkeleton rows={pageSize} columns={columns.length} />
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="card-base p-8 text-center text-muted">{emptyMessage}</div>
    );
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-150">
          <thead>
            <tr className="border-b border-border bg-elevated">
              {columns.map((column) => {
                const isActive = sortConfig.key === column.key;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      column.sortable
                        ? isActive
                          ? sortConfig.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                    className="px-4 py-4 text-center text-sm font-semibold text-muted"
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                        aria-label={`Sort by ${column.label}${
                          !isActive
                            ? " ascending"
                            : sortConfig.direction === "asc"
                              ? " descending"
                              : " unsorted"
                        }`}
                        className={`group inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${
                          isActive
                            ? "text-accent"
                            : "text-muted hover:text-primary-text"
                        }`}
                      >
                        <span>{column.label}</span>
                        <span
                          className={`shrink-0 ${
                            isActive
                              ? "opacity-100"
                              : "opacity-50 group-hover:opacity-100"
                          }`}
                        >
                          {getSortIcon(column)}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row[rowKey] ?? rowIndex}
                className="border-b border-border transition-colors last:border-b-0 hover:bg-elevated/50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-4 text-center text-sm text-primary-text"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : (row[column.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(value) => {
          setPageSize(Number(value));
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default DataTable;
