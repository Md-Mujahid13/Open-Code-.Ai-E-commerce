import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

const Profile = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useUserData();
  const [form, setForm] = useState({ name: profile.name || user?.name || "", email: profile.email || user?.email || "", mobile: profile.mobile || "" });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="account-section">
      <h2>Profile Information</h2>
      <p className="section-subtitle">Manage your personal information.</p>
      <form onSubmit={handleSave} className="profile-form">
        <div className="form-group"><label>Full Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-group"><label>Email Address</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="form-group"><label>Mobile Number</label><input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} maxLength={10} /></div>
        <button type="submit" className="account-btn-primary">
          {saved ? <><i className="fas fa-check"></i> Saved</> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
