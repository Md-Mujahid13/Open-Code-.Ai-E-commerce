import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Cart.css";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, cartCount, subtotal } = useCart();
  const { isGuest } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const delivery = items.length > 0 ? 49 : 0;
  const grandTotal = subtotal + delivery;

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    if (hasHalf) stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    const remaining = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    return stars;
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet. Start shopping to fill it up!</p>
          <Link to="/" className="cart-continue-btn">
            <i className="fas fa-arrow-left"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">{cartCount} {cartCount === 1 ? "Item" : "Items"}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-rating">
                    <div className="stars">{renderStars(item.rating)}</div>
                    <span>({item.reviews.toLocaleString()})</span>
                  </div>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{cartCount}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Delivery</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={() => isGuest ? setShowAuthModal(true) : navigate("/checkout")}>
              <i className="fas fa-lock"></i>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              <i className="fas fa-trash-alt"></i>
              Clear Cart
            </button>
            <Link to="/" className="continue-link">
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setShowAuthModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="auth-modal-icon">
              <i className="fas fa-user-lock"></i>
            </div>
            <h3 className="auth-modal-title">Login Required</h3>
            <p className="auth-modal-message">
              Please log in or create an account to continue with checkout and place your order.
            </p>
            <div className="auth-modal-actions">
              <Link to="/login" className="auth-modal-btn auth-modal-btn-primary">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </Link>
              <Link to="/signup" className="auth-modal-btn auth-modal-btn-secondary">
                <i className="fas fa-user-plus"></i>
                Create Account
              </Link>
              <button className="auth-modal-btn auth-modal-btn-ghost" onClick={() => setShowAuthModal(false)}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
