import React from 'react';
import ImageCard from '../components/ImageCard';
import { useData } from '../context/DataContext';
import { Upload } from 'lucide-react';

const Images = ({ onUpload }) => {
    const { data } = useData();

    return (
        <div id="imagesView" className="view active">
            <div className="view-header">
                <h1>Images</h1>
                <p>Your uploaded photos and screenshots</p>
            </div>
            <div className="view-actions">
                <div className="filter-group">
                    <select id="imageCategoryFilter" className="select-input">
                        <option value="">All Categories</option>
                        {data.categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={onUpload}>
                    <Upload size={20} />
                    <span>Upload Image</span>
                </button>
            </div>

            {data.images.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <h3>No images yet</h3>
                    <p>Upload your first image to start your collection</p>
                </div>
            ) : (
                <div className="images-gallery">
                    {data.images.map(image => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Images;
