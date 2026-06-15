import React from "react";

const pages = {
  about: {
    title: "About Us",
    content: `
      Welcome to NutriNuts, your premium destination for the finest dry fruits and nuts.
      We are passionate about bringing you the highest quality nuts sourced directly from the best farms across India and around the world.
      Every product is carefully selected, rigorously quality-checked, and packed with love to ensure you get nothing but the best.
      Our mission is to make healthy snacking convenient, affordable, and delicious for every Indian household.
    `,
  },
  contact: {
    title: "Contact Us",
    content: `
      We'd love to hear from you! Whether you have a question about our products, need help with an order, or just want to share feedback, our team is here to help.
      Email: support@nutrinuts.com
      Phone: +91 1800-123-4567
      Address: NutriNuts Pvt. Ltd., Mumbai, Maharashtra, India
      Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST
    `,
  },
  faq: {
    title: "Frequently Asked Questions",
    content: `
      Q: How long does delivery take?
      A: Standard delivery takes 5-7 business days. Express delivery takes 2-3 business days.

      Q: What is your return policy?
      A: We offer a 7-day return policy on unopened products. Please contact our support team to initiate a return.

      Q: Do you offer international shipping?
      A: Currently, we ship only within India. We are working on expanding internationally.

      Q: How should I store dry fruits?
      A: Store in an airtight container in a cool, dry place away from direct sunlight. Refrigeration is recommended for longer shelf life.

      Q: Can I cancel my order?
      A: Orders can be canceled within 2 hours of placement. After that, the order is processed and cannot be canceled.

      Q: Is Cash on Delivery available?
      A: Yes, we offer Cash on Delivery across all serviceable pin codes with a nominal convenience fee.
    `,
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      At NutriNuts, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
      We collect information you provide when creating an account, placing an order, or contacting our support team.
      This includes your name, email address, phone number, shipping address, and payment details.
      We use this information solely to process your orders, improve our services, and communicate with you about your purchases.
      We do not share your personal information with third parties except as necessary to fulfill your order.
      We implement appropriate security measures to protect your data against unauthorized access.
    `,
  },
  terms: {
    title: "Terms & Conditions",
    content: `
      By using the NutriNuts website and services, you agree to the following terms and conditions.
      All prices are listed in Indian Rupees (INR) and inclusive of applicable taxes.
      We reserve the right to modify prices, products, and services without prior notice.
      Product images are for illustration purposes only. Actual products may vary slightly.
      We strive to ensure accurate product descriptions but do not guarantee that all descriptions are error-free.
      NutriNuts reserves the right to cancel any order in case of pricing errors or stock unavailability.
      These terms are governed by the laws of India.
    `,
  },
  shipping: {
    title: "Shipping Policy",
    content: `
      We offer two shipping options: Standard Delivery (₹49, 5-7 business days) and Express Delivery (₹99, 2-3 business days).
      Free standard delivery is available on orders above ₹499.
      Orders are processed within 24 hours of placement (excluding weekends and public holidays).
      We ship to all pin codes across India. Delivery times may vary based on location.
      Once shipped, you will receive a tracking ID via email and SMS to track your order.
      NutriNuts is not responsible for delays caused by courier partners or unforeseen circumstances.
    `,
  },
  returns: {
    title: "Return & Refund Policy",
    content: `
      We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
      Returns are accepted within 7 days of delivery for unopened, unused products in their original packaging.
      To initiate a return, please contact our support team with your order ID and reason for return.
      Refunds will be processed within 5-7 business days after we receive the returned product.
      The refund will be credited to the original payment method or as store credit, as per your preference.
      Return shipping charges are borne by the customer, except in case of defective or incorrect items.
      Perishable items and gift boxes are not eligible for return unless damaged during transit.
    `,
  },
};

const StaticPage = ({ section }) => {
  const page = pages[section];
  if (!page) return <div className="account-section"><h2>Page Not Found</h2></div>;
  return (
    <div className="account-section static-page">
      <h2>{page.title}</h2>
      <div className="static-content">{page.content.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p.trim()}</p>)}</div>
    </div>
  );
};

export default StaticPage;
