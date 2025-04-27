import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { adminLogged, setAdminLogged } = useAppContext();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // كلمة مرور مؤقتة بسيطة
    if (password === "admin123") {
      setAdminLogged(true);
      navigate("/admin/dashboard");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <a href="/" className="text-blue-600 hover:underline">الرجوع إلى القائمة الرئيسية</a>
      </div>
      <form className="max-w-xs mx-auto mt-16 bg-white p-6 rounded shadow" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">دخول المسؤول</h2>
        <input
          type="password"
          className="border p-2 rounded w-full mb-2"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">
          دخول
        </button>
      </form>
    </div>
  );
}
