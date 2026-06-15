import React from "react";

const Settings = () => {
  return (
    <div className="account-section">
      <h2>Account Settings</h2>
      <p className="section-subtitle">Manage your account preferences.</p>
      <div className="settings-list">
        <div className="setting-item">
          <div><h4>Email Notifications</h4><p>Receive order updates and offers via email</p></div>
          <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
        </div>
        <div className="setting-item">
          <div><h4>SMS Notifications</h4><p>Receive order updates via SMS</p></div>
          <label className="toggle"><input type="checkbox" /><span className="toggle-slider"></span></label>
        </div>
        <div className="setting-item">
          <div><h4>WhatsApp Updates</h4><p>Get delivery updates on WhatsApp</p></div>
          <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
