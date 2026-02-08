import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const VideoModal = ({ isOpen, onClose }) => {
    const { data, addVideo } = useData();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        category_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addVideo(formData);
        if (result.success) {
            showToast('Video added successfully', 'success');
            onClose();
            setFormData({ url: '', title: '', description: '', category_id: '' });
        } else {
            showToast(result.message, 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div id="videoModal" className="modal active">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Video Link</h2>
                    <button className="btn-icon" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form id="videoForm" className="modal-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Video URL</label>
                        <input
                            type="url"
                            placeholder="https://youtube.com/watch?v=..."
                            required
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Video title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows="4"
                            placeholder="Notes about this video..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
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
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" form="videoForm" className="btn btn-primary">Save Video</button>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
