import { UserRound, ShieldCheck } from "lucide-react";

const AccountDetails = ({ user }) => {
  const details = [
    {
      label: "Username",
      value: user?.username || "Not available",
      icon: UserRound,
    },
    {
      label: "Assigned Role",
      value: user?.role || "Not available",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="card-base space-y-5 p-5">
      <div>
        <h3 className="text-head-sec text-primary-text">Account Details</h3>
        <p className="mt-1 text-caption text-muted">
          Your account information and assigned access role.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-caption text-muted">{label}</p>
              <p className="truncate text-sm font-medium text-primary-text">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountDetails;
