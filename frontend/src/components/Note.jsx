import React from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <div className="note-actions">
        <button className="btn-edit" onClick={() => onEdit(note)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(note.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Note;