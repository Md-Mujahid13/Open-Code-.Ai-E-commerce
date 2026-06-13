import React from "react";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import ProductSection from "./components/ProductSection/ProductSection";
import FlashSale from "./components/FlashSale/FlashSale";
import Features from "./components/Features/Features";
import BrandStory from "./components/BrandStory/BrandStory";
import Reviews from "./components/Reviews/Reviews";
import Stats from "./components/Stats/Stats";
import Newsletter from "./components/Newsletter/Newsletter";
import AdvancedSlider from "./components/AdvancedSlider/AdvancedSlider";
import AboutSection from "./components/AboutSection/AboutSection";
import InstagramSection from "./components/InstagramSection/InstagramSection";
import FAQ from "./components/FAQ/FAQ";
import TrustBadges from "./components/TrustBadges/TrustBadges";
import Footer from "./components/Footer/Footer";
import { products, comboPacks } from "./data/products";
import "./App.css";

function App() {
  const featuredProducts = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.badge === "Bestseller");

  return (
    <div className="app">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Categories />
      <ProductSection
        title="Featured Products"
        subtitle="Handpicked selection of our most popular premium dry fruits"
        products={featuredProducts}
      />
      <ProductSection
        title="Best Sellers"
        subtitle="Our most loved products, chosen by thousands of happy customers"
        products={bestSellers.length > 0 ? bestSellers : featuredProducts.slice(0, 4)}
        centered
      />
      <FlashSale />
      <Features />
      <AdvancedSlider />
      <ProductSection
        title="Combo Packs"
        subtitle="Curated bundles for the best value - save more with combos"
        products={comboPacks}
      />
      <AboutSection />
      <BrandStory />
      <Stats />
      <Reviews />
      <InstagramSection />
      <Newsletter />
      <FAQ />
      <TrustBadges />
      <Footer />
    </div>
  );
}

export default App;
