import React from 'react';
import { MoreVertical } from 'lucide-react';

const NoteCard = ({ note, onEdit, category, tags }) => {
    // Helper to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Helper to strip markdown for preview
    const stripMarkdown = (text) => {
        return text
            .replace(/#{1,6}\s/g, '')
            .replace(/\*\*|__/g, '')
            .replace(/\*|_/g, '')
            .replace(/`{1,3}[^`]*`{1,3}/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\n/g, ' ')
            .trim();
    };

    return (
        <div className="note-card" onClick={() => onEdit(note)}>
            <div className="note-card-header">
                <h3>{note.title}</h3>
                {category && (
                    <span className="note-category">
                        <span className="note-category-dot" style={{ background: category.color }}></span>
                        {category.name}
                    </span>
                )}
            </div>
            <p className="note-content">
                {stripMarkdown(note.content).substring(0, 150)}
                {note.content.length > 150 ? '...' : ''}
            </p>
            <div className="note-footer">
                <div className="note-tags">
                    {note.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="note-tag">#{tag.name}</span>
                    ))}
                </div>
                <span className="note-date">{formatDate(note.updated_at || note.created_at)}</span>
            </div>
        </div>
    );
};

export default NoteCard;
