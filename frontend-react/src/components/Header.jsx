import React from 'react';
import { Search, Plus } from 'lucide-react';

const Header = ({ onSearch, onAddNew }) => {
    return (
        <header className="main-header">
            <div className="search-container">
                <Search size={20} />
                <input
                    type="text"
                    id="globalSearch"
                    placeholder="Search notes, images, videos..."
                    onChange={(e) => onSearch(e.target.value)}
                />
                <kbd>⌘K</kbd>
            </div>
            <div className="header-actions">
                <button className="btn btn-primary" onClick={onAddNew}>
                    <Plus size={20} />
                    <span>Add New</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
