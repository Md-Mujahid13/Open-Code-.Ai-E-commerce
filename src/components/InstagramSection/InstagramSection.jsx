import React from "react";
import "./InstagramSection.css";

const shorts = [
  {
    id: "cRJ1X3XsYtg",
    title: "Benefits Of Eating Soaked Dry fruits At Morning",
  },
  {
    id: "-y10JjqPgfc",
    title: "The Surprising Benefits of Dried Fruits",
  },
  {
    id: "zaOHdvDeQg0",
    title: "Nuts + Dried Fruits = Endless Energy",
  },
  {
    id: "VQRTaNZYXos",
    title: "Dry Fruits Burfi Recipe",
  },
  {
    id: "2dhUo-_aQZ8",
    title: "Shocking Facts About Dry Fruits",
  },
];

const YouTubeShortsSection = () => {
  return (
    <section className="instagram-section section">
      <div className="container">
        <div className="section-header">
          <h2>Watch Our Shorts</h2>
          <p>Quick dry fruit tips, recipes & health facts</p>
        </div>
        <div className="shorts-grid">
          {shorts.map((video) => (
            <div key={video.id} className="shorts-card">
              <div className="shorts-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1`}
                  title={video.title}
                  allow="autoplay; encrypted-media"
                  tabIndex="-1"
                />
                <div className="shorts-overlay" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeShortsSection;
