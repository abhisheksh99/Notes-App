import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md'; 
import NoteCard from '../components/NoteCard';
import Modal from 'react-modal';
import AddEditNotes from './AddEditNotes';

Modal.setAppElement('#root'); // Set app element for accessibility

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  
  const randomNote = {
    title: 'Random Note',
    date: new Date(),
    content: 'This is a randomly generated content for the NoteCard. It provides a sample of text for demonstration purposes...',
    tags: ['random', 'sample', 'note'],
    isPinned: Math.random() > 0.5, 
  };

  const handlePinNote = () => console.log('Pin note clicked');
  const handleEditNote = () => console.log('Edit note clicked');
  const handleDeleteNote = () => console.log('Delete note clicked');

  const handleAddNote = (note) => {
    console.log('Adding or updating note:', note);
    // Perform any save or update operations here
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteCard
            title={randomNote.title}
            date={randomNote.date}
            content={randomNote.content}
            tags={randomNote.tags}
            isPinned={randomNote.isPinned}
            onPinNote={handlePinNote}
            onEdit={() => setOpenAddEditModal({ isShown: true, type: "edit", data: randomNote })}
            onDelete={handleDeleteNote}
          />
        </div>
      </div>

      {/* Add button */}
      <button 
        className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white fixed bottom-20 right-8 shadow-lg hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 z-10"
        aria-label="Add new note"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd size={24} />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          handleAddNote={handleAddNote}
        />
      </Modal>
    </>
  );
};

export default Home;
