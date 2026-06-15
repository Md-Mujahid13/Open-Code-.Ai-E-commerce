import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { items, toggleWishlist, wishlistCount } = useWishlist();

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<i key={`f-${i}`} className="fas fa-star"></i>);
    if (hasHalf) stars.push(<i key="h" className="fas fa-star-half-alt"></i>);
    const remaining = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < remaining; i++) stars.push(<i key={`e-${i}`} className="far fa-star"></i>);
    return stars;
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount} items</span>}
        </div>

        {wishlistCount === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <i className="far fa-heart"></i>
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite products and find them here later.</p>
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((product) => (
              <div key={product.id} className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.discount && (
                    <span className="wishlist-discount">-{product.discount}%</span>
                  )}
                </div>
                <div className="wishlist-card-body">
                  <h3>{product.name}</h3>
                  <div className="wishlist-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span>({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="wishlist-pricing">
                    <span className="wishlist-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="wishlist-old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                  <div className="wishlist-actions">
                    <button className="btn btn-primary wishlist-cart-btn">
                      <i className="fas fa-shopping-bag"></i>
                      Add to Cart
                    </button>
                    <button
                      className="wishlist-remove"
                      onClick={() => toggleWishlist(product)}
                      title="Remove from Wishlist"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
