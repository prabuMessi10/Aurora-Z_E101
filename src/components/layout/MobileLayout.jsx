import React from 'react';
import Header from '../ui/Header';
import BottomNav from '../ui/BottomNav';
import './MobileLayout.css';

const MobileLayout = ({ children, activeTab, setActiveTab, onProfileClick, onUploadClick }) => {
    return (
        <div className="mobile-layout">
            <Header onProfileClick={onProfileClick} />
            <main className="content-area">
                {children}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onUploadClick={onUploadClick} />
        </div>
    );
};

export default MobileLayout;
