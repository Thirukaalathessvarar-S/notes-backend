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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const fetchedNotes = await getNotes(token);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
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
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id, token);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setToken(null);
      setNotes([]);
      setNoteToEdit(null);
    }
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
      <div className="app-header">
        <h1>📔 My Notes</h1>
        <button className="logout-btn" onClick={handleLogout}>
          👋 Logout
        </button>
      </div>

      <NoteForm onSave={handleSave} noteToEdit={noteToEdit} />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loading"></div>
        </div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>📝 No notes yet. Create your first note above!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;