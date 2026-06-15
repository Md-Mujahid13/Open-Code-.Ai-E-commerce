import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const CART_KEY = "nutrinuts_cart";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const save = useCallback((data) => {
    localStorage.setItem(CART_KEY, JSON.stringify(Array.isArray(data) ? data : []));
  }, []);

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        const next = current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        save(next);
        return next;
      }
      const entry = {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || null,
        image: product.image,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        stock: product.stock || 0,
        quantity: 1,
      };
      const next = [...current, entry];
      save(next);
      return next;
    });
  }, [save]);

  const updateQuantity = useCallback((id, delta) => {
    setItems((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const next = current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0);
      save(next);
      return next;
    });
  }, [save]);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const next = current.filter((item) => item.id !== id);
      save(next);
      return next;
    });
  }, [save]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.setItem(CART_KEY, "[]");
  }, []);

  const cartItems = useMemo(() => Array.isArray(items) ? items : [], [items]);

  const getQuantity = useCallback(
    (id) => {
      const found = cartItems.find((item) => item.id === id);
      return found ? found.quantity : 0;
    },
    [cartItems]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getQuantity,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
