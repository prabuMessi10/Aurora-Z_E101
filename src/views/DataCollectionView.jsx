import React, { useRef, useState } from 'react';
import './DataCollectionView.css';

const DataCollectionView = ({ onUpload }) => {
    const fileInputRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadType, setUploadType] = useState('trip');

    const handleFabClick = (type = 'trip') => {
        setUploadType(type);
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsProcessing(true);

        setTimeout(() => {
            const mockTrip = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                platform: 'Uber',
                amount: (Math.random() * (25 - 10) + 10).toFixed(2),
                status: Math.random() > 0.5 ? 'Fair' : 'Underpaid',
                screenshot: URL.createObjectURL(file),
                type: uploadType
            };

            onUpload(mockTrip);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="view-container data-collection-view">
            {isProcessing && (
                <div className="processing-overlay glass-panel">
                    <div className="spinner"></div>
                    <p>Analyzing Receipt...</p>
                </div>
            )}

            {/* A. Action Hero Section */}
            <div className="action-hero glass-panel">
                <h2 className="hero-title">📊 Build Evidence</h2>
                <p className="hero-subtitle">Upload receipts to reveal algorithmic patterns</p>

                <button
                    className="hero-upload-btn"
                    onClick={() => handleFabClick('trip')}
                    disabled={isProcessing}
                >
                    <span className="btn-icon">📤</span>
                    <span className="btn-text">Scan Receipt</span>
                    <div className="btn-glow"></div>
                </button>
            </div>

            {/* B. Ghost Chart Visualization */}
            <div className="glass-panel ghost-chart-container">
                <div className="ghost-chart">
                    {/* SVG Ghost Chart */}
                    <svg className="chart-svg" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 10,80 L 50,70 L 90,75 L 130,60 L 170,65 L 210,50 L 250,55 L 290,45"
                            stroke="rgba(99, 102, 241, 0.2)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="5,5"
                        />
                        {/* Data points */}
                        <circle cx="50" cy="70" r="4" fill="rgba(99, 102, 241, 0.3)" />
                        <circle cx="90" cy="75" r="4" fill="rgba(99, 102, 241, 0.3)" />
                        <circle cx="130" cy="60" r="4" fill="rgba(99, 102, 241, 0.3)" />
                        <circle cx="170" cy="65" r="4" fill="rgba(99, 102, 241, 0.3)" />
                        <circle cx="210" cy="50" r="4" fill="rgba(99, 102, 241, 0.3)" />
                        <circle cx="250" cy="55" r="4" fill="rgba(99, 102, 241, 0.3)" />
                    </svg>

                    {/* Lock Overlay */}
                    <div className="chart-lock-overlay">
                        <div className="lock-icon">🔒</div>
                        <p className="lock-text">Upload 3 trips to reveal your hourly wage trend</p>
                        <div className="progress-indicator">
                            <span className="progress-count">0/3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* D. Quick-Tap Shortcuts */}
            <div className="glass-panel quick-shortcuts">
                <h3 className="shortcuts-title">Quick Upload</h3>
                <div className="shortcut-buttons">
                    <button
                        className="shortcut-btn"
                        onClick={() => handleFabClick('trip')}
                    >
                        <span className="shortcut-icon">🧾</span>
                        <span className="shortcut-label">Trip</span>
                    </button>

                    <button
                        className="shortcut-btn"
                        onClick={() => handleFabClick('weekly')}
                    >
                        <span className="shortcut-icon">💰</span>
                        <span className="shortcut-label">Weekly</span>
                    </button>

                    <button
                        className="shortcut-btn"
                        onClick={() => handleFabClick('offer')}
                    >
                        <span className="shortcut-icon">📣</span>
                        <span className="shortcut-label">Offer</span>
                    </button>
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default DataCollectionView;
