import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminAddProduct from "./AdminAddProduct";
import AdminEditProduct from "./AdminEditProduct";

export default function AdminDashboard() {
  const { adminLogged, setAdminLogged } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!adminLogged) {
      navigate("/admin/login");
    }
  }, [adminLogged, navigate]);

  if (!adminLogged) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <div className="font-bold">لوحة تحكم المسؤول</div>
        <button
          className="hover:underline"
          onClick={() => {
            setAdminLogged(false);
            navigate("/admin/login");
          }}
        >
          تسجيل خروج
        </button>
      </nav>
      <div className="flex gap-4 p-4">
        <aside className="w-48 bg-white rounded shadow p-2">
          <ul>
            <li><Link to="products" className="block py-2 hover:underline">المنتجات</Link></li>
            <li><Link to="add" className="block py-2 hover:underline">إضافة منتج</Link></li>
            <li><Link to="orders" className="block py-2 hover:underline">الطلبات</Link></li>
          </ul>
        </aside>
        <main className="flex-1">
          <Routes>
  <Route path="products" element={<AdminProducts />} />
  <Route path="add" element={<AdminAddProduct />} />
  <Route path="edit/:id" element={<AdminEditProduct />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="*" element={<AdminProducts />} />
</Routes>
        </main>
      </div>
    </div>
  );
}
