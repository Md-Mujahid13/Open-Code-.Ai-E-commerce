import React from "react";
import { categories } from "../../data/products";
import "./Categories.css";

const Categories = () => {
  return (
    <section className="categories section">
      <div className="container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Explore our wide range of premium dry fruits and natural products</p>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 8).map((cat, idx) => (
            <div key={idx} className="category-card">
              <div className="category-image">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-img"
                  loading="lazy"
                />
              </div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <span className="category-count">{cat.count} Products</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
