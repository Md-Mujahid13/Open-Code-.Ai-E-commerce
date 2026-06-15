import React, { useState, useEffect, useCallback } from "react";
import "./Hero.css";
import img from "../../assets/logo.png";
import slider1 from "../../assets/logoback.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import slider4 from "../../assets/slider4.png";

const slides = [
  {
    url: slider1,
    alt: "Premium Almonds",
  },
  {
    url: slider2,
    alt: "Premium Cashews",
  },
  {
    url: slider3,
    alt: "Mixed Dry Fruits",
  },
  {
    url: slider4,
    alt: "Healthy Snacks",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((i) => setCurrent(i), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.url}
            alt={slide.alt}
            className="hero-bg-slide"
            style={{ opacity: i === current ? 1 : 0 ,}}
          />
        ))}
      </div>
      <div className="hero-bg-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-bg-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">Premium Quality Since 2014</span>
          <h1 className="hero-title">
            Nature's Finest
            <span className="hero-title-highlight"> Dry Fruits</span>
            <br />
            Delivered to Your Doorstep
          </h1>
          <p className="hero-subtitle">
            Discover our handpicked collection of premium dry fruits sourced from
            the finest farms around the world. Pure, organic, and irresistibly fresh.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary hero-btn">
              Shop Now
              <i className="fas fa-arrow-right"></i>
            </button>
            <button className="btn btn-outline hero-btn-outline">
              Learn More
              <i className="fas fa-play-circle"></i>
            </button>
          </div>
          <div className="hero-stats-mini">
            <div className="hero-stat-item">
              <span className="hero-stat-value">50K+</span>
              <span className="hero-stat-label">Happy Customers</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">200+</span>
              <span className="hero-stat-label">Products</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">4.8★</span>
              <span className="hero-stat-label">Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-main">
            <img
              src={img}
              alt="Fresh organic nuts harvest from our farms"
              className="hero-img"
            />
            <div className="floating-card card-1">
              <i className="fas fa-leaf"></i>
              <span>100% Organic</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-truck"></i>
              <span>Free Delivery</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-shield-alt"></i>
              <span>Quality Guaranteed</span>
            </div>
          </div>
          <div className="hero-decor-circle"></div>
          <div className="hero-decor-dots"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
