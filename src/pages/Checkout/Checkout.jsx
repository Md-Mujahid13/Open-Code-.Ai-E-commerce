import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { getStates, getCitiesByState, getPinCodeInfo } from "../../data/india";
import "./Checkout.css";

const STEPS = ["Shipping", "Delivery", "Summary", "Payment"];

const Checkout = () => {
  const { items, clearCart, subtotal } = useCart();
  const { placeOrder } = useOrders();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const [shipping, setShipping] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [pinLocked, setPinLocked] = useState(false);
  const cities = getCitiesByState(shipping.state);

  const deliveryCharge = delivery === "express" ? 99 : 49;
  const grandTotal = subtotal + deliveryCharge;
  const deliveryDays = delivery === "express" ? "2-3" : "5-7";

  const futureDate = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const handlePincodeChange = (val) => {
    const digitOnly = val.replace(/\D/g, "").slice(0, 6);
    setShipping((prev) => ({ ...prev, pincode: digitOnly }));
    if (digitOnly.length === 6) {
      const info = getPinCodeInfo(digitOnly);
      if (info) {
        setShipping((prev) => ({ ...prev, city: info.city, state: info.state, pincode: digitOnly }));
        setPinLocked(true);
      } else {
        setPinLocked(false);
      }
    } else {
      setPinLocked(false);
    }
  };

  const validateShipping = () => {
    const e = {};
    if (!shipping.fullName.trim()) e.fullName = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(shipping.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) e.email = "Enter a valid email address";
    if (!shipping.address1.trim()) e.address1 = "Address is required";
    if (!shipping.city) e.city = "City is required";
    if (!shipping.state) e.state = "State is required";
    if (!/^\d{6}$/.test(shipping.pincode)) e.pincode = "Enter a valid 6-digit PIN code";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) setStep(1);
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSummaryContinue = () => {
    setStep(3);
  };

  const validatePayment = () => {
    const e = {};
    if (payment === "card") {
      if (!card.name.trim()) e.cardName = "Cardholder name is required";
      if (!/^\d{16}$/.test(card.number.replace(/\s/g, ""))) e.cardNumber = "Enter a valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.cardExpiry = "Use MM/YY format";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cardCvv = "Enter a valid CVV";
    }
    if (payment === "upi" && !upiId.trim()) e.upiId = "UPI ID is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const order = placeOrder({
      items,
      shipping,
      delivery: { method: delivery, days: deliveryDays },
      payment: { method: payment },
      subtotal,
      deliveryCharge,
      grandTotal,
    });
    clearCart();
    setLoading(false);
    setOrderSuccess(order);
  };

  const formatCard = (val) => val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    if (d.length > 2) return d.slice(0, 2) + "/" + d.slice(2);
    return d;
  };

  const shipErrors = errors;
  const payErrors = errors;

  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-order-id">Order ID: {orderSuccess.id}</p>
            <p className="success-date">
              Placed on {new Date(orderSuccess.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="success-delivery">Estimated Delivery: {futureDate(parseInt(deliveryDays.split("-")[1]))}</p>
            <div className="success-actions">
              <Link to="/account/orders" className="success-btn primary-btn">
                <i className="fas fa-box"></i>
                View Orders
              </Link>
              <Link to="/" className="success-btn secondary-btn">
                <i className="fas fa-shopping-bag"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="cart-empty" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div className="cart-empty-icon" style={{ width: 100, height: 100, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <i className="fas fa-shopping-bag" style={{ fontSize: 42, color: "var(--primary)" }}></i>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-dark)", marginBottom: 8 }}>Your Cart is Empty</h2>
            <p style={{ fontSize: 14, color: "var(--text-gray)", marginBottom: 28 }}>Add some items to your cart before checking out.</p>
            <Link to="/cart" className="success-btn primary-btn">
              <i className="fas fa-arrow-left"></i>
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`step-item ${i === step ? "step-active" : ""} ${i < step ? "step-done" : ""}`}>
                <div className="step-circle">{i < step ? <i className="fas fa-check"></i> : i + 1}</div>
                <span className="step-label">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            {/* Step 1: Shipping */}
            {step === 0 && (
              <form onSubmit={handleShippingSubmit} className="checkout-form">
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span className="required">*</span></label>
                    <input type="text" value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} placeholder="John Doe" />
                    {shipErrors.fullName && <span className="field-error">{shipErrors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number <span className="required">*</span></label>
                    <input type="tel" value={shipping.mobile} onChange={(e) => setShipping({ ...shipping, mobile: e.target.value })} placeholder="9876543210" maxLength={10} />
                    {shipErrors.mobile && <span className="field-error">{shipErrors.mobile}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address <span className="required">*</span></label>
                  <input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} placeholder="john@example.com" />
                  {shipErrors.email && <span className="field-error">{shipErrors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Address Line 1 <span className="required">*</span></label>
                  <input type="text" value={shipping.address1} onChange={(e) => setShipping({ ...shipping, address1: e.target.value })} placeholder="House / Flat / Street" />
                  {shipErrors.address1 && <span className="field-error">{shipErrors.address1}</span>}
                </div>
                <div className="form-group">
                  <label>Address Line 2 (Optional)</label>
                  <input type="text" value={shipping.address2} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} placeholder="Landmark / Apt / Suite" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>State <span className="required">*</span></label>
                    <select value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value, city: "" })} disabled={pinLocked}>
                      <option value="">Select State</option>
                      {getStates().map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {shipErrors.state && <span className="field-error">{shipErrors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label>City <span className="required">*</span></label>
                    <select value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} disabled={pinLocked || !shipping.state}>
                      <option value="">Select City</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {shipErrors.city && <span className="field-error">{shipErrors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>PIN Code <span className="required">*</span></label>
                    <input type="text" value={shipping.pincode} onChange={(e) => handlePincodeChange(e.target.value)} placeholder="400001" maxLength={6} />
                    {shipErrors.pincode && <span className="field-error">{shipErrors.pincode}</span>}
                    {shipping.pincode.length === 6 && !getPinCodeInfo(shipping.pincode) && (
                      <span className="field-error">PIN code not found. Please select city/state manually.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input type="text" value={shipping.country} disabled />
                </div>
                <button type="submit" className="checkout-next-btn">
                  Continue to Delivery
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            )}

            {/* Step 2: Delivery */}
            {step === 1 && (
              <form onSubmit={handleDeliverySubmit} className="checkout-form">
                <h2>Delivery Method</h2>
                <div className="delivery-options">
                  <label className={`delivery-card ${delivery === "standard" ? "delivery-selected" : ""}`}>
                    <input type="radio" name="delivery" value="standard" checked={delivery === "standard"} onChange={() => setDelivery("standard")} />
                    <div className="delivery-card-content">
                      <div className="delivery-card-top">
                        <i className="fas fa-truck"></i>
                        <span className="delivery-name">Standard Delivery</span>
                        <span className="delivery-price">₹49</span>
                      </div>
                      <p className="delivery-estimate">Estimated delivery: {futureDate(5)} - {futureDate(7)}</p>
                    </div>
                  </label>
                  <label className={`delivery-card ${delivery === "express" ? "delivery-selected" : ""}`}>
                    <input type="radio" name="delivery" value="express" checked={delivery === "express"} onChange={() => setDelivery("express")} />
                    <div className="delivery-card-content">
                      <div className="delivery-card-top">
                        <i className="fas fa-rocket"></i>
                        <span className="delivery-name">Express Delivery</span>
                        <span className="delivery-price">₹99</span>
                      </div>
                      <p className="delivery-estimate">Estimated delivery: {futureDate(2)} - {futureDate(3)}</p>
                    </div>
                  </label>
                </div>
                <div className="checkout-nav">
                  <button type="button" className="checkout-back-btn" onClick={() => setStep(0)}>
                    <i className="fas fa-arrow-left"></i>
                    Back to Shipping
                  </button>
                  <button type="submit" className="checkout-next-btn">
                    Continue to Summary
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Summary */}
            {step === 2 && (
              <div className="checkout-form">
                <h2>Order Summary</h2>
                <div className="checkout-summary-items">
                  {items.map((item) => (
                    <div key={item.id} className="checkout-summary-item">
                      <div className="csi-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="csi-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="csi-price">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="checkout-totals">
                  <div className="ct-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="ct-row"><span>Delivery Charges</span><span>{deliveryCharge === 0 ? "Free" : "₹" + deliveryCharge}</span></div>
                  <div className="ct-divider"></div>
                  <div className="ct-row ct-grand"><span>Grand Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
                </div>
                <div className="checkout-nav">
                  <button type="button" className="checkout-back-btn" onClick={() => setStep(1)}>
                    <i className="fas fa-arrow-left"></i>
                    Back to Delivery
                  </button>
                  <button type="button" className="checkout-next-btn" onClick={handleSummaryContinue}>
                    Continue to Payment
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 3 && (
              <div className="checkout-form">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: "fa-credit-card" },
                    { id: "upi", label: "UPI", icon: "fa-mobile-alt" },
                    { id: "cod", label: "Cash on Delivery", icon: "fa-money-bill-wave" },
                    { id: "netbanking", label: "Net Banking", icon: "fa-university" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`payment-method-tab ${payment === m.id ? "pm-active" : ""}`}
                      onClick={() => setPayment(m.id)}
                    >
                      <i className={`fas ${m.icon}`}></i>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>

                <div className="payment-form">
                  {payment === "card" && (
                    <div className="card-payment">
                      <div className="card-preview">
                        <div className="card-preview-top">
                          <i className="fas fa-credit-card"></i>
                          <span>VISA</span>
                        </div>
                        <div className="card-preview-number">{card.number || "•••• •••• •••• ••••"}</div>
                        <div className="card-preview-bottom">
                          <div><span>Cardholder</span><p>{card.name || "YOUR NAME"}</p></div>
                          <div><span>Expires</span><p>{card.expiry || "MM/YY"}</p></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name <span className="required">*</span></label>
                        <input type="text" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="John Doe" />
                        {payErrors.cardName && <span className="field-error">{payErrors.cardName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Card Number <span className="required">*</span></label>
                        <input type="text" value={card.number} onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })} placeholder="1234 5678 9012 3456" />
                        {payErrors.cardNumber && <span className="field-error">{payErrors.cardNumber}</span>}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date <span className="required">*</span></label>
                          <input type="text" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" maxLength={5} />
                          {payErrors.cardExpiry && <span className="field-error">{payErrors.cardExpiry}</span>}
                        </div>
                        <div className="form-group">
                          <label>CVV <span className="required">*</span></label>
                          <input type="password" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="•••" maxLength={4} />
                          {payErrors.cardCvv && <span className="field-error">{payErrors.cardCvv}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {payment === "upi" && (
                    <div className="upi-payment">
                      <div className="upi-icon">
                        <i className="fas fa-mobile-alt"></i>
                      </div>
                      <p className="upi-subtitle">Pay using any UPI app</p>
                      <div className="form-group">
                        <label>UPI ID <span className="required">*</span></label>
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="username@upi" />
                        {payErrors.upiId && <span className="field-error">{payErrors.upiId}</span>}
                      </div>
                      <div className="upi-apps">
                        {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                          <button key={app} type="button" className="upi-app-btn" onClick={() => setUpiId(`${app.toLowerCase().replace(/\s/g, "")}@pay`)}>
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {payment === "cod" && (
                    <div className="cod-payment">
                      <div className="cod-icon">
                        <i className="fas fa-money-bill-wave"></i>
                      </div>
                      <h3>Cash on Delivery</h3>
                      <p>Pay when you receive your order. No online payment required.</p>
                      <div className="cod-note">
                        <i className="fas fa-info-circle"></i>
                        A nominal convenience fee of ₹49 may apply for COD orders.
                      </div>
                    </div>
                  )}

                  {payment === "netbanking" && (
                    <div className="netbanking-payment">
                      <div className="net-icon">
                        <i className="fas fa-university"></i>
                      </div>
                      <p className="nb-subtitle">Select your bank</p>
                      <select className="nb-select" defaultValue="">
                        <option value="" disabled>Choose your bank</option>
                        {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank", "PNB", "BOB"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="checkout-nav">
                  <button type="button" className="checkout-back-btn" onClick={() => setStep(2)}>
                    <i className="fas fa-arrow-left"></i>
                    Back to Summary
                  </button>
                  <button
                    type="button"
                    className={`checkout-next-btn place-order-btn ${loading ? "btn-loading" : ""}`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                    ) : (
                      <><i className="fas fa-lock"></i> Place Order · ₹{grandTotal.toLocaleString()}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-sidebar">
            <h3>Order Summary</h3>
            <div className="sidebar-items">
              {items.map((item) => (
                <div key={item.id} className="sidebar-item">
                  <div className="sidebar-item-img">
                    <img src={item.image} alt={item.name} />
                    <span className="sidebar-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="sidebar-item-info">
                    <p className="sidebar-item-name">{item.name}</p>
                    <p className="sidebar-item-price">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sidebar-totals">
              <div className="st-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="st-row"><span>Delivery</span><span>{deliveryCharge === 0 ? "Free" : "₹" + deliveryCharge}</span></div>
              <div className="st-divider"></div>
              <div className="st-row st-grand"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
