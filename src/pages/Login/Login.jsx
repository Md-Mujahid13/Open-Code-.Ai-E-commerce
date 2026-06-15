import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/global-logo.png";
import "./Login.css";

const Login = () => {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.username.trim() || !form.password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    const result = login(form.username, form.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <img src={logoImg} alt="NutriNuts" className="auth-logo-img" />
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to access your account</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">ID (demo: example)</label>
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter ID (example)"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password (demo: 123)</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password (123)"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-btn btn-primary">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button className="guest-btn" onClick={() => { guestLogin(); navigate("/"); }}>
            <i className="fas fa-user"></i>
            Continue as Guest
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>

          <p className="auth-helper">
            <i className="fas fa-shield-alt"></i>
            Sign in for faster checkout, order tracking, and personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
