import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import OrderDrawer from "../OrderDrawer/OrderDrawer";
import "./Navbar.css";

const megaMenuData = {
  Almonds: {
    cols: [
      { heading: "By Type", items: ["Premium Almonds", "Roasted Almonds", "Raw Almonds", "Sliced Almonds", "Almond Flour"] },
      { heading: "By Pack Size", items: ["250g Pack", "500g Pack", "1kg Pack", "Family Pack (2kg)", "Bulk Pack (5kg)"] },
      { heading: "Featured", items: ["California Almonds", "Organic Almonds", "Honey Roasted", "Gift Box", "Best Sellers"] },
    ],
  },
  Cashews: {
    cols: [
      { heading: "By Type", items: ["Premium Cashews", "Roasted Cashews", "Salted Cashews", "Kaju", "Cashew Butter"] },
      { heading: "By Grade", items: ["W240 Grade", "W320 Grade", "W450 Grade", "Broken Pieces", "Cashew Powder"] },
      { heading: "Featured", items: ["Whole Cashews", "Organic Cashews", "Spicy Roasted", "Gift Box", "Combos"] },
    ],
  },
  Walnuts: {
    cols: [
      { heading: "By Type", items: ["English Walnuts", "Raw Walnuts", "Walnut Halves", "Walnut Pieces", "Black Walnuts"] },
      { heading: "By Use", items: ["For Baking", "For Snacking", "For Cooking", "For Salads"] },
      { heading: "Featured", items: ["Organic Walnuts", "Premium Halves", "Value Pack", "Gift Box"] },
    ],
  },
  Pistachios: {
    cols: [
      { heading: "By Type", items: ["Green Pistachios", "Roasted Pistachios", "Salted Pistachios", "Raw Pistachios"] },
      { heading: "By Origin", items: ["Iranian Pistachios", "California Pistachios", "Afghan Pistachios"] },
      { heading: "Featured", items: ["Premium Grade", "Organic", "Bulk Pack", "Gift Box", "Combos"] },
    ],
  },
  Raisins: {
    cols: [
      { heading: "By Type", items: ["Golden Raisins", "Black Raisins", "Green Raisins", "Red Raisins", "Sultanas"] },
      { heading: "By Use", items: ["For Snacking", "For Baking", "For Cooking", "For Desserts"] },
      { heading: "Featured", items: ["Organic Raisins", "Premium Gold", "Value Pack", "Jumbo Pack"] },
    ],
  },
  Dates: {
    cols: [
      { heading: "By Type", items: ["Medjool Dates", "Organic Dates", "Dried Dates", "Date Syrup", "Date Paste"] },
      { heading: "By Origin", items: ["Saudi Dates", "Tunisian Dates", "Iranian Dates", "Israeli Dates"] },
      { heading: "Featured", items: ["Premium Medjool", "Stuffed Dates", "Gift Box", "Bulk Pack", "Combos"] },
    ],
  },
  "Mixed Nuts": {
    cols: [
      { heading: "By Mix", items: ["Mixed Nuts Deluxe", "Kaju Pista Mix", "Healthy Trail Mix", "Energy Mix"] },
      { heading: "By Use", items: ["For Snacking", "For Gifting", "For Parties", "For Travel"] },
      { heading: "Featured", items: ["Premium Mix", "Organic Mix", "Gift Hamper", "Party Pack", "Combos"] },
    ],
  },
  Seeds: {
    cols: [
      { heading: "By Type", items: ["Mixed Seeds", "Pumpkin Seeds", "Sunflower Seeds", "Flax Seeds", "Chia Seeds"] },
      { heading: "By Use", items: ["For Snacking", "For Salads", "For Baking", "For Smoothies"] },
      { heading: "Featured", items: ["Organic Seeds", "Premium Mix", "Value Pack", "Superfood Pack"] },
    ],
  },
  Honey: {
    cols: [
      { heading: "By Type", items: ["Pure Raw Honey", "Manuka Honey", "Organic Honey", "Wild Honey", "Multiflora Honey"] },
      { heading: "By Use", items: ["For Health", "For Cooking", "For Tea", "For Skincare"] },
      { heading: "Featured", items: ["Pure Raw", "Manuka Grade", "Gift Box", "Bulk Jar", "Combos"] },
    ],
  },
  Tea: {
    cols: [
      { heading: "By Type", items: ["Premium Green Tea", "Black Tea", "Herbal Tea", "Masala Chai", "White Tea"] },
      { heading: "By Flavor", items: ["Classic", "Jasmine", "Mint", "Ginger", "Berry"] },
      { heading: "Featured", items: ["Organic Tea", "Gift Box", "Tea Sampler", "Bulk Pack", "Combos"] },
    ],
  },
  Snacks: {
    cols: [
      { heading: "By Type", items: ["Dry Fruit Bars", "Nut Mix", "Protein Bites", "Roasted Mix", "Fruit Chips"] },
      { heading: "By Diet", items: ["High Protein", "Sugar Free", "Gluten Free", "Vegan", "Keto Friendly"] },
      { heading: "Featured", items: ["Healthy Mix", "Kids Pack", "Office Pack", "Gift Box", "Combos"] },
    ],
  },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const hoverTimeout = useRef(null);
  const { user, logout, isAuthenticated, isGuest } = useAuth();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

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
          </div>
        </div>

        <div className={`navbar-center ${mobileOpen ? "mobile-active" : ""}`}>
          <div className="nav-categories">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`nav-item ${activeDropdown === idx ? "nav-item-active" : ""}`}
                onMouseEnter={() => {
                  if (hoverTimeout.current) {
                    clearTimeout(hoverTimeout.current);
                    hoverTimeout.current = null;
                  }
                  setActiveDropdown(idx);
                }}
                onMouseLeave={() => {
                  hoverTimeout.current = setTimeout(() => {
                    setActiveDropdown(null);
                    hoverTimeout.current = null;
                  }, 200);
                }}
              >
                <a href={`#${cat.toLowerCase()}`} className="nav-link" onClick={() => setMobileOpen(false)}>
                  {cat}
                </a>
                <div
                  className={`mega-menu ${activeDropdown === idx ? "mega-open" : ""}`}
                  onMouseEnter={() => {
                    if (hoverTimeout.current) {
                      clearTimeout(hoverTimeout.current);
                      hoverTimeout.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    hoverTimeout.current = setTimeout(() => {
                      setActiveDropdown(null);
                      hoverTimeout.current = null;
                    }, 200);
                  }}
                >
                  <div className="mega-menu-inner">
                    {megaMenuData[cat]?.cols.map((col, ci) => (
                      <div key={ci} className="mega-col">
                        <h4 className="mega-heading">{col.heading}</h4>
                        <ul className="mega-links">
                          {col.items.map((item, ii) => (
                            <li key={ii}>
                              <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="mega-link">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/account" className="user-greeting">{user.name}</Link>
              <button className="icon-btn" onClick={logout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : isGuest ? (
            <div className="user-menu">
              <Link to="/account" className="user-greeting user-guest">Guest User</Link>
              <button className="icon-btn" onClick={logout} title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn">
              <i className="fas fa-user"></i>
            </Link>
          )}
          <button className="icon-btn" onClick={() => setOrderDrawerOpen(true)} title="Order History">
            <i className="fas fa-clock-rotate-left"></i>
          </button>
          <Link to="/wishlist" className="icon-btn">
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn cart-btn">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}></div>}
      <OrderDrawer open={orderDrawerOpen} onClose={() => setOrderDrawerOpen(false)} />
    </nav>
  );
};

export default Navbar;
