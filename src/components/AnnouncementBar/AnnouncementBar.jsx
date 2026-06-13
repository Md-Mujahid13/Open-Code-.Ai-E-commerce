import React from "react";
import "./AnnouncementBar.css";

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-item">
          <i className="fas fa-truck"></i>
          <span>Free Shipping on orders above ₹499</span>
        </div>
        <div className="announcement-item announcement-middle">
          <i className="fas fa-tag"></i>
          <span>Flat 25% Off on First Order - Use Code: NUTRI25</span>
        </div>
        <div className="announcement-item">
          <i className="fas fa-phone-alt"></i>
          <span>Call us: +91 1800-123-4567</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
