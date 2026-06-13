import React from "react";
import "./TrustBadges.css";

const TrustBadges = () => {
  const badges = [
    { icon: "fa-shield-alt", label: "Secure Payment", desc: "256-bit SSL encryption" },
    { icon: "fa-truck", label: "Free Shipping", desc: "On orders above ₹499" },
    { icon: "fa-undo-alt", label: "Easy Returns", desc: "7-day return policy" },
    { icon: "fa-leaf", label: "100% Organic", desc: "Certified products" },
    { icon: "fa-award", label: "Quality Promise", desc: "Handpicked & tested" },
    { icon: "fa-headset", label: "24/7 Support", desc: "Dedicated customer care" },
  ];

  return (
    <section className="trust-badges section">
      <div className="container">
        <div className="section-header">
          <h2>Why Shop with Confidence?</h2>
          <p>We prioritize your trust and satisfaction with every order</p>
        </div>
        <div className="trust-grid">
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-card">
              <div className="trust-icon">
                <i className={`fas ${badge.icon}`}></i>
              </div>
              <div className="trust-text">
                <strong>{badge.label}</strong>
                <span>{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
