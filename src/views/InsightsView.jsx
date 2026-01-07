import React from 'react';
import './InsightsView.css';

const InsightsView = ({ trips }) => {
    // Calculate basic insights from trips
    const avgAmount = trips.length > 0
        ? (trips.reduce((sum, t) => sum + parseFloat(t.amount), 0) / trips.length).toFixed(2)
        : '0.00';

    const fairCount = trips.filter(t => t.status === 'Fair').length;
    const underpaidCount = trips.filter(t => t.status === 'Underpaid').length;

    return (
        <div className="view-container insights-view">
            <h2>💡 Algorithmic Insights</h2>

            {trips.length < 5 ? (
                <div className="glass-panel insufficient-data">
                    <span style={{ fontSize: '2rem' }}>📈</span>
                    <p className="title">Need More Data</p>
                    <p className="subtitle">
                        Upload at least 5 trips to start detecting patterns
                    </p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(trips.length / 5) * 100}%` }}
                        ></div>
                    </div>
                    <p className="count">{trips.length}/5 trips</p>
                </div>
            ) : (
                <>
                    {/* Pattern Detection */}
                    <div className="glass-panel insight-card">
                        <h3>🔍 Fair Pay Analysis</h3>
                        <div className="fairness-breakdown">
                            <div className="fairness-item fair">
                                <span className="count">{fairCount}</span>
                                <span className="label">Fair</span>
                            </div>
                            <div className="fairness-item underpaid">
                                <span className="count">{underpaidCount}</span>
                                <span className="label">Underpaid</span>
                            </div>
                        </div>
                        <p className="insight-text">
                            {underpaidCount > fairCount
                                ? '⚠️ Majority of your trips appear underpaid'
                                : '✓ Most trips are fairly compensated'}
                        </p>
                    </div>

                    {/* Average Detection */}
                    <div className="glass-panel insight-card">
                        <h3>📊 Baseline Rate</h3>
                        <div className="metric-large">
                            ${avgAmount}
                        </div>
                        <p className="metric-label">Average Per Trip</p>
                        <p className="insight-text">
                            This is your personal baseline. We'll alert you if trips fall significantly below this.
                        </p>
                    </div>

                    {/* Algorithm Changes */}
                    <div className="glass-panel insight-card">
                        <h3>🔔 Change Detection</h3>
                        <div className="alert-status">
                            <span className="status-icon">✓</span>
                            <span className="status-text">No significant changes detected</span>
                        </div>
                        <p className="insight-text">
                            We're monitoring for sudden drops in pay or algorithm modifications.
                        </p>
                    </div>

                    {/* Bias Detection (Placeholder) */}
                    <div className="glass-panel insight-card disabled">
                        <h3>⚖️ Bias Analysis</h3>
                        <p className="insight-text muted">
                            This feature requires demographic data and community comparison.
                            Complete your profile to enable.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default InsightsView;
