import React from 'react';
import './BottomNav.css';

const BottomNav = ({ activeTab, setActiveTab, onUploadClick }) => {
  const navItems = [
    { id: 'home', label: 'Data', icon: '📊' },
    { id: 'upload', label: 'Upload', icon: '📤', isCenter: true },
    { id: 'evidence', label: 'Evidence', icon: '🔍' },
    { id: 'insights', label: 'Insights', icon: '💡' },
  ];

  return (
    <nav className="bottom-nav glass-panel">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.isCenter ? 'center-upload' : ''}`}
          onClick={() => item.isCenter ? onUploadClick() : setActiveTab(item.id)}
        >
          <span className={`nav-icon ${item.isCenter ? 'icon-large' : ''}`}>{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
