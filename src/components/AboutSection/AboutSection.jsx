import React from "react";
import "./AboutSection.css";

const AboutSection = () => {
  const points = [
    {
      icon: "fa-seedling",
      title: "Farm Fresh",
      text: "Directly sourced from trusted organic farms",
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Handpicked",
      text: "Every nut carefully selected for quality",
    },
    {
      icon: "fa-flask",
      title: "Purity Tested",
      text: "Lab-tested for freshness and purity",
    },
    {
      icon: "fa-leaf",
      title: "100% Natural",
      text: "No preservatives, no additives, ever",
    },
  ];

  return (
    <section className="about-section section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image-col">
            <div className="about-image-main">
              <img
                src="https://images.pexels.com/photos/9811631/pexels-photo-9811631.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop"
                alt="Fresh organic dry fruits being sorted at our farm"
                loading="lazy"
              />
            </div>
            <div className="about-image-secondary">
              <img
                src="https://images.pexels.com/photos/1799307/pexels-photo-1799307.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                alt="Green lush farm where our produce is grown"
                loading="lazy"
              />
            </div>
          </div>
          <div className="about-text-col">
            <span className="about-tag">From Our Farms</span>
            <h2>
              We Grow What We Sell —{" "}
              <span className="text-green">Pure & Natural</span>
            </h2>
            <p className="about-description">
              Every nut and dried fruit in your order comes from farms we personally
              work with. We don't buy from middlemen — we partner directly with
              growers who share our commitment to purity and quality.
            </p>
            <p className="about-description">
              Your health matters to us. That's why we never use preservatives,
              artificial colors, or chemical treatments. From cultivation to your
              doorstep, every step is handled with care to preserve nature's
              original goodness.
            </p>
            <div className="about-points">
              {points.map((p, idx) => (
                <div key={idx} className="about-point">
                  <div className="about-point-icon">
                    <i className={`fas ${p.icon}`}></i>
                  </div>
                  <div className="about-point-text">
                    <strong>{p.title}</strong>
                    <span>{p.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
