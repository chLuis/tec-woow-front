import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import Home from "./pages/Home";
import PrivateLayout from "./components/private-layout";
import DashboardPage from "./pages/Dashboard";
import Error404Page from "./pages/Error-404";
import ProductsPage from "./pages/Products";
import SuppliersPage from "./pages/Suppliers";
import { ToastProvider } from "./providers/toast-provider";
import Register from "./pages/Register";

function App() {
  return (
    <ToastProvider initialData={null}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
    </ToastProvider>
  );
}

export default App;
