import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button, Input } from "../../../components/ui";

import { setCredentials, logout } from "../../../Store/Slice/authSlice";
import { showNotification } from "../../../Store/Slice/notificationSlice";

import authService from "../../../services/authService";

const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  "security analyst": "/analyst/dashboard",
  developer: "/developer/dashboard",
  employee: "/employee/dashboard",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password) {
      dispatch(
        showNotification({
          message: "Please enter your username and password.",
          type: "error",
        }),
      );
      return;
    }

    setLoading(true);

    try {
      const user = await authService.login({
        username: formData.username.trim(),
        password: formData.password,
      });

      const destination = ROLE_ROUTES[user.role];

      if (!destination) {
        authService.logout();
        dispatch(logout());

        dispatch(
          showNotification({
            message: "Your account has an unsupported role.",
            type: "error",
          }),
        );
        return;
      }

      dispatch(
        setCredentials({
          user,
          permissions: user.permissions ?? [],
        }),
      );

      dispatch(
        showNotification({
          message: "Login successful! Welcome back.",
          type: "success",
        }),
      );

      navigate(destination, { replace: true });
    } catch (err) {
      dispatch(
        showNotification({
          message:
            err.response?.data?.detail ||
            err.message ||
            "Unable to log in. Please try again.",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        autoComplete="username"
        required
        disabled={loading}
      />

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-primary-text"
        >
          Password
        </label>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            disabled={loading}
            className="pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={loading}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              rounded-md p-1.5 text-muted
              transition-colors hover:text-accent-light
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="
              text-caption font-medium text-accent-light
              transition-colors hover:underline
            "
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
