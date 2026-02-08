import React from 'react';
import NoteCard from '../components/NoteCard';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';

const Notes = ({ onEdit, onAdd }) => {
    const { data } = useData();

    return (
        <div id="notesView" className="view active">
            <div className="view-header">
                <h1>Notes</h1>
                <p>Your text notes and learnings</p>
            </div>
            <div className="view-actions">
                <div className="filter-group">
                    <select id="noteCategoryFilter" className="select-input">
                        <option value="">All Categories</option>
                        {data.categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select id="noteTagFilter" className="select-input">
                        <option value="">All Tags</option>
                        {data.tags?.map(tag => (
                            <option key={tag.id} value={tag.id}>#{tag.name}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={onAdd}>
                    <Plus size={20} />
                    <span>New Note</span>
                </button>
            </div>

            {data.notes.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                    <h3>No notes yet</h3>
                    <p>Create your first note to start building your knowledge vault</p>
                </div>
            ) : (
                <div className="notes-grid">
                    {data.notes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={onEdit}
                            category={data.categories.find(c => c.id === note.category_id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;
