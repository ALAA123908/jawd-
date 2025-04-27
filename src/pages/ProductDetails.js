import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, cart, setCart } = useAppContext();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) return <div>المنتج غير موجود.</div>;

  const addToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded shadow">
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        className="h-48 object-cover rounded mb-4 w-full"
      />
      <div className="font-bold text-2xl mb-2">{product.name}</div>
      <div className="text-gray-600 mb-2">{product.category}</div>
      <div className="mb-2">{product.description}</div>
      <div className="font-bold text-green-700 mb-4">{product.price} ج.م</div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        onClick={addToCart}
      >
        أضف إلى السلة
      </button>
      <Link to="/" className="text-blue-600 hover:underline">عودة للقائمة</Link>
    </div>
  );
}
