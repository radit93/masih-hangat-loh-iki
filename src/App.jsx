import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/search";
import DashboardPage from "./pages/User/Dashboard";

import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import AdminRoute from "./route/AdminRoute";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import ProductsPage from "./pages/Admin/Products/ProductsPage";
import OrdersPage from "./pages/Admin/Orders/OrdersPage";
import AddProduct from "./pages/Admin/Products/AddProduct";

function App() {
  return (
    <RequireAuth>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/search" element={<SearchPage />} />

        {/* USER */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        {/* FALLBACK - TABRAK KE MANA PUN → LOGIN */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </RequireAuth>
  );
}

export default App;