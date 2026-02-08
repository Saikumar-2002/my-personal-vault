import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const ImageUploadModal = ({ isOpen, onClose }) => {
    const { data, uploadImage } = useData();
    const { showToast } = useToast();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', description);
        if (categoryId) formData.append('category', categoryId);

        const result = await uploadImage(formData);
        if (result.success) {
            showToast('Image uploaded successfully', 'success');
            onClose();
            // Clearing state
            setSelectedFile(null);
            setPreview(null);
            setDescription('');
            setCategoryId('');
        } else {
            showToast(result.message, 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div id="imageModal" className="modal active">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Upload Image</h2>
                    <button className="btn-icon" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form id="imageForm" className="modal-body" onSubmit={handleUpload}>
                    {!preview ? (
                        <div className="upload-zone" onClick={() => document.getElementById('imageFile').click()}>
                            <Upload size={48} />
                            <p>Click to select an image</p>
                            <input
                                type="file"
                                id="imageFile"
                                name="image"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="image-preview">
                            <img src={preview} alt="Preview" />
                            <button
                                type="button"
                                className="btn-icon remove-preview"
                                onClick={() => { setPreview(null); setSelectedFile(null); }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows="3"
                            placeholder="What's in this image?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="select-input"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
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
                    <button type="submit" form="imageForm" className="btn btn-primary" disabled={!selectedFile}>
                        Upload Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;
