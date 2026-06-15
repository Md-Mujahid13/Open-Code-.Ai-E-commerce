import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import "./OrderDrawer.css";

const statusColors = {
  Processing: "#F59E0B",
  Shipped: "#3B82F6",
  Delivered: "#10B981",
};

const OrderDrawer = ({ open, onClose }) => {
  const { orders } = useOrders();

  return (
    <>
      <div className={`order-overlay ${open ? "order-overlay-visible" : ""}`} onClick={onClose} />
      <div className={`order-drawer ${open ? "order-drawer-open" : ""}`}>
        <div className="order-drawer-header">
          <h3 className="order-drawer-title">
            <i className="fas fa-box"></i> Order History
          </h3>
          <button className="order-drawer-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="order-drawer-body">
          {!orders || orders.length === 0 ? (
            <div className="order-drawer-empty">
              <div className="order-drawer-empty-icon">
                <i className="fas fa-box-open"></i>
              </div>
              <h4>No Orders Yet</h4>
              <p>Your order history will appear here once you place your first order.</p>
              <Link to="/" className="order-drawer-shop-btn" onClick={onClose}>
                <i className="fas fa-shopping-bag"></i> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="order-drawer-list">
              {orders.map((order) => {
                const orderDate = new Date(order.date);
                return (
                  <div key={order.id} className="order-drawer-card">
                    <div className="order-drawer-card-top">
                      <span className="order-drawer-id">{order.id}</span>
                      <span
                        className="order-drawer-status"
                        style={{
                          background: statusColors[order.status] + "18",
                          color: statusColors[order.status],
                        }}
                      >
                        <span className="order-drawer-dot" style={{ background: statusColors[order.status] }} />
                        {order.status}
                      </span>
                    </div>
                    <div className="order-drawer-items">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-drawer-item">
                          <div className="order-drawer-item-img">
                            <img src={item.image} alt={item.name} loading="lazy" />
                          </div>
                          <div className="order-drawer-item-info">
                            <p className="order-drawer-item-name">{item.name}</p>
                            <p className="order-drawer-item-date">
                              {orderDate.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            <p className="order-drawer-item-qty">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-drawer-card-bottom">
                      <span className="order-drawer-total">₹{order.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDrawer;
