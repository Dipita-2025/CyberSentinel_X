function RolesTable({ roles = [], userCounts = {} }) {
  return (
    <div className="overflow-hidden rounded-lg border border-(--border) bg-(--sidebar)">
      <div className="overflow-x-auto">
        <table className="w-full min-w-480 border-collapse text-left">
          <thead className="bg-(--card)">
            <tr className="border-b border-(--border)">
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Role
              </th>
              <th className="px-16 py-12 text-caption font-semibold text-(--text-muted)">
                Description
              </th>
              <th className="whitespace-nowrap px-16 py-12 text-right text-caption font-semibold text-(--text-muted)">
                Users
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-16 py-24 text-center text-body text-(--text-muted)"
                >
                  No roles are available.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.role_id ?? role.role_name}>
                  <td className="whitespace-nowrap px-16 py-12 text-body font-medium capitalize text-(--text)">
                    {role.role_name?.replace(/_/g, " ") ?? "Unnamed role"}
                  </td>
                  <td className="min-w-240 px-16 py-12 text-body text-(--text-muted)">
                    {role.description || "No description"}
                  </td>
                  <td className="whitespace-nowrap px-16 py-12 text-right text-body text-(--text)">
                    {userCounts[role.role_name] ?? 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RolesTable;
