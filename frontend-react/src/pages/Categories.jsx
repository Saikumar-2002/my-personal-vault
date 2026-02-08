import React from 'react';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';

const Categories = ({ onAdd }) => {
    const { data } = useData();

    return (
        <div id="categoriesView" className="view active">
            <div className="view-header">
                <h1>Categories</h1>
                <p>Organize your content hierarchically</p>
            </div>
            <div className="view-actions">
                <button className="btn btn-primary" onClick={onAdd}>
                    <Plus size={20} />
                    <span>New Category</span>
                </button>
            </div>

            {data.categories.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <h3>No categories yet</h3>
                    <p>Create categories to organize your content</p>
                </div>
            ) : (
                <div className="categories-grid">
                    {data.categories.map(category => (
                        <div key={category.id} className="category-card">
                            <div className="category-color" style={{ background: category.color }}></div>
                            <div className="category-info">
                                <h3>{category.name}</h3>
                                <p>{category.description || 'No description'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;
