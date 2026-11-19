const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-lg">
      <table className="w-full min-w-150">
        <thead>
          <tr className="border-b border-border">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-4">
                <div className="h-3 w-20 rounded bg-elevated" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border">
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <td key={columnIndex} className="px-4 py-5">
                  <div
                    className={`h-3 rounded bg-elevated ${
                      columnIndex === 0 ? "w-12" : "w-28"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
