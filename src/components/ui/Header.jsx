import React from 'react';
import './Header.css';

const Header = ({ onProfileClick }) => {
    return (
        <header className="app-header glass-panel">
            <div className="header-left">
                <div className="logo-placeholder">
                    <span className="logo-icon">🔓</span>
                    <div className="logo-text-container">
                        <span className="logo-text">ClearPay</span>
                        <span className="logo-tagline">Worker Intel</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                {/* Profile Avatar */}
                <button className="profile-avatar" onClick={onProfileClick} title="View Profile">
                    <span>👤</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
