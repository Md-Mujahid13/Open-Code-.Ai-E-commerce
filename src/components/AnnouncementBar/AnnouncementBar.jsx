import React, { useState, useEffect } from "react";
import "./AnnouncementBar.css";

const messages = [
  "Fresh & Premium Dry Fruits Delivered to Your Doorstep • 100% Natural • Best Quality Guaranteed",
  "Free Delivery on Orders Above ₹499",
  "100% Natural & Chemical-Free Dry Fruits",
  "Special Discounts This Week – Grab Your Favorites Now!",
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="announcement-track-wrapper">
        <div className="announcement-track" key={index}>
          <span className="announcement-marquee">
            <span className="marquee-content">
              <span className="marquee-text">{messages[index]}</span>
              <span className="marquee-text">{messages[index]}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
