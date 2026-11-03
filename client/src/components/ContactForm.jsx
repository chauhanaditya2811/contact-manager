import { useState } from "react";

const EMPTY = { name: "", phone: "", email: "", company: "", notes: "" };

export default function ContactForm({ contact, onSave, onClose }) {
  const [form, setForm] = useState(contact ? { ...EMPTY, ...contact } : EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[+\d][\d\s\-()]{5,19}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      setErrors(err.fields || { name: err.message });
      setSaving(false);
    }
  };

  const field = (id, label, type = "text", extra = {}) => (
    <label className={`input ${errors[id] ? "invalid" : ""}`}>
      <span>{label}</span>
      <input type={type} value={form[id]} onChange={set(id)} {...extra} />
      {errors[id] && <em>{errors[id]}</em>}
    </label>
  );

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} noValidate>
        <h2>{contact ? "Edit contact" : "New contact"}</h2>
        {field("name", "Full name", "text", { autoFocus: true })}
        <div className="two">
          {field("phone", "Phone", "tel")}
          {field("email", "Email", "email")}
        </div>
        {field("company", "Company")}
        <label className="input">
          <span>Notes</span>
          <textarea rows="3" value={form.notes} onChange={set("notes")} />
        </label>
        <div className="actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" disabled={saving}>{saving ? "Saving..." : contact ? "Save changes" : "Add contact"}</button>
        </div>
      </form>
    </div>
  );
}
