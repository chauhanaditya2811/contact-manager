import Avatar from "./Avatar.jsx";

const Field = ({ label, value, href }) =>
  value ? (
    <div className="field">
      <span>{label}</span>
      {href ? <a href={href}>{value}</a> : <p>{value}</p>}
    </div>
  ) : null;

export default function ContactDetail({ contact, onEdit, onDelete, onBack }) {
  if (!contact) {
    return <div className="detail placeholder"><p>Select a contact to see their details.</p></div>;
  }
  return (
    <article className="detail">
      <button className="btn ghost back" onClick={onBack}>Back to list</button>
      <header className="detail-head">
        <Avatar name={contact.name} size={84} />
        <div>
          <h2>{contact.name}</h2>
          {contact.company && <p className="muted">{contact.company}</p>}
        </div>
      </header>
      <div className="fields">
        <Field label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
        <Field label="Email" value={contact.email} href={`mailto:${contact.email}`} />
        <Field label="Notes" value={contact.notes} />
        <Field label="Added" value={new Date(contact.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })} />
      </div>
      <footer className="actions">
        <button className="btn primary" onClick={() => onEdit(contact)}>Edit</button>
        <button className="btn danger" onClick={() => onDelete(contact)}>Delete</button>
      </footer>
    </article>
  );
}
