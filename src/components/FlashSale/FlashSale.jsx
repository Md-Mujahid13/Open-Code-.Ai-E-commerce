import React, { useState, useEffect } from "react";
import { flashSaleProducts } from "../../data/products";
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
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="flash-card">
              <div className="flash-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="flash-img"
                  loading="lazy"
                />
                <span className="flash-discount">-{product.discount}%</span>
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
                  <i className="fas fa-star"></i>
                  <span>{product.rating}</span>
                </div>
                <div className="flash-pricing">
                  <span className="flash-price">₹{product.price}</span>
                  <span className="flash-old-price">₹{product.oldPrice}</span>
                </div>
                <button className="btn btn-primary flash-btn">
                  <i className="fas fa-shopping-bag"></i>
                  Grab Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
