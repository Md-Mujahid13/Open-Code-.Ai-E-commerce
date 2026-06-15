import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { UserDataProvider } from "./context/UserDataContext";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TrustSection from "./components/TrustSection/TrustSection";
import Categories from "./components/Categories/Categories";
import ProductSection from "./components/ProductSection/ProductSection";
import BestSellers from "./components/BestSellers/BestSellers";
import FlashSale from "./components/FlashSale/FlashSale";
import Reviews from "./components/Reviews/Reviews";
import Newsletter from "./components/Newsletter/Newsletter";
import YouTubeShortsSection from "./components/InstagramSection/InstagramSection";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Account from "./pages/Account/Account";
import { products, comboPacks } from "./data/products";
import "./App.css";

function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.badge === "Bestseller");

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <TrustSection />
      <Categories />
      <BestSellers products={bestSellers.length > 0 ? bestSellers : featuredProducts} />
      <FlashSale />
      <ProductSection
        title="Featured Products"
        subtitle="Handpicked selection of our most popular premium dry fruits"
        products={featuredProducts}
      />
      <ProductSection
        title="Combo Packs"
        subtitle="Curated bundles for the best value - save more with combos"
        products={comboPacks}
      />
      <Reviews />
      <YouTubeShortsSection />
      <Newsletter />
      <Footer />
    </>
  );
}

function RootRedirect() {
  const { isAuthenticated, isGuest, loaded } = useAuth();

  if (!loaded) return null;

  if (!isAuthenticated && !isGuest) {
    return <Navigate to="/login" replace />;
  }

  return <HomePage />;
}

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <UserDataProvider>
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/:section" element={<Account />} />
                <Route path="/account/order/:orderId" element={<Account />} />
              </Routes>
            </UserDataProvider>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
