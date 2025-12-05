import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import { CategoriesProvider } from "@/providers/categories-provider";
import { showToast } from "@/providers/toast-provider";
import { decodeToken } from "@/helpers/auth";

export default function PrivateLayout() {
  const token = localStorage.getItem("token-woow");
  if (!token) return <Navigate to="/" replace />;

  const { payload, isExpired } = decodeToken(token);

  if (!payload || isExpired) {
    showToast({texto: "No se encuentra autyorizado, por favor vuelva a ingresar", tipo: "info"})
    return <Navigate to="/" replace />;
  }


  return (
    <CategoriesProvider>
      <SidebarProvider>
        <AppSidebar />
        <Outlet context={{ user: payload.full_name, role: payload.role }}/>
      </SidebarProvider>
    </CategoriesProvider>
  );
}
