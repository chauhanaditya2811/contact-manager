import Avatar from "./Avatar.jsx";

export default function ContactList({ contacts, selectedId, onSelect, searching, onAdd }) {
  if (!contacts.length) {
    return (
      <div className="empty">
        <h3>{searching ? "No matches" : "Your address book is empty"}</h3>
        <p>{searching ? "Try a different name, number or company." : "Add your first contact to get started."}</p>
        {!searching && <button className="btn primary" onClick={onAdd}>Add contact</button>}
      </div>
    );
  }

  const groups = contacts.reduce((acc, c) => {
    const letter = /[a-z]/i.test(c.name[0]) ? c.name[0].toUpperCase() : "#";
    (acc[letter] ||= []).push(c);
    return acc;
  }, {});

  return (
    <div className="list">
      {Object.keys(groups).sort().map((letter) => (
        <section key={letter}>
          <h4 className="letter">{letter}</h4>
          {groups[letter].map((c) => (
            <button key={c._id} className={`row ${c._id === selectedId ? "active" : ""}`} onClick={() => onSelect(c._id)}>
              <Avatar name={c.name} size={40} />
              <span className="row-text">
                <strong>{c.name}</strong>
                <small>{c.company || c.phone}</small>
              </span>
            </button>
          ))}
        </section>
      ))}
    </div>
  );
}
