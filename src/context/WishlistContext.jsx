import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "nutrinuts_wishlist";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          localStorage.setItem(WISHLIST_KEY, "[]");
        }
      }
    } catch {
      localStorage.setItem(WISHLIST_KEY, "[]");
    }
  }, []);

  const save = useCallback((data) => {
    if (!Array.isArray(data)) data = [];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
  }, []);

  const isWishlisted = useCallback(
    (id) => Array.isArray(items) && items.some((item) => item.id === id),
    [items]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setItems((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        const exists = current.some((item) => item.id === product.id);
        if (exists) {
          const next = current.filter((item) => item.id !== product.id);
          save(next);
          return next;
        }
        const entry = {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice || null,
          discount: product.discount || null,
          image: product.image,
          rating: product.rating || 0,
          reviews: product.reviews || 0,
          stock: product.stock || 0,
          badge: product.badge || null,
        };
        const next = [...current, entry];
        save(next);
        return next;
      });
    },
    [save]
  );

  const removeFromWishlist = useCallback(
    (id) => {
      setItems((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        const next = current.filter((item) => item.id !== id);
        save(next);
        return next;
      });
    },
    [save]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
