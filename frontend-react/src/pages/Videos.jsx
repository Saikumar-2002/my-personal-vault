import React from 'react';
import VideoCard from '../components/VideoCard';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';

const Videos = ({ onAdd }) => {
    const { data } = useData();

    return (
        <div id="videosView" className="view active">
            <div className="view-header">
                <h1>Video Links</h1>
                <p>Your saved videos from YouTube, courses, etc.</p>
            </div>
            <div className="view-actions">
                <div className="filter-group">
                    <select id="videoPlatformFilter" className="select-input">
                        <option value="">All Platforms</option>
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="coursera">Coursera</option>
                        <option value="udemy">Udemy</option>
                    </select>
                </div>
                <button className="btn btn-primary" onClick={onAdd}>
                    <Plus size={20} />
                    <span>Add Video</span>
                </button>
            </div>

            {data.videos.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    <h3>No videos yet</h3>
                    <p>Save your first video link from YouTube, Coursera, or any platform</p>
                </div>
            ) : (
                <div className="videos-list">
                    {data.videos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Videos;
