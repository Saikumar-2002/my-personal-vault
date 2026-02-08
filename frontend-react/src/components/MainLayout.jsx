import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, currentView, onViewChange, user, onSearch, onAddNew }) => {
    return (
        <div className="app-container">
            <Sidebar
                currentView={currentView}
                onViewChange={onViewChange}
                user={user}
            />
            <main className="main-content">
                <Header
                    onSearch={onSearch}
                    onAddNew={onAddNew}
                />
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
