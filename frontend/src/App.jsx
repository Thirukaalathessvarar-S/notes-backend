import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('login');

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes(token);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSave = async (note) => {
    if (noteToEdit) {
      try {
        await updateNote(noteToEdit.id, note, token);
        setNoteToEdit(null);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    } else {
      try {
        await createNote(note, token);
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
    fetchNotes();
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id, token);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
  };

  if (!token) {
    return (
      <div className="App">
        {page === 'login' ? (
          <LoginPage setToken={setToken} setPage={setPage} />
        ) : (
          <RegisterPage setPage={setPage} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={() => setToken(null)}>Logout</button>
      <NoteForm onSave={handleSave} noteToEdit={noteToEdit} />
      <div className="notes-container">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;