import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const { products, setProducts, categories } = useAppContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price || !category) return;
    const id = Date.now();
    setProducts([
      ...products,
      { id, name, description, price: Number(price), category, image },
    ]);
    setName("");
    setDescription("");
    setPrice("");
    setCategory(categories[0]);
    setImage("");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 1000);
  };

  return (
    <form className="max-w-md bg-white p-4 rounded shadow" onSubmit={handleAdd}>
      <div className="mb-4">
        <a href="/" className="text-blue-600 hover:underline">الرجوع إلى القائمة الرئيسية</a>
      </div>
      <h2 className="text-lg font-bold mb-4">إضافة منتج جديد</h2>
      <div className="mb-2">
        <label>الاسم:</label>
        <input className="border p-2 rounded w-full" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label>الوصف:</label>
        <input className="border p-2 rounded w-full" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>السعر:</label>
        <input className="border p-2 rounded w-full" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label>التصنيف:</label>
        <select className="border p-2 rounded w-full" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
  <label>صورة المنتج:</label>
  <input
    type="file"
    accept="image/*"
    className="border p-2 rounded w-full"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  {image && (
    <img src={image} alt="صورة المنتج" className="h-20 mt-2 rounded shadow" />
  )}
</div>
<div className="mb-2">
  <label>رابط الصورة (اختياري):</label>
  <input className="border p-2 rounded w-full" value={image} onChange={e => setImage(e.target.value)} />
</div>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2" type="submit">إضافة</button>
      {success && <div className="text-green-700 mt-2">تمت الإضافة بنجاح!</div>}
    </form>
  );
}
