import React from "react";
import "./InstagramSection.css";

const InstagramSection = () => {
  const posts = [
    { id: 1, image: "https://images.pexels.com/photos/9811631/pexels-photo-9811631.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "2.4k", tag: "@nutrinuts" },
    { id: 2, image: "https://images.pexels.com/photos/9811624/pexels-photo-9811624.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "3.1k", tag: "@nutrinuts" },
    { id: 3, image: "https://images.pexels.com/photos/11350074/pexels-photo-11350074.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "5.2k", tag: "@nutrinuts" },
    { id: 4, image: "https://images.pexels.com/photos/4198035/pexels-photo-4198035.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "1.8k", tag: "@nutrinuts" },
    { id: 5, image: "https://images.pexels.com/photos/2291592/pexels-photo-2291592.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "4.2k", tag: "@nutrinuts" },
    { id: 6, image: "https://images.pexels.com/photos/1417943/pexels-photo-1417943.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "2.9k", tag: "@nutrinuts" },
    { id: 7, image: "https://images.pexels.com/photos/6803749/pexels-photo-6803749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "3.5k", tag: "@nutrinuts" },
    { id: 8, image: "https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop", likes: "6.1k", tag: "@nutrinuts" },
  ];

  return (
    <section className="instagram-section section">
      <div className="container">
        <div className="section-header">
          <h2>Follow Us on Instagram</h2>
          <p>Join our community of healthy living enthusiasts @nutrinuts</p>
        </div>
      </div>
      <div className="instagram-grid">
        {posts.map((post) => (
          <div key={post.id} className="instagram-post">
            <img
              src={post.image}
              alt="NutriNuts Instagram post"
              className="insta-img"
              loading="lazy"
            />
            <div className="insta-overlay">
              <div className="insta-overlay-content">
                <i className="fab fa-instagram"></i>
                <div className="insta-likes">
                  <i className="fas fa-heart"></i>
                  <span>{post.likes}</span>
                </div>
                <span className="insta-tag">{post.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="section-footer">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline insta-follow-btn"
          >
            <i className="fab fa-instagram"></i>
            Follow @nutrinuts
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
