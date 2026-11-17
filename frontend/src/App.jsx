import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { logout, setCurrentUser } from "./store/authSlice";
import useGetApiCall from "./hooks/ApiCall/GetApiCall";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data, loading, error } = useGetApiCall(
    token ? "/api/my-applications" : null,
  );

  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data));
    }

    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return (
    <div className="w-full h-full min-h-screen overflow-x-clip">
      {token && loading && <p role="status">Loading your account...</p>}
      {token && error && (
        <p role="alert">
          {error.response?.data?.detail ?? error.message}
        </p>
      )}
      <Outlet />
    </div>
  );
}

export default App;
