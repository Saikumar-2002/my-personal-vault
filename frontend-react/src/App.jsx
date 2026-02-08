import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Images from './pages/Images';
import Videos from './pages/Videos';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Auth from './pages/Auth';
import NoteModal from './components/NoteModal';
import ImageUploadModal from './components/ImageUploadModal';
import VideoModal from './components/VideoModal';

function App() {
  const { user, isLoading } = useAuth();
  const { data, loading: dataLoading } = useData();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-screen" style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f14',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleAddNew = () => {
    if (currentView === 'notes') {
      setEditingNote(null);
      setIsNoteModalOpen(true);
    } else if (currentView === 'images') {
      setIsImageModalOpen(true);
    } else if (currentView === 'videos') {
      setIsVideoModalOpen(true);
    } else {
      setEditingNote(null);
      setIsNoteModalOpen(true);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const renderView = () => {
    const stats = {
      notes: data.notes.length,
      images: data.images.length,
      videos: data.videos.length,
      tags: data.tags.length
    };

    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={stats} notes={data.notes} images={data.images} />;
      case 'notes':
        return <Notes onEdit={handleEditNote} onAdd={handleAddNew} />;
      case 'images':
        return <Images onUpload={() => setIsImageModalOpen(true)} />;
      case 'videos':
        return <Videos onAdd={() => setIsVideoModalOpen(true)} />;
      case 'categories':
        return <Categories onAdd={() => console.log('Add Category')} />;
      case 'tags':
        return <Tags onAdd={() => console.log('Add Tag')} />;
      default:
        return <Dashboard stats={stats} notes={data.notes} images={data.images} />;
    }
  };

  return (
    <>
      <MainLayout
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        onSearch={handleSearch}
        onAddNew={handleAddNew}
      >
        {renderView()}
      </MainLayout>

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        note={editingNote}
      />

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}

export default App;
