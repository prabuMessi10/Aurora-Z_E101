import React, { useState } from 'react';
import './ProfileView.css';

const ProfileView = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [workerData, setWorkerData] = useState({
        name: '',
        platform: '',
        city: '',
        vehicleType: '',
        tenure: '',
        totalTrips: ''
    });

    const handleVerification = () => {
        // Simulate verification process
        setTimeout(() => {
            setIsVerified(true);
        }, 1500);
    };

    return (
        <div className="view-container profile-view">
            <h2>Worker Profile</h2>

            {/* Verification Status */}
            <div className={`verification-badge glass-panel ${isVerified ? 'verified' : 'unverified'}`}>
                <div className="badge-icon">
                    {isVerified ? '✓' : '🔒'}
                </div>
                <div className="badge-content">
                    <h3>{isVerified ? 'Verified Worker' : 'Unverified'}</h3>
                    <p>{isVerified
                        ? 'Your identity has been confirmed'
                        : 'Complete verification to contribute data'
                    }</p>
                </div>
            </div>

            {/* Profile Form */}
            <div className="glass-panel profile-form">
                <div className="form-section">
                    <label>Primary Platform</label>
                    <select
                        value={workerData.platform}
                        onChange={(e) => setWorkerData({ ...workerData, platform: e.target.value })}
                    >
                        <option value="">Select Platform</option>
                        <option value="uber">Uber</option>
                        <option value="lyft">Lyft</option>
                        <option value="doordash">DoorDash</option>
                        <option value="instacart">Instacart</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-section">
                    <label>City/Region</label>
                    <input
                        type="text"
                        placeholder="e.g., San Francisco, CA"
                        value={workerData.city}
                        onChange={(e) => setWorkerData({ ...workerData, city: e.target.value })}
                    />
                </div>

                <div className="form-section">
                    <label>Vehicle Type</label>
                    <select
                        value={workerData.vehicleType}
                        onChange={(e) => setWorkerData({ ...workerData, vehicleType: e.target.value })}
                    >
                        <option value="">Select Type</option>
                        <option value="car">Car</option>
                        <option value="bike">Motorcycle</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="walk">Walking</option>
                    </select>
                </div>

                <div className="form-section">
                    <label>Experience (months)</label>
                    <input
                        type="number"
                        placeholder="e.g., 12"
                        value={workerData.tenure}
                        onChange={(e) => setWorkerData({ ...workerData, tenure: e.target.value })}
                    />
                </div>

                <div className="form-section">
                    <label>Total Lifetime Trips (approx.)</label>
                    <input
                        type="number"
                        placeholder="e.g., 500"
                        value={workerData.totalTrips}
                        onChange={(e) => setWorkerData({ ...workerData, totalTrips: e.target.value })}
                    />
                </div>
            </div>

            {/* Verification Process */}
            {!isVerified && (
                <div className="glass-panel verification-panel">
                    <h3>📸 Proof of Platform</h3>
                    <p className="help-text">
                        To verify you're a real gig worker, upload a screenshot of your platform profile
                        (showing your name and trip count). This helps us fight fake data.
                    </p>

                    <button className="upload-proof-btn">
                        Upload Profile Screenshot
                    </button>

                    <button className="verify-btn" onClick={handleVerification}>
                        Complete Verification
                    </button>
                </div>
            )}

            {/* Data Privacy Info */}
            <div className="glass-panel privacy-info">
                <h4>🔒 Your Privacy</h4>
                <ul>
                    <li>We strip all personal identifiers before analysis</li>
                    <li>Data is never shared with platforms</li>
                    <li>You can delete your data anytime</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileView;
