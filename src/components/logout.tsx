import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token-woow");
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full py-1"
    >
      <LogOut />
      Log out
    </button>
  );
}
