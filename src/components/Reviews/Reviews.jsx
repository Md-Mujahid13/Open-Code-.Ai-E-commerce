import React from "react";
import { reviews } from "../../data/products";
import "./Reviews.css";

const Reviews = () => {
  const renderStars = (rating) => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <i key={i} className={i < rating ? "fas fa-star" : "far fa-star"}></i>
      );
    }
    return arr;
  };

  return (
    <section className="reviews section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Hear from our happy customers about their NutriNuts experience</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-stars">{renderStars(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <div className="review-avatar">
                  <div className="avatar-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="review-author-info">
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>
              </div>
              <div className="review-product-badge">
                <i className="fas fa-check-circle"></i>
                Verified purchase - {review.product}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
