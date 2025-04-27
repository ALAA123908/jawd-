import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // المنتجات
  const [products, setProducts] = useState([]);
  // التصنيفات
  const [categories, setCategories] = useState(["خضار", "فواكه", "لحوم", "مشروبات"]);
  // السلة
  const [cart, setCart] = useState([]);
  // الطلبات
  const [orders, setOrders] = useState([]);
  // حالة تسجيل دخول المسؤول
  const [adminLogged, setAdminLogged] = useState(false);

  // تحميل البيانات من LocalStorage عند بدء التشغيل
  useEffect(() => {
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (storedProducts.length === 0) {
      // تحميل بيانات افتراضية من ملف JSON
      fetch("/initial_products.json")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        });
    } else {
      setProducts(storedProducts);
    }
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
    setAdminLogged(localStorage.getItem("adminLogged") === "true");
  }, []);

  // حفظ المنتجات في LocalStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("adminLogged", adminLogged);
  }, [adminLogged]);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        categories,
        cart,
        setCart,
        orders,
        setOrders,
        adminLogged,
        setAdminLogged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
