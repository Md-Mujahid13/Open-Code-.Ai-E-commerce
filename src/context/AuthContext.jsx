import React, { createContext, useContext, useState, useEffect } from "react";

const AUTH_KEY = "nutrinuts_auth";

const DUMMY_USER = { id: "example", password: "123", name: "Demo User", email: "demo@nutrinuts.com" };

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.guest) {
          setIsGuest(true);
        } else if (data.user) {
          setUser(data.user);
        }
      } catch {}
    }
    setLoaded(true);
  }, []);

  const saveSession = (data) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  };

  const login = (username, password) => {
    if (username === DUMMY_USER.id && password === DUMMY_USER.password) {
      const userData = { username: DUMMY_USER.id, name: DUMMY_USER.name, email: DUMMY_USER.email };
      setUser(userData);
      setIsGuest(false);
      saveSession({ user: userData });
      return { success: true };
    }
    return { success: false, error: "Invalid ID or password. Please try again." };
  };

  const guestLogin = () => {
    setIsGuest(true);
    setUser(null);
    saveSession({ guest: true });
  };

  const signup = () => {
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        guestLogin,
        signup,
        logout,
        isAuthenticated: !!user,
        isGuest,
        loaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
