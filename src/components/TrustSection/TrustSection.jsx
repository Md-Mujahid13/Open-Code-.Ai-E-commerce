import React from "react";
import { Leaf, Truck, ShieldCheck, Award, Package, Headphones } from "lucide-react";
import "./TrustSection.css";

const trustItems = [
  {
    icon: Leaf,
    title: "100% Natural Products",
    desc: "No preservatives, no additives — just pure, nature-approved goodness",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Free delivery on all orders above ₹499 with temperature-controlled logistics",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "256-bit encrypted checkout with UPI, cards, net banking & wallets",
  },
  {
    icon: Award,
    title: "Premium Quality Guaranteed",
    desc: "Every product is handpicked, tested, and quality-certified before shipping",
  },
  {
    icon: Package,
    title: "Farm Fresh Delivery",
    desc: "Sourced directly from farms and delivered fresh to your doorstep",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Dedicated support team available round the clock to assist you",
  },
];

const TrustSection = () => {
  return (
    <section className="trust-section section">
      <div className="container">
        <div className="section-header">
          <h2>Why Shop With Us</h2>
          <p>Experience the best quality and service with every order</p>
        </div>
        <div className="trust-grid">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-card-icon">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="trust-card-title">{item.title}</h3>
                <p className="trust-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
