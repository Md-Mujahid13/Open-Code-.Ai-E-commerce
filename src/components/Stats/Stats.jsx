import React from "react";
import { stats } from "../../data/products";
import "./Stats.css";

const Stats = () => {
  return (
    <section className="stats section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
