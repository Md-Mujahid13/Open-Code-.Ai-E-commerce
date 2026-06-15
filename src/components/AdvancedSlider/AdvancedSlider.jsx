import React, { useState, useEffect, useCallback, useRef } from "react";
import { products, comboPacks } from "../../data/products";
import "./AdvancedSlider.css";

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const gradients = [
  "linear-gradient(135deg, #1a1a2e, #16213e)",
  "linear-gradient(135deg, #6B4F3B, #C8A45D)",
  "linear-gradient(135deg, #F59E0B, #F97316)",
  "linear-gradient(135deg, #7C3AED, #A78BFA)",
  "linear-gradient(135deg, #DC2626, #EF4444)",
  "linear-gradient(135deg, #0D9488, #14B8A6)",
  "linear-gradient(135deg, #1D4ED8, #3B82F6)",
  "linear-gradient(135deg, #BE185D, #EC4899)",
  "linear-gradient(135deg, #B45309, #D97706)",
  "linear-gradient(135deg, #064E3B, #047857)",
];

const productTaglines = [
  "Premium Quality Dry Fruits",
  "Farm Fresh & Natural",
  "Handpicked for You",
  "Pure & Organic Goodness",
  "Nature's Finest Selection",
  "Rich in Taste & Health",
  "Premium Grade Product",
  "Sourced from Top Farms",
  "Fresh Stock Just Arrived",
  "Best Value Premium Pack",
];

const promoSlides = [
  {
    id: "p1",
    title: "Summer Sale",
    subtitle: "Up to 40% OFF",
    description: "On all premium dry fruits & combos",
    cta: "Shop Sale",
    gradient: gradients[0],
    badge: "Limited Time",
    image: "https://images.pexels.com/photos/9811631/pexels-photo-9811631.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
  },
  {
    id: "p2",
    title: "Combo Deals",
    subtitle: "Save ₹1,000+",
    description: "Curated family packs at unbeatable prices",
    cta: "View Combos",
    gradient: gradients[1],
    badge: "Best Value",
    image: "https://images.pexels.com/photos/11350074/pexels-photo-11350074.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
  },
  {
    id: "p3",
    title: "New Arrivals",
    subtitle: "Fresh from Farms",
    description: "Discover our latest premium collection",
    cta: "Explore Now",
    gradient: gradients[2],
    badge: "Just In",
    image: "https://images.pexels.com/photos/1799307/pexels-photo-1799307.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
  },
];

const AdvancedSlider = () => {
  const [sectionRef, isVisible] = useScrollReveal(0.1);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const featuredProducts = products.slice(0, 6);
  const combos = comboPacks.slice(0, 3);

  const productSlides = [...newProducts, ...featuredProducts, ...combos].map(
    (p, idx) => {
      const isCombo = combos.includes(p);
      return {
        id: p.id,
        title: p.name,
        subtitle: isCombo ? p.items : productTaglines[idx % productTaglines.length],
        description: isCombo
          ? "Perfect assortment for your family"
          : `Premium quality ${p.category || "dry fruits"} at the best price`,
        cta: isCombo ? "View Combo" : "Add to Cart",
        gradient: gradients[idx % gradients.length],
        badge: p.discount ? `${p.discount}% OFF` : p.badge || "Premium",
        image: p.image,
        price: p.price,
        oldPrice: p.oldPrice,
        rating: p.rating,
        reviews: p.reviews,
        isProduct: true,
      };
    }
  );

  const slides = [...productSlides, ...promoSlides];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = slides.length;

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, totalSlides]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <section
      ref={sectionRef}
      className={`slider-section section ${isVisible ? "visible" : ""}`}
    >
      <div className="container">
        <div className="section-header">
          <h2>What's New & Trending</h2>
          <p>Fresh arrivals, exclusive deals, and top picks curated for you</p>
        </div>
      </div>
      <div
        className="slider-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.id} className="slider-slide">
              <div
                className="feature-card"
                style={{ background: slide.gradient }}
              >
                <div className="feature-card-content">
                  <span className="feature-badge">{slide.badge}</span>
                  <h3 className="feature-title">{slide.title}</h3>
                  <p className="feature-subtitle">{slide.subtitle}</p>
                  <p className="feature-desc">{slide.description}</p>
                  {slide.isProduct && slide.price && (
                    <div className="feature-pricing">
                      <span className="feature-price">₹{slide.price}</span>
                      {slide.oldPrice && (
                        <span className="feature-old-price">₹{slide.oldPrice}</span>
                      )}
                      {slide.rating && (
                        <span className="feature-rating">
                          {renderStars(slide.rating)}
                        </span>
                      )}
                    </div>
                  )}
                  <button className="btn feature-btn">
                    <i className={`fas fa-${slide.isProduct ? "shopping-bag" : "bolt"}`}></i>
                    {slide.cta}
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="feature-card-image">
                  <img src={slide.image} alt={slide.title} loading="lazy" />
                  {slide.isProduct && slide.oldPrice && (
                    <div className="feature-save-tag">
                      Save ₹{slide.oldPrice - slide.price}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-nav slider-prev" onClick={prev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-nav slider-next" onClick={next}>
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === current ? "active" : ""}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedSlider;
