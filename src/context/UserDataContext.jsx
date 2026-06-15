import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ADDRESSES_KEY = "nutrinuts_addresses";
const PROFILE_KEY = "nutrinuts_profile";

const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({ name: "", email: "", mobile: "" });

  useEffect(() => {
    try {
      const addrRaw = localStorage.getItem(ADDRESSES_KEY);
      if (addrRaw) {
        const parsed = JSON.parse(addrRaw);
        setAddresses(Array.isArray(parsed) ? parsed : []);
      }
    } catch {}
    try {
      const profRaw = localStorage.getItem(PROFILE_KEY);
      if (profRaw) {
        const parsed = JSON.parse(profRaw);
        if (parsed && typeof parsed === "object") setProfile(parsed);
      }
    } catch {}
  }, []);

  const addAddress = useCallback((addr) => {
    setAddresses((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      if (addr.isDefault) arr.forEach((a) => (a.isDefault = false));
      const updated = [...arr, { ...addr, id: Date.now() }];
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateAddress = useCallback((id, data) => {
    setAddresses((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      if (data.isDefault) arr.forEach((a) => (a.isDefault = false));
      const updated = arr.map((a) => (a.id === id ? { ...a, ...data } : a));
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteAddress = useCallback((id) => {
    setAddresses((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const updated = arr.filter((a) => a.id !== id);
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateProfile = useCallback((data) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    setProfile(data);
  }, []);

  return (
    <UserDataContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, profile, updateProfile }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within UserDataProvider");
  return ctx;
};
