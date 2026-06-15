import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { useWishlist } from "../../context/WishlistContext";
import { useUserData } from "../../context/UserDataContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();
  const { addresses } = useUserData();

  const recentOrders = Array.isArray(orders) ? orders.slice(0, 3) : [];

  return (
    <div className="account-dashboard">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <p className="dashboard-subtitle">Here's your account overview.</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon-orders"><i className="fas fa-box"></i></div>
          <div className="stat-info"><span className="stat-number">{Array.isArray(orders) ? orders.length : 0}</span><span className="stat-label">Total Orders</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-wishlist"><i className="fas fa-heart"></i></div>
          <div className="stat-info"><span className="stat-number">{wishlistCount}</span><span className="stat-label">Wishlist</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-addresses"><i className="fas fa-map-marker-alt"></i></div>
          <div className="stat-info"><span className="stat-number">{Array.isArray(addresses) ? addresses.length : 0}</span><span className="stat-label">Saved Addresses</span></div>
        </div>
      </div>

      {recentOrders.length > 0 && (
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3>Recent Orders</h3>
            <Link to="/account/orders" className="view-all-link">View All <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="dashboard-recent-orders">
            {recentOrders.map((o) => (
              <Link key={o.id} to={`/account/order/${o.id}`} className="recent-order-card">
                <span className="recent-order-id">{o.id}</span>
                <span className="recent-order-status" style={{ color: o.status === "Delivered" ? "#10B981" : "#F59E0B" }}>{o.status}</span>
                <span className="recent-order-total">₹{o.grandTotal.toLocaleString()}</span>
                <i className="fas fa-chevron-right"></i>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-links">
        <Link to="/account/orders" className="dash-link"><i className="fas fa-box"></i> My Orders</Link>
        <Link to="/account/wishlist" className="dash-link"><i className="fas fa-heart"></i> Wishlist</Link>
        <Link to="/account/addresses" className="dash-link"><i className="fas fa-map-marker-alt"></i> My Addresses</Link>
        <Link to="/account/profile" className="dash-link"><i className="fas fa-user"></i> Profile</Link>
      </div>
    </div>
  );
};

export default Dashboard;
