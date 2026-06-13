import React, { useState } from "react";
import { faqs } from "../../data/products";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq section">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We've got answers. Here's what our customers commonly ask</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? "faq-open" : ""}`}
              onClick={() => toggle(idx)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <i className={`fas fa-chevron-down ${openIndex === idx ? "rotated" : ""}`}></i>
              </div>
              <div className="faq-answer" style={{
                maxHeight: openIndex === idx ? "300px" : "0",
                opacity: openIndex === idx ? 1 : 0,
              }}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
