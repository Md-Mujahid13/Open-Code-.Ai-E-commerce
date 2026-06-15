import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ORDERS_KEY = "nutrinuts_orders";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        } else {
          localStorage.setItem(ORDERS_KEY, "[]");
        }
      }
    } catch {
      localStorage.setItem(ORDERS_KEY, "[]");
    }
  }, []);

  const placeOrder = useCallback((orderData) => {
    const order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase(),
      date: new Date().toISOString(),
      items: orderData.items,
      shipping: orderData.shipping,
      delivery: orderData.delivery,
      payment: orderData.payment,
      subtotal: orderData.subtotal,
      deliveryCharge: orderData.deliveryCharge,
      grandTotal: orderData.grandTotal,
      status: "Processing",
    };

    setOrders((prev) => {
      const updated = Array.isArray(prev) ? [order, ...prev] : [order];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      return updated;
    });

    return order;
  }, []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
