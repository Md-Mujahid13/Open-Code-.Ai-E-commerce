import React, { useState, useEffect } from "react";
import { flashSaleProducts } from "../../data/products";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./FlashSale.css";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart, updateQuantity, getQuantity } = useCart();

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalf) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const remaining = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  return (
    <section className="flash-sale section">
      <div className="container">
        <div className="flash-sale-header">
          <div className="flash-sale-header-left">
            <div className="flash-sale-badge">
              <i className="fas fa-bolt"></i>
              Flash Sale
            </div>
            <p className="flash-sale-subtitle">Limited time offers. Grab them before they're gone!</p>
          </div>
          <div className="flash-timer">
            <div className="timer-label">Ends in</div>
            <div className="timer-display">
              <div className="timer-block">
                <span className="timer-num">{formatTime(timeLeft.hours)}</span>
                <span className="timer-text">Hours</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-block">
                <span className="timer-num">{formatTime(timeLeft.minutes)}</span>
                <span className="timer-text">Mins</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-block">
                <span className="timer-num">{formatTime(timeLeft.seconds)}</span>
                <span className="timer-text">Secs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flash-grid">
            {flashSaleProducts.map((product) => {
              const saved = isWishlisted(product.id);
              return (
            <div key={product.id} className="flash-card">
              <div className="flash-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="flash-img"
                  loading="lazy"
                />
                <span className="flash-discount">-{product.discount}%</span>
                <button
                  className={`flash-wishlist ${saved ? "flash-wishlist-active" : ""}`}
                  onClick={() => toggleWishlist(product)}
                  title={saved ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <i className={`${saved ? "fas" : "far"} fa-heart`}></i>
                </button>
                <div className="flash-stock">
                  <div className="stock-bar">
                    <div className="stock-fill" style={{ width: `${(product.stock / 50) * 100}%` }}></div>
                  </div>
                  <span className="stock-text">{product.stock} left</span>
                </div>
              </div>
              <div className="flash-card-body">
                <h3>{product.name}</h3>
                <div className="flash-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="flash-rating-num">{product.rating}</span>
                </div>
                <div className="flash-pricing">
                  <span className="flash-price">₹{product.price}</span>
                  <span className="flash-old-price">₹{product.oldPrice}</span>
                </div>
                {(() => {
                  const qty = getQuantity(product.id);
                  return qty === 0 ? (
                    <button className="flash-btn" onClick={() => addToCart(product)}>
                      <i className="fas fa-shopping-bag"></i>
                      Grab Now
                    </button>
                  ) : (
                    <div className="flash-qty-controls">
                      <button className="flash-qty-btn" onClick={() => updateQuantity(product.id, -1)}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="flash-qty-value">{qty}</span>
                      <button className="flash-qty-btn" onClick={() => updateQuantity(product.id, 1)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
            )})}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
