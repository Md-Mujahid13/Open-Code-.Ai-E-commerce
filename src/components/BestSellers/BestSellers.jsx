import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./BestSellers.css";

const VISIBLE = 3;

const BestSellers = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = Math.max(0, products.length - VISIBLE);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= max ? 0 : prev + 1));
  }, [max]);

  useEffect(() => {
    if (products.length <= VISIBLE || paused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next, products.length, paused]);

  const featured = products[0];

  return (
    <section className="bestsellers section">
      <div className="container">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <p>Our most loved products, chosen by thousands of happy customers</p>
        </div>
        <div className="bestsellers-layout">
          <div className="bestsellers-featured">
            <div className="bestsellers-featured-square">
              {featured && (
                <img src={featured.image} alt={featured.name} className="bestsellers-square-img" />
              )}
            </div>
            <span className="bestsellers-new-label">New Arrivals</span>
          </div>
          <div
            className="bestsellers-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="bestsellers-track"
              style={{ transform: `translateX(-${current * (100 / VISIBLE)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="bestsellers-slide">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
