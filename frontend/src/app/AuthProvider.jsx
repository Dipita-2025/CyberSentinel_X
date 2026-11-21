import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../Store/Slice/authSlice";
import { authService } from "../services";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();

        dispatch(
          setCredentials({
            user,
            permissions: user.permissions ?? [],
          }),
        );
      } catch {
        authService.logout();
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary-text">
        Restoring session...
      </div>
    );
  }

  return children;
};

export default AuthProvider;
