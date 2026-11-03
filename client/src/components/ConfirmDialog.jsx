export default function ConfirmDialog({ contact, onConfirm, onCancel }) {
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal small">
        <h2>Delete {contact.name}?</h2>
        <p className="muted">This removes the contact permanently. You can't undo this.</p>
        <div className="actions">
          <button className="btn ghost" onClick={onCancel}>Keep contact</button>
          <button className="btn danger solid" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
