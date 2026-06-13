import React from "react";
import "./Footer.css";

const Footer = () => {
  const categories = [
    "Almonds", "Cashews", "Walnuts", "Pistachios",
    "Raisins", "Dates", "Mixed Nuts", "Seeds", "Honey", "Tea", "Healthy Snacks"
  ];

  const quickLinks = [
    "About Us", "Our Story", "Blog", "Careers", "Press", "Affiliates"
  ];

  const supportLinks = [
    "Help Center", "Shipping Info", "Returns & Exchanges", "Track Order",
    "Contact Us", "FAQ"
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-box"></div>
              </div>
              <p className="footer-desc">
                NutriNuts is your premium destination for the finest dry fruits,
                nuts, and healthy snacks. We source directly from organic farms
                to bring you nature's best, packed with freshness and love.
              </p>
              <div className="footer-social">
                <a href="#facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#instagram" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#twitter" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#youtube" className="social-link"><i className="fab fa-youtube"></i></a>
                <a href="#pinterest" className="social-link"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Shop Categories</h4>
              <ul className="footer-links">
                {categories.map((cat, idx) => (
                  <li key={idx}><a href={`#${cat.toLowerCase()}`}>{cat}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, idx) => (
                  <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                {supportLinks.map((link, idx) => (
                  <li key={idx}><a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col footer-contact">
              <h4>Get in Touch</h4>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 MG Road, Indiranagar, Bangalore - 560038</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>+91 1800-123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>hello@nutrinuts.in</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <div className="container">
          <div className="footer-middle-content">
            <div className="payment-methods">
              <span>We Accept:</span>
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-upi"></i>
              <i className="fab fa-google-pay"></i>
              <i className="fab fa-paypal"></i>
            </div>
            <div className="footer-badges">
              <span><i className="fas fa-shield-alt"></i> Secure Checkout</span>
              <span><i className="fas fa-leaf"></i> Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2026 NutriNuts. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#refund">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
