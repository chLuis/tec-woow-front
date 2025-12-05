import { decodeToken } from "@/helpers/auth";
import { showToast } from "@/providers/toast-provider";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ isAuth = true }) {
const token = localStorage.getItem("token-woow");
  if (!token) return <Navigate to="/" replace />;

  const { payload, isExpired } = decodeToken(token);

  if (!payload || isExpired) {
    showToast({texto: "No se encuentra autyorizado, por favor vuelva a ingresar", tipo: "info"})
    return <Navigate to="/" replace />;
  }
 
  if (!isAuth) {
    showToast({texto: "No se encuentra autyorizado, por favor vuelva a ingresar", tipo: "info"})
    return <Navigate to="/" replace />;
  }
  
  return <Outlet context={{ user: payload.full_name, role: payload.role }}/>;
}
