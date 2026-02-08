import React from 'react';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';

const Tags = ({ onAdd }) => {
    const { data } = useData();

    return (
        <div id="tagsView" className="view active">
            <div className="view-header">
                <h1>Tags</h1>
                <p>Flexible labels for your content</p>
            </div>
            <div className="view-actions">
                <button className="btn btn-primary" onClick={onAdd}>
                    <Plus size={20} />
                    <span>New Tag</span>
                </button>
            </div>

            {data.tags.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    <h3>No tags yet</h3>
                    <p>Flexible labels for your content</p>
                </div>
            ) : (
                <div className="tags-cloud">
                    {data.tags.map(tag => (
                        <div key={tag.id} className="tag-badge">
                            <span>#{tag.name}</span>
                            {tag.count !== undefined && <span className="tag-count">{tag.count}</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tags;
