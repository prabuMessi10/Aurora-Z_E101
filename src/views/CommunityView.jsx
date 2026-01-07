import React from 'react';

const CommunityView = () => {
    return (
        <div className="view-container">
            <h2>Community Intel</h2>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>Hotspot Map loading...</p>
            </div>
        </div>
    );
};

export default CommunityView;
