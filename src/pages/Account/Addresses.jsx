import React, { useState } from "react";
import { useUserData } from "../../context/UserDataContext";
import { getStates, getCitiesByState } from "../../data/india";

const emptyAddr = { name: "", mobile: "", pincode: "", address1: "", address2: "", city: "", state: "", isDefault: false };

const AddressForm = ({ addr, onSave, onCancel }) => {
  const [form, setForm] = useState(addr || { ...emptyAddr });
  const cities = getCitiesByState(form.state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.pincode.trim() || !form.address1.trim() || !form.city || !form.state) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-row">
        <div className="form-group"><label>Full Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" /></div>
        <div className="form-group"><label>Mobile</label><input type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="9876543210" maxLength={10} /></div>
      </div>
      <div className="form-group"><label>Address Line 1</label><input type="text" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} placeholder="House / Flat / Street" /></div>
      <div className="form-group"><label>Address Line 2 (Optional)</label><input type="text" value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} placeholder="Landmark" /></div>
      <div className="form-row">
        <div className="form-group"><label>PIN Code</label><input type="text" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="400001" maxLength={6} /></div>
        <div className="form-group"><label>State</label>
          <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, city: "" })}>
            <option value="">Select State</option>
            {getStates().map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group"><label>City</label>
          <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} disabled={!form.state}>
            <option value="">Select City</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <label className="default-checkbox"><input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Set as default address</label>
      <div className="address-form-actions">
        <button type="submit" className="account-btn-primary"><i className="fas fa-check"></i> Save Address</button>
        <button type="button" className="account-btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const Addresses = () => {
  const { addresses, addAddress, updateAddress, deleteAddress } = useUserData();
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const addrList = Array.isArray(addresses) ? addresses : [];

  return (
    <div className="account-section">
      <div className="section-header"><h2>My Addresses</h2><button className="account-btn-primary" onClick={() => setAdding(true)}><i className="fas fa-plus"></i> Add Address</button></div>
      {adding && <AddressForm addr={emptyAddr} onSave={(data) => { addAddress(data); setAdding(false); }} onCancel={() => setAdding(false)} />}
      {editing && <AddressForm addr={editing} onSave={(data) => { updateAddress(editing.id, data); setEditing(null); }} onCancel={() => setEditing(null)} />}
      <div className="addresses-grid">
        {addrList.map((a) => (
          <div key={a.id} className={`address-card ${a.isDefault ? "address-default" : ""}`}>
            {a.isDefault && <span className="default-badge">Default</span>}
            <p className="address-name">{a.name}</p>
            <p className="address-detail">{a.address1}{a.address2 ? ", " + a.address2 : ""}</p>
            <p className="address-detail">{a.city}, {a.state} - {a.pincode}</p>
            <p className="address-detail">{a.mobile}</p>
            <div className="address-actions">
              <button onClick={() => setEditing(a)}><i className="fas fa-edit"></i> Edit</button>
              <button onClick={() => deleteAddress(a.id)}><i className="fas fa-trash-alt"></i> Delete</button>
              {!a.isDefault && <button onClick={() => updateAddress(a.id, { isDefault: true })}><i className="fas fa-check-circle"></i> Set Default</button>}
            </div>
          </div>
        ))}
        {addrList.length === 0 && !adding && <p className="no-items">No saved addresses yet.</p>}
      </div>
    </div>
  );
};

export default Addresses;
