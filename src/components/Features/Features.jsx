import React from "react";
import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: "fa-leaf",
      title: "100% Organic",
      desc: "Sourced from certified organic farms with no chemicals or preservatives",
    },
    {
      icon: "fa-truck",
      title: "Free Delivery",
      desc: "Free shipping on orders above ₹499 with temperature-controlled logistics",
    },
    {
      icon: "fa-shield-alt",
      title: "Quality Guaranteed",
      desc: "Every product is handpicked and quality tested before packaging",
    },
    {
      icon: "fa-undo-alt",
      title: "Easy Returns",
      desc: "7-day hassle-free return policy. Full refund or replacement guaranteed",
    },
    {
      icon: "fa-clock",
      title: "Fresh Stock",
      desc: "Products packed in small batches to ensure maximum freshness",
    },
    {
      icon: "fa-gem",
      title: "Premium Quality",
      desc: "Only the finest grade dry fruits sourced from around the world",
    },
  ];

  return (
    <section className="features section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose NutriNuts?</h2>
          <p>We are committed to providing the best quality dry fruits with unmatched service</p>
        </div>
        <div className="features-grid">
          {features.map((f, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrap">
                <i className={`fas ${f.icon}`}></i>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
