import React from 'react';
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Video,
    Folder,
    Tag,
    LogOut
} from 'lucide-react';

const Sidebar = ({ currentView, onViewChange, user }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'notes', label: 'Notes', icon: FileText },
        { id: 'images', label: 'Images', icon: ImageIcon },
        { id: 'videos', label: 'Videos', icon: Video },
        { id: 'categories', label: 'Categories', icon: Folder },
        { id: 'tags', label: 'Tags', icon: Tag },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-small">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                        <defs>
                            <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#6366f1' }} />
                                <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                            </linearGradient>
                        </defs>
                        <rect width="40" height="40" rx="10" fill="url(#logoGradient2)" />
                        <path d="M12 14h16M12 20h16M12 26h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span>Knowledge Vault</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                            onClick={() => onViewChange(item.id)}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}

                <div className="nav-divider"></div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">
                        <span>{user?.email?.[0].toUpperCase() || 'U'}</span>
                    </div>
                    <div className="user-details">
                        <span>{user?.email || 'user@example.com'}</span>
                        <span className="user-role">Personal Vault</span>
                    </div>
                </div>
                <button className="btn-icon" title="Logout">
                    <LogOut size={20} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
