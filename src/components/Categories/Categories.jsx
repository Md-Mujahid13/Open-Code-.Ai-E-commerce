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
      </div>
      <div className="categories-scroll">
        <div className="categories-row">
          {categories.slice(0, 8).map((cat, idx) => (
            <div key={idx} className="category-item">
              <div className="category-circle">
                <img src={cat.image} alt={cat.name} className="category-circle-img" loading="lazy" />
              </div>
              <span className="category-label">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
