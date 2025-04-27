import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function AdminProducts() {
  const { products, setProducts } = useAppContext();
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">الرجوع إلى القائمة الرئيسية</Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>السعر</th>
            <th>التصنيف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image || "https://via.placeholder.com/50"} alt={product.name} className="h-10 w-10 object-cover rounded" /></td>
              <td>{product.name}</td>
              <td>{product.price} ج.م</td>
              <td>{product.category}</td>
              <td>
  <button className="text-red-600 hover:underline mr-2" onClick={() => handleDelete(product.id)}>
    حذف
  </button>
  <Link
    to={`/admin/dashboard/edit/${product.id}`}
    className="text-blue-600 hover:underline"
  >
    تعديل
  </Link>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
