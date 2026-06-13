import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalf) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const remaining = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        {product.discount && (
          <span className="product-discount">-{product.discount}%</span>
        )}
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}
        <button className="product-wishlist" title="Add to Wishlist">
          <i className="far fa-heart"></i>
        </button>
        <button className="product-quick-view" title="Quick View">
          <i className="fas fa-eye"></i>
          Quick View
        </button>
      </div>
      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-pricing">
          <span className="product-price">₹{product.price}</span>
          {product.oldPrice && (
            <span className="product-old-price">₹{product.oldPrice}</span>
          )}
          {product.discount && (
            <span className="product-save">Save ₹{product.oldPrice - product.price}</span>
          )}
        </div>
        <button className="btn btn-primary add-to-cart-btn">
          <i className="fas fa-shopping-bag"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
