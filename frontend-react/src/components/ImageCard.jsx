import React from 'react';

const ImageCard = ({ image }) => {
    const imageUrl = image.data ? `data:${image.mimetype};base64,${image.data}` : image.url;

    return (
        <div className="image-card" data-id={image.id}>
            <img src={imageUrl} alt={image.description || image.original_name} />
            <div className="image-card-overlay">
                <span className="image-card-info">{image.description || image.original_name}</span>
            </div>
        </div>
    );
};

export default ImageCard;
