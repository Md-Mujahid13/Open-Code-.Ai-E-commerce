import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Almonds", "Cashews", "Walnuts", "Pistachios",
    "Raisins", "Dates", "Mixed Nuts", "Seeds", "Honey", "Tea", "Snacks"
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${mobileOpen ? "open" : ""}`}></span>
          </div>
          <div className="logo">
            <div className="logo-image"></div>
            {/* <i className="fas fa-leaf"></i>
            <span className="logo-text">Nutri<span className="logo-highlight">Nuts</span></span> */}
          </div>
        </div>

        <div className={`navbar-center ${mobileOpen ? "mobile-active" : ""}`}>
          <div className="nav-categories">
            {categories.map((cat, idx) => (
              <a key={idx} href={`#${cat.toLowerCase()}`} className="nav-link" onClick={() => setMobileOpen(false)}>
                {cat}
              </a>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <div className={`search-wrapper ${searchOpen ? "search-active" : ""}`}>
            <input
              type="text"
              placeholder="Search premium dry fruits..."
              className="search-input"
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            />
            <button className="search-btn" onClick={() => setSearchOpen(!searchOpen)}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className="icon-btn">
            <i className="fas fa-user"></i>
          </button>
          <button className="icon-btn">
            <i className="fas fa-heart"></i>
            <span className="badge">0</span>
          </button>
          <button className="icon-btn cart-btn">
            <i className="fas fa-shopping-bag"></i>
            <span className="badge">0</span>
          </button>
        </div>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
