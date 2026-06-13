import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-pattern"></div>
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <i className="fas fa-envelope-open-text"></i>
          </div>
          <h2>Stay Updated with NutriNuts</h2>
          <p>
            Subscribe to our newsletter and get exclusive offers, new product
            announcements, and healthy tips delivered to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="newsletter-input-wrap">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary newsletter-btn">
              Subscribe
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
          <p className="newsletter-note">
            No spam ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
