import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";

const statusSteps = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const OrderDetail = () => {
  const { orderId } = useParams();
  const { orders } = useOrders();
  const order = Array.isArray(orders) ? orders.find((o) => o.id === orderId) : null;

  if (!order) {
    return (
      <div className="account-section">
        <h2>Order Not Found</h2>
        <p>The order you're looking for doesn't exist.</p>
        <Link to="/account/orders" className="account-btn-primary"><i className="fas fa-arrow-left"></i> Back to Orders</Link>
      </div>
    );
  }

  const currentStep = statusSteps.indexOf(order.status);
  const od = new Date(order.date);

  return (
    <div className="account-section">
      <Link to="/account/orders" className="back-link"><i className="fas fa-arrow-left"></i> Back to Orders</Link>
      <div className="order-detail-header">
        <div><h2>Order #{order.id}</h2><p className="order-detail-date">Placed on {od.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div>
        <span className={`order-status-badge status-${order.status.toLowerCase().replace(/\s/g, "-")}`}>{order.status}</span>
      </div>

      <div className="order-timeline">
        {statusSteps.map((s, i) => (
          <div key={s} className={`timeline-step ${i <= currentStep ? "timeline-active" : ""}`}>
            <div className="timeline-dot">{i < currentStep ? <i className="fas fa-check"></i> : i + 1}</div>
            <span className="timeline-label">{s}</span>
          </div>
        ))}
      </div>

      <div className="order-detail-grid">
        <div className="detail-card">
          <h4><i className="fas fa-box"></i> Ordered Items</h4>
          {order.items.map((item) => (
            <div key={item.id} className="detail-item">
              <div className="detail-item-img"><img src={item.image} alt={item.name} /></div>
              <div className="detail-item-info"><p>{item.name}</p><span>Qty: {item.quantity}</span></div>
              <div className="detail-item-price">₹{(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="detail-card">
          <h4><i className="fas fa-map-marker-alt"></i> Shipping Address</h4>
          <p>{order.shipping.fullName}</p>
          <p>{order.shipping.address1}{order.shipping.address2 ? ", " + order.shipping.address2 : ""}</p>
          <p>{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
          <p>{order.shipping.mobile}</p>
        </div>
        <div className="detail-card">
          <h4><i className="fas fa-truck"></i> Delivery Info</h4>
          <p>{order.delivery.method === "express" ? "Express Delivery" : "Standard Delivery"}</p>
          <p>Estimated: {order.delivery.days} days</p>
        </div>
        <div className="detail-card">
          <h4><i className="fas fa-credit-card"></i> Payment</h4>
          <p>Method: {order.payment.method === "cod" ? "Cash on Delivery" : order.payment.method === "card" ? "Card" : order.payment.method === "upi" ? "UPI" : "Net Banking"}</p>
          <div className="detail-totals">
            <div><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
            <div><span>Delivery</span><span>₹{order.deliveryCharge}</span></div>
            <div className="detail-grand"><span>Total</span><span>₹{order.grandTotal.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
