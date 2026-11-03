import { useEffect, useState, useCallback } from "react";
import * as api from "./api/contacts.js";
import ContactList from "./components/ContactList.jsx";
import ContactDetail from "./components/ContactDetail.jsx";
import ContactForm from "./components/ContactForm.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(null); // null | { contact? }
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async (q) => {
    try { setContacts(await api.listContacts(q)); setError(""); }
    catch { setError("Can't reach the server. Is the API running on port 5000?"); }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(query), 250);
    return () => clearTimeout(t);
  }, [query, load]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const save = async (data) => {
    const saved = form.contact ? await api.updateContact(form.contact._id, data) : await api.createContact(data);
    setToast(form.contact ? "Changes saved" : "Contact added");
    setForm(null);
    setSelectedId(saved._id);
    load(query);
  };

  const remove = async () => {
    await api.deleteContact(toDelete._id);
    setToast("Contact deleted");
    setToDelete(null);
    setSelectedId(null);
    load(query);
  };

  const selected = contacts.find((c) => c._id === selectedId);

  return (
    <div className={`app ${selected ? "has-selection" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <h1>Contacts</h1>
          <span className="count">{contacts.length}</span>
          <button className="btn primary" onClick={() => setForm({})}>New contact</button>
        </div>
        <input
          className="search"
          type="search"
          placeholder="Search name, phone, email or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search contacts"
        />
        {error ? <p className="error-banner">{error}</p> : (
          <ContactList contacts={contacts} selectedId={selectedId} onSelect={setSelectedId} searching={!!query} onAdd={() => setForm({})} />
        )}
      </aside>

      <main className="main">
        <ContactDetail contact={selected} onEdit={(c) => setForm({ contact: c })} onDelete={setToDelete} onBack={() => setSelectedId(null)} />
      </main>

      {form && <ContactForm contact={form.contact} onSave={save} onClose={() => setForm(null)} />}
      {toDelete && <ConfirmDialog contact={toDelete} onConfirm={remove} onCancel={() => setToDelete(null)} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
