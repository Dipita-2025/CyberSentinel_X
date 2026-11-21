import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "../../components/ui";
import { authService } from "../../services";
import { logout as logoutUser } from "../../Store/Slice/authSlice";

import {
  ProfileHeader,
  AccountDetails,
} from "../../features/profile/components";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} onLogout={handleLogout} />

      <AccountDetails user={user} />
    </div>
  );
};

export default Profile;
