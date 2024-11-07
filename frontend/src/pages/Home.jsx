import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import NoteCard from '../components/NoteCard';
import Modal from 'react-modal';
import AddEditNotes from './AddEditNotes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root');

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      getAllNotes();
    }
  }, [currentUser, navigate]);

  // Function to fetch all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", { withCredentials: true });
      if (res.data.success) {
        setAllNotes(res.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Function to add or edit a note
  const handleAddEditNote = async (note) => {
    try {
      let res;
      if (openAddEditModal.type === "edit") {
        res = await axios.put(`http://localhost:3000/api/note/edit/${note._id}`, note, { withCredentials: true });
      } else {
        res = await axios.post("http://localhost:3000/api/note/add", note, { withCredentials: true });
      }

      if (res.data.success) {
        getAllNotes(); // Refresh notes list after adding/editing
        setOpenAddEditModal({ isShown: false, type: "add", data: null }); // Close modal
      }
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  // Function to delete a note
  const handleDeleteNote = async (noteId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/note/delete/${noteId}`, { withCredentials: true });
      if (res.data.success) {
        setAllNotes(allNotes.filter(note => note._id !== noteId)); // Remove note from state
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Function to toggle the pinned state of a note
  const handlePinNote = async (note) => {
    try {
      const updatedNote = { ...note, isPinned: !note.isPinned };
      const res = await axios.put(`http://localhost:3000/api/note/update-note-pinned/${note._id}`, updatedNote, { withCredentials: true });
      if (res.data.success) {
        getAllNotes(); // Refresh notes to reflect the pin change
      }
    } catch (error) {
      console.error("Error pinning note:", error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNotes.length > 0 ? (
            allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onPinNote={() => handlePinNote(note)}
                onEdit={() => setOpenAddEditModal({ isShown: true, type: "edit", data: note })}
                onDelete={() => handleDeleteNote(note._id)}
              />
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      </div>

      <button
        className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white fixed bottom-20 right-8 shadow-lg hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 z-10"
        aria-label="Add new note"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd size={24} />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          handleAddEditNote={handleAddEditNote}
        />
      </Modal>
    </>
  );
};

export default Home;
