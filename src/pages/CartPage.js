import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, setCart } = useAppContext();
  const [clearSuccess, setClearSuccess] = React.useState(false);
  const navigate = useNavigate();

  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">سلة التسوق</h2>
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate("/")}
      >
        الرجوع إلى القائمة الرئيسية
      </button>
      {cart.length === 0 ? (
        <div>
          السلة فارغة. <Link to="/">تسوق الآن</Link>
        </div>
      ) : (
        <div>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
  <div className="flex items-center gap-2">
    <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="h-14 w-14 object-cover rounded shadow" />
    <div>
      <div className="font-bold">{item.name}</div>
      <div className="text-xs text-gray-500">{item.price} ج.م للواحدة</div>
    </div>
  </div>
</td>
                  <td>
                    <input
  type="number"
  min="1"
  value={typeof item.qty === "number" && !isNaN(item.qty) ? item.qty : 1}
  onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
  className="border w-16 p-1 rounded"
/>
                  </td>
                  <td>{item.price * item.qty} ج.م</td>
                  <td>
                    <button
  className="text-red-600 hover:bg-red-100 px-2 py-1 rounded transition text-sm"
  onClick={() => {
    if(window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج من السلة؟")) removeItem(item.id);
  }}
>
  حذف
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-bold mb-4 text-lg text-green-700">الإجمالي: {total} ج.م</div>
{cart.length > 0 && (
  <div className="flex gap-2 mb-2">
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => navigate("/checkout")}
    >
      إكمال الطلب
    </button>
    <button
      className="bg-red-600 text-white px-4 py-2 rounded"
      onClick={() => {
        if(window.confirm("هل أنت متأكد أنك تريد تفريغ السلة بالكامل؟")) {
          setCart([]);
          setClearSuccess(true);
          setTimeout(() => setClearSuccess(false), 1000);
        }
      }}
    >
      تفريغ السلة
    </button>
  </div>
)}
{clearSuccess && (
  <div className="text-green-700 font-bold mb-2">تم تفريغ السلة بنجاح!</div>
)}
        </div>
      )}
    </div>
  );
}
