import React from 'react';
import { Play } from 'lucide-react';

const VideoCard = ({ video }) => {
    // Helper to extract YouTube ID
    const extractYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?#]+)/);
        return match ? match[1] : null;
    };

    const videoId = extractYouTubeId(video.url);
    const thumbnailUrl = video.platform === 'youtube' && videoId
        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        : null;

    return (
        <div className="video-card" onClick={() => window.open(video.url, '_blank')}>
            <div className="video-thumbnail">
                {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={video.title} />
                ) : (
                    <div className="video-placeholder">
                        <Play size={40} />
                    </div>
                )}
            </div>
            <div className="video-info">
                <h3>{video.title}</h3>
                <p className="video-description">{video.description || 'No description'}</p>
                <div className="video-meta">
                    <span className="video-platform">{video.platform}</span>
                    <span className="video-date">
                        {new Date(video.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
