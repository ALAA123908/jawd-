import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLayout from "./pages/CustomerLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* واجهة الزبون */}
        <Route path="/*" element={<CustomerLayout />} />
        {/* لوحة تحكم المسؤول */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        {/* تفاصيل منتج */}
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* إعادة توجيه لأي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppProvider>
  );
}
