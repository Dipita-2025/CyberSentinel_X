import { LockKeyhole, LogOut, LogOutIcon, User, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";
import Logo from "./Logo";
import Button from "./Button";

const commonOptions = [
  { id: "access-request", label: "Access Request", Icon: LockKeyhole },
  { id: "profile", label: "Profile", Icon: Users },
];

function SideNav({
  options = [],
  activeItem,
  onSelect,
  isOpen = false,
  onClose,
  className = "",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const role = userData?.role?.toLowerCase().replace(/-/g, "_") ?? "user";
  const navOptions = [...options, ...commonOptions];

  function handleLogout() {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    onClose?.();
    navigate("/auth", { replace: true });
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        aria-label="Workspace navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-fit shrink-0 flex-col gap-24 border-r border-(--border) bg-(--sidebar) px-8 py-10 transition-transform duration-300 md:static md:z-auto md:w-72 md:translate-x-0 md:transition-none md:gap-16 md:p-8 xl:w-[20%] xl:transition-transform xl:duration-300 xl:gap-24 xl:p-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${className}`}
      >
        <div className=" items-center justify-between hidden xl:flex">
          <Logo />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="flex md:hidden size-40 items-center justify-center rounded-md text-(--text-muted) hover:bg-(--card) hover:text-(--text)"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div
          aria-label="CyberSentinel X"
          role="img"
          className="block aspect-square h-40 self-center bg-[url('/logo2.png')] bg-cover bg-center bg-no-repeat xl:hidden"
        />

        <div>
          <nav aria-label="Primary navigation" className="flex flex-col gap-4">
            {navOptions.map((option) => {
              const isActive = activeItem === option.id;
              const Icon = option.Icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-label={option.label}
                  aria-current={isActive ? "page" : undefined}
                  title={option.label}
                  onClick={() => {
                    onSelect?.(option);
                    onClose?.();
                  }}
                  className={`flex w-full items-center justify-center rounded-md border px-8 py-10 text-left text-body transition-colors xl:justify-start xl:gap-12 xl:px-12 ${
                    isActive
                      ? "border-(--border) bg-(--elevated) text-(--text)"
                      : "border-transparent text-(--text-muted) hover:bg-(--card) hover:text-(--text)"
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden xl:inline">{option.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex gap-10 flex-col">
          <div className="mt-auto rounded-md border border-(--border) bg-(--card) p-5  md:flex md:items-center md:gap-8 md:p-8  xl:p-12">
            <div className="w-30 h-30 flex justify-center items-center rounded-full bg-(--accent)">
              <User className="text-(--bg)" size={20} />
            </div>
            <div className="hidden xl:block">
              <p className="truncate text-body font-semibold text-(--text)">
                {userData?.username ?? "Guest"}
              </p>
              <p className="mt-4 text-caption capitalize text-(--text-muted)">
                {role.replace(/_/g, " ")}
              </p>
            </div>
          </div>
          <Button Icon={LogOutIcon} label="" className=" w-30 h-30" />
        </div>
      </aside>
    </>
  );
}

export default SideNav;
