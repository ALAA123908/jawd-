import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const statuses = ["جديد", "جاري التوصيل", "مكتمل"];

function statusColor(status) {
  if (status === "جديد") return "bg-yellow-100 text-yellow-800";
  if (status === "جاري التوصيل") return "bg-blue-100 text-blue-800";
  if (status === "مكتمل") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
}

export default function AdminOrders() {
  const [successMsg, setSuccessMsg] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (err) {
        setError("حدث خطأ أثناء جلب الطلبات.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (id) => {
    const reply = replyInputs[id]?.trim();
    if (!reply) return;
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, reply, replyTime: Date.now() } : order
      )
    );
    setReplyInputs((prev) => ({ ...prev, [id]: "" }));
    setSuccessMsg("تم إرسال الرد بنجاح!");
    setTimeout(() => setSuccessMsg(""), 1200);
  };

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  if (loading) return <div>جاري تحميل الطلبات...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <a href="/" className="text-blue-600 hover:underline">الرجوع إلى القائمة الرئيسية</a>
      </div>
      <h2 className="text-lg font-bold mb-4">الطلبات</h2>
      {successMsg && <div className="text-green-700 font-bold mb-2">{successMsg}</div>}
      {orders.length === 0 ? (
        <div>لا توجد طلبات بعد.</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>تاريخ الطلب</th>
              <th>العميل</th>
              <th>العنوان</th>
              <th>الهاتف</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
              <th>تفاصيل المنتجات</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-blue-50 transition">
                <td className="text-xs text-gray-500">{order.id}</td>
                <td className="text-xs text-gray-700 font-bold">
                  {order.date ? new Date(order.date).toLocaleString() : (order.replyTime ? new Date(order.replyTime).toLocaleString() : "-")}
                </td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.total} ج.م</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <select
                    className="border p-1 rounded mt-1 block"
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  {order.items && order.items.length > 0 ? (
                    <ul className="text-sm">
                      {order.items.map(item => (
                        <li key={item.id} className="flex items-center gap-2 mb-1 border-b pb-1 last:border-b-0">
                          <img src={item.image || "https://via.placeholder.com/30"} alt={item.name} className="h-8 w-8 object-cover rounded" />
                          <span className="font-bold">{item.name}</span>
                          <span className="text-xs text-gray-500">× {item.qty}</span>
                          <span className="text-xs text-green-700">{item.price} ج.م</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-red-400">لا توجد منتجات</span>
                  )}
                  {order.reply && (
                    <div className="mt-2 flex items-center gap-1">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs shadow">
                        💬 {order.reply}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="text-red-600 hover:underline text-xs mr-2"
                    onClick={() => handleDelete(order.id)}
                  >
                    حذف
                  </button>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="اكتب ردًا للزبون..."
                      className="border p-1 rounded text-xs w-32"
                      value={replyInputs[order.id] || ""}
                      onChange={e => handleReplyChange(order.id, e.target.value)}
                    />
                    <button
                      className="bg-blue-600 text-white rounded px-2 py-1 text-xs ml-1"
                      onClick={() => handleSendReply(order.id)}
                      disabled={!replyInputs[order.id] || !replyInputs[order.id].trim()}
                    >
                      إرسال
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
