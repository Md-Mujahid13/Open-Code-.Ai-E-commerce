import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const saved = isWishlisted(product.id);
  const qty = getQuantity(product.id);

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

  const stockStatus = product.stock <= 15 ? "limited" : "in-stock";
  const stockLabel = product.stock <= 15 ? `Only ${product.stock} left` : "In Stock";

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        <div className="product-badges">
          {product.discount && (
            <span className="product-discount">-{product.discount}%</span>
          )}
        </div>
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}
        {!product.badge && product.isNew && (
          <span className="product-badge badge-new">New</span>
        )}
        <button
          className={`product-wishlist ${saved ? "wishlist-active" : ""}`}
          onClick={() => toggleWishlist(product)}
          title={saved ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <i className={`${saved ? "fas" : "far"} fa-heart`}></i>
        </button>
        <button className="product-quick-view" title="Quick View">
          <i className="fas fa-eye"></i>
        </button>
      </div>
      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-pricing">
          <span className="product-price">₹{product.price}</span>
          {product.oldPrice && (
            <span className="product-old-price">₹{product.oldPrice}</span>
          )}
        </div>
        {product.items && (
          <p className="product-items">{product.items}</p>
        )}
          <div className="product-footer">
            <div className="stock-indicator">
              <span className={`stock-dot ${stockStatus}`}></span>
              <span className="stock-text">{stockLabel}</span>
            </div>
            {qty === 0 ? (
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                <i className="fas fa-shopping-bag"></i>
                Add
              </button>
            ) : (
              <div className="cart-qty-controls">
                <button className="cart-qty-btn" onClick={() => updateQuantity(product.id, -1)}>
                  <i className="fas fa-minus"></i>
                </button>
                <span className="cart-qty-value">{qty}</span>
                <button className="cart-qty-btn" onClick={() => updateQuantity(product.id, 1)}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default ProductCard;
