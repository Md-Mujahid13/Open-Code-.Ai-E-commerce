import React from "react";
import "./BrandStory.css";

const BrandStory = () => {
  return (
    <section className="brand-story section">
      <div className="container">
        <div className="brand-story-content">
          <div className="brand-story-visual">
            <div className="brand-story-image">
              <img
                src="https://images.pexels.com/photos/11350074/pexels-photo-11350074.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop"
                alt="Premium dry fruits from nature to your table"
                className="brand-img"
                loading="lazy"
              />
              <div className="brand-experience-badge">
                <span className="exp-num">12+</span>
                <span className="exp-text">Years of Excellence</span>
              </div>
            </div>
          </div>
          <div className="brand-story-text">
            <span className="brand-tag">Our Story</span>
            <h2>From Nature to Your Table — <span className="text-green">Pure Goodness</span></h2>
            <p className="brand-description">
              NutriNuts started with a simple mission — to bring the finest, freshest dry fruits
              from nature's bounty to your home. For over a decade, we have partnered directly
              with organic farms across the globe to source premium quality nuts and dried fruits.
            </p>
            <p className="brand-description">
              Every product in our collection undergoes rigorous quality checks, ensuring that
              you receive nothing but the best. We believe in sustainable sourcing, ethical
              farming practices, and delivering happiness in every bite.
            </p>
            <div className="brand-values">
              <div className="brand-value">
                <i className="fas fa-check-circle"></i>
                <span>Ethically Sourced</span>
              </div>
              <div className="brand-value">
                <i className="fas fa-check-circle"></i>
                <span>100% Natural</span>
              </div>
              <div className="brand-value">
                <i className="fas fa-check-circle"></i>
                <span>Chemical Free</span>
              </div>
              <div className="brand-value">
                <i className="fas fa-check-circle"></i>
                <span>Sustainable Packaging</span>
              </div>
            </div>
            <button className="btn btn-primary">
              Know More About Us
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
