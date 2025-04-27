import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (err) {
        setError("حدث خطأ أثناء جلب المنتجات.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 && <div>لا توجد منتجات.</div>}
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4 flex flex-col">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="h-32 object-cover rounded mb-2"
            />
            <div className="font-bold text-lg">{product.name}</div>
            <div className="text-gray-600">{product.category}</div>
            <div className="my-2">{product.description}</div>
            <div className="font-bold text-green-700">{product.price} ج.م</div>
          </div>
        ))}
      </div>
    </div>
  );
}
