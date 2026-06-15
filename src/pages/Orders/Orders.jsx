import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import "./Orders.css";

const statusColors = {
  Processing: "#F59E0B",
  Shipped: "#3B82F6",
  Delivered: "#10B981",
};

const Orders = () => {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/" className="orders-continue-btn">
            <i className="fas fa-shopping-bag"></i>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <span className="orders-count">{orders.length} {orders.length === 1 ? "Order" : "Orders"}</span>
        </div>
        <div className="orders-list">
          {orders.map((order) => {
            const orderDate = new Date(order.date);
            return (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id-group">
                    <span className="order-label">Order ID</span>
                    <span className="order-id">{order.id}</span>
                  </div>
                  <div className="order-date-group">
                    <span className="order-label">Placed on</span>
                    <span className="order-date">
                      {orderDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="order-status-group">
                    <span className="order-label">Status</span>
                    <span
                      className="order-status"
                      style={{ background: statusColors[order.status] + "18", color: statusColors[order.status] }}
                    >
                      <span className="status-dot" style={{ background: statusColors[order.status] }}></span>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-total-group">
                    <span className="order-label">Total</span>
                    <span className="order-total">₹{order.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="order-card-body">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-img">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                      <div className="order-item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <div className="order-item-total">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-card-footer">
                  <div className="order-shipping">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {order.shipping.address1}, {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}
                    </span>
                  </div>
                  <div className="order-delivery-info">
                    <i className="fas fa-truck"></i>
                    <span>
                      {order.delivery.method === "express" ? "Express Delivery" : "Standard Delivery"} · {order.delivery.days} days
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
