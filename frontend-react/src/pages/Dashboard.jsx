import React from 'react';
import { FileText, Image as ImageIcon, Video, Tag } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import ImageCard from '../components/ImageCard';

const Dashboard = ({ stats, notes = [], images = [] }) => {
    const statCards = [
        { id: 'notes', label: 'Notes', value: stats.notes, icon: FileText, colorClass: 'notes' },
        { id: 'images', label: 'Images', value: stats.images, icon: ImageIcon, colorClass: 'images' },
        { id: 'videos', label: 'Videos', value: stats.videos, icon: Video, colorClass: 'videos' },
        { id: 'tags', label: 'Tags', value: stats.tags, icon: Tag, colorClass: 'tags' },
    ];

    const recentNotes = notes.slice(0, 3);
    const recentImages = images.slice(0, 4);

    return (
        <div id="dashboardView" className="view active">
            <div className="view-header">
                <h1>Welcome back! 👋</h1>
                <p>Here's an overview of your knowledge vault</p>
            </div>

            <div className="stats-grid">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.id} className="stat-card">
                            <div className={`stat-icon ${card.colorClass}`}>
                                <Icon size={24} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{card.value}</span>
                                <span className="stat-label">{card.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-sections">
                <section className="recent-section">
                    <div className="section-header">
                        <h2>Recent Notes</h2>
                        <button className="btn-link">View all</button>
                    </div>
                    {recentNotes.length === 0 ? (
                        <div className="empty-state">
                            <FileText size={48} />
                            <h3>No notes yet</h3>
                            <p>Create your first note to get started</p>
                        </div>
                    ) : (
                        <div className="notes-grid">
                            {recentNotes.map(note => (
                                <NoteCard key={note.id} note={note} onEdit={() => { }} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="recent-section">
                    <div className="section-header">
                        <h2>Recent Images</h2>
                        <button className="btn-link">View all</button>
                    </div>
                    {recentImages.length === 0 ? (
                        <div className="empty-state">
                            <ImageIcon size={48} />
                            <h3>No images yet</h3>
                            <p>Upload your first image</p>
                        </div>
                    ) : (
                        <div className="images-grid">
                            {recentImages.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
