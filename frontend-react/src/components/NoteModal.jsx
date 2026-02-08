import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const NoteModal = ({ isOpen, onClose, note }) => {
    const { data, addNote, updateNote } = useData();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: '',
        tags: []
    });

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || '',
                content: note.content || '',
                category_id: note.category_id || '',
                tags: note.tags?.map(t => t.id) || []
            });
        } else {
            setFormData({
                title: '',
                content: '',
                category_id: '',
                tags: []
            });
        }
    }, [note, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = note
            ? await updateNote(note.id, formData)
            : await addNote(formData);

        if (result.success) {
            showToast(note ? 'Note updated successfully' : 'Note created successfully', 'success');
            onClose();
        } else {
            showToast(result.message, 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div id="noteModal" className="modal active">
            <div className="modal-content modal-large">
                <div className="modal-header">
                    <h2>{note ? 'Edit Note' : 'New Note'}</h2>
                    <button className="btn-icon" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form id="noteForm" className="modal-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Note title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content (Markdown supported)</label>
                        <textarea
                            rows="12"
                            placeholder="Write your note here..."
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="select-input"
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            >
                                <option value="">No category</option>
                                {data.categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <select className="select-input" multiple>
                                {data.tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>#{tag.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" form="noteForm" className="btn btn-primary">Save Note</button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
