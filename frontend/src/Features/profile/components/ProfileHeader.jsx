import { UserRound, LogOut } from "lucide-react";

import { Button } from "../../../components/ui";

const ProfileHeader = ({ user, onLogout }) => {
  return (
    <section className="card-base flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
        <UserRound size={32} />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-head-sec text-primary-text">
          {user?.username || "User"}
        </h2>

        <p className="mt-1 text-sm capitalize text-muted">
          {user?.role || "Account"}
        </p>
      </div>

      <Button
        variant="danger"
        size="md"
        onClick={onLogout}
        className="shrink-0"
      >
        <LogOut size={17} />
        Logout
      </Button>
    </section>
  );
};

export default ProfileHeader;
