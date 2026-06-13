import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

const ProductSection = ({ title, subtitle, products, badge, centered }) => {
  return (
    <section className={`product-section section ${centered ? "centered-section" : ""}`}>
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className={`product-grid ${centered ? "grid-centered" : ""}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="section-footer">
          <button className="btn btn-outline">
            View All Products
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
