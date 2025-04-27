import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CheckoutPage() {
  const { cart, setCart, orders, setOrders } = useAppContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!name || !address || !phone) return;
    const order = {
      name,
      address,
      phone,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "جديد",
      date: Date.now()
    };
    try {
      await addDoc(collection(db, "orders"), order);
      setCart([]);
      setSubmitted(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
    }
  };
  if (!cart || cart.length === 0) {
    return <div className="text-red-600 font-bold">السلة فارغة. لا يمكن إتمام الطلب.</div>;
  }
  return (
    <form className="max-w-md mx-auto bg-white p-4 rounded shadow" onSubmit={handleOrder}>
      <h2 className="text-xl font-bold mb-4">إكمال الطلب</h2>
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate("/")}
      >
        الرجوع إلى القائمة الرئيسية
      </button>
      <div className="mb-2">
        <label>الاسم:</label>
        <input className="border p-2 rounded w-full" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label>العنوان:</label>
        <input className="border p-2 rounded w-full" value={address} onChange={e => setAddress(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label>رقم الهاتف:</label>
        <input className="border p-2 rounded w-full" value={phone} onChange={e => setPhone(e.target.value)} required />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2" type="submit">إرسال الطلب</button>
    </form>
  );
}
