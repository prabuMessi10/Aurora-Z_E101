import React from 'react';
import './EvidenceView.css';

const EvidenceView = ({ trips }) => {
    return (
        <div className="view-container">
            <h2>Evidence Locker</h2>

            {trips.length === 0 ? (
                <div className="glass-panel empty-state">
                    <span style={{ fontSize: '2rem' }}>📂</span>
                    <p style={{ color: 'var(--color-text-muted)' }}>No trips uploaded yet.</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Upload receipts from the Home screen.</p>
                </div>
            ) : (
                <div className="trips-list">
                    {trips.map(trip => (
                        <div key={trip.id} className="glass-panel trip-card">
                            <div className="trip-header">
                                <span className="trip-platform">{trip.platform}</span>
                                <span className="trip-date">{trip.date}</span>
                            </div>
                            <div className="trip-body">
                                <span className="trip-amount">${trip.amount}</span>
                                <span className={`trip-status ${trip.status.toLowerCase()}`}>
                                    {trip.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EvidenceView;
