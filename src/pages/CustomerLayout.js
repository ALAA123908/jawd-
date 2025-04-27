import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4 flex justify-between">
  <div className="flex gap-4 items-center">
    <Link to="/" className="font-bold text-lg">سوبر ماركت</Link>
    <Link to="/cart" className="hover:underline">سلة التسوق</Link>
  </div>
  <Link to="/admin/login" className="hover:underline">لوحة تحكم المسؤول</Link>
</nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  );
}
