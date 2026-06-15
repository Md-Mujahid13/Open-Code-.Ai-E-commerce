import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Addresses from "./Addresses";
import Settings from "./Settings";
import OrderDetail from "./OrderDetail";
import StaticPage from "./StaticPages";
import { useOrders } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Account.css";

const sidebarItems = [
  { icon: "fa-th-large", label: "Dashboard", path: "/account" },
  { icon: "fa-box", label: "My Orders", path: "/account/orders" },
  { icon: "fa-heart", label: "Wishlist", path: "/account/wishlist" },
  { icon: "fa-map-marker-alt", label: "My Addresses", path: "/account/addresses" },
  { icon: "fa-user", label: "Profile", path: "/account/profile" },
  { icon: "fa-cog", label: "Settings", path: "/account/settings" },
  { type: "divider" },
  { icon: "fa-info-circle", label: "About Us", path: "/account/about" },
  { icon: "fa-envelope", label: "Contact Us", path: "/account/contact" },
  { icon: "fa-question-circle", label: "FAQ", path: "/account/faq" },
  { icon: "fa-shield-alt", label: "Privacy Policy", path: "/account/privacy" },
  { icon: "fa-file-contract", label: "Terms & Conditions", path: "/account/terms" },
  { icon: "fa-truck", label: "Shipping Policy", path: "/account/shipping" },
  { icon: "fa-undo-alt", label: "Returns & Refunds", path: "/account/returns" },
];

const subSections = ["about", "contact", "faq", "privacy", "terms", "shipping", "returns"];

const Account = () => {
  const location = useLocation();
  const { orderId } = useParams();
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const { orders } = useOrders();

  const pathParts = location.pathname.split("/").filter(Boolean);
  let section = pathParts[1] || "dashboard";

  const renderContent = () => {
    if (section === "order" && orderId) return <OrderDetail />;
    if (section === "orders") return <OrdersList orders={orders} />;
    if (section === "wishlist") return <WishlistPage />;
    if (section === "addresses") return <Addresses />;
    if (section === "profile") return <Profile />;
    if (section === "settings") return <Settings />;
    if (subSections.includes(section)) return <StaticPage section={section} />;
    return <Dashboard />;
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <button className="mobile-sidebar-toggle" onClick={() => setMobileSidebar(!mobileSidebar)}>
          <i className="fas fa-bars"></i> Menu
        </button>

        <aside className={`account-sidebar ${mobileSidebar ? "sidebar-open" : ""}`}>
          {mobileSidebar && <div className="sidebar-close" onClick={() => setMobileSidebar(false)}><i className="fas fa-times"></i></div>}
          <div className="sidebar-header">
            <i className="fas fa-user-circle"></i>
            <span>My Account</span>
          </div>
          <nav className="sidebar-nav">
            {sidebarItems.map((item, i) => {
              if (item.type === "divider") return <div key={i} className="sidebar-divider"></div>;
              const active = item.path === "/account" ? section === "dashboard" : location.pathname.startsWith(item.path);
              return (
                <Link key={item.path} to={item.path} className={`sidebar-link ${active ? "sidebar-active" : ""}`} onClick={() => setMobileSidebar(false)}>
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="account-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const OrdersList = ({ orders }) => {
  const statusColors = { Processing: "#F59E0B", Packed: "#3B82F6", Shipped: "#8B5CF6", "Out for Delivery": "#EC4899", Delivered: "#10B981" };

  if (!orders || orders.length === 0) {
    return (
      <div className="account-section">
        <h2>My Orders</h2>
        <p className="section-subtitle">You haven't placed any orders yet.</p>
        <Link to="/" className="account-btn-primary"><i className="fas fa-shopping-bag"></i> Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="account-section">
      <h2>My Orders</h2>
      <p className="section-subtitle">{orders.length} {orders.length === 1 ? "Order" : "Orders"} placed</p>
      <div className="account-orders-list">
        {orders.map((o) => {
          const od = new Date(o.date);
          return (
            <Link key={o.id} to={`/account/order/${o.id}`} className="account-order-card">
              <div className="account-order-top">
                <div className="aoc-left">
                  <span className="aoc-id">{o.id}</span>
                  <span className="aoc-date">{od.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <span className="aoc-status" style={{ background: statusColors[o.status] + "18", color: statusColors[o.status] }}>
                  <span className="status-dot" style={{ background: statusColors[o.status] }}></span>{o.status}
                </span>
              </div>
              <div className="account-order-items">
                {o.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="aoi-img"><img src={item.image} alt={item.name} /></div>
                ))}
                {o.items.length > 3 && <div className="aoi-more">+{o.items.length - 3}</div>}
              </div>
              <div className="account-order-bottom">
                <span>{o.items.length} {o.items.length === 1 ? "item" : "items"}</span>
                <span className="aoc-total">₹{o.grandTotal.toLocaleString()}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const wishlist = Array.isArray(items) ? items : [];

  if (wishlist.length === 0) {
    return (
      <div className="account-section">
        <h2>My Wishlist</h2>
        <p className="section-subtitle">Your wishlist is empty.</p>
        <Link to="/" className="account-btn-primary"><i className="fas fa-heart"></i> Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="account-section">
      <h2>My Wishlist</h2>
      <p className="section-subtitle">{wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved</p>
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p className="wishlist-price">₹{item.price}</p>
            <button className="wishlist-remove" onClick={() => removeFromWishlist(item.id)}><i className="fas fa-trash-alt"></i> Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
