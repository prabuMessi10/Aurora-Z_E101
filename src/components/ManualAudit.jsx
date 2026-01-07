import React, { useState } from 'react';

// SVG Icons
const Icons = {
    Search: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Alert: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Check: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
        </svg>
    )
};

const ManualAudit = ({ user }) => {
    const [formData, setFormData] = useState({
        platform: 'Uber',
        vehicle: 'Bike',
        pay: '',
        distance: '',
        duration: '',
        wait_time: '0',
        surge: '1.0',
        traffic: 'Medium',
        tolls: '0'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [smartText, setSmartText] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);

    // Fetch user stats on mount
    React.useEffect(() => {
        if (user && user._id) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/user/stats/${user._id}`);
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleSmartPaste = async () => {
        if (!smartText.trim()) return;
        setIsExtracting(true);
        console.log("✨ Extracting from:", smartText);
        try {
            const response = await fetch('http://localhost:5001/api/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: smartText })
            });
            const result = await response.json();
            if (result.success) {
                const data = result.data;
                setFormData(prev => ({
                    ...prev,
                    platform: data.platform || prev.platform,
                    vehicle: data.vehicle || prev.vehicle,
                    pay: data.total_pay || '',
                    distance: data.app_shown_dist_km || '',
                    duration: data.duration_min || '',
                    wait_time: data.wait_time_min || '0',
                    surge: data.surge_multiplier || '1.0',
                    traffic: data.traffic_level || 'Medium',
                    tolls: data.tolls_paid || '0'
                }));
                setSmartText('');
                alert('Details Extracted!');
            }
        } catch (error) {
            console.error('Extraction error:', error);
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        if (!user || !user._id) {
            alert("User session error. Please log in again.");
            setLoading(false);
            return;
        }

        console.log("🚀 Submitting Audit for User:", user._id);
        try {
            const body = {
                platform: formData.platform,
                userId: user._id,
                vehicle_type: formData.vehicle,
                metrics: {
                    total_pay: parseFloat(formData.pay),
                    estimated_distance_km: parseFloat(formData.distance),
                    duration_min: parseFloat(formData.duration),
                    wait_time_min: parseFloat(formData.wait_time)
                },
                conditions: {
                    surge_multiplier: parseFloat(formData.surge),
                    traffic_level: formData.traffic,
                    tolls_paid: parseFloat(formData.tolls)
                }
            };
            console.log("📦 Body to send:", body);

            const response = await fetch('http://localhost:5001/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            setResult(data.ai_result);
            fetchStats();
        } catch (error) {
            console.error('Audit error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Forensic Trip Audit</h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>Uncover the truth behind every trip pay structure</p>
                </div>
                <button onClick={user.onBack} style={{ background: 'white', color: '#6b7280', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    ← Back to Chat
                </button>
            </div>

            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #efefff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Manual Earnings</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#7c3aed' }}>₹{stats.total_earnings}</div>
                    </div>
                    {/* ... other stats same ... */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #efefff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Trips Audited</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#667eea' }}>{stats.total_trips}</div>
                    </div>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #efefff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Avg. Pay Per Trip</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>₹{stats.avg_per_trip}</div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <div>
                    {/* Smart Paste for Audit */}
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>✨</span>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Smart Audit Paste</h3>
                        </div>
                        <textarea
                            value={smartText}
                            onChange={e => setSmartText(e.target.value)}
                            placeholder="Paste trip details or type a summary... e.g., 'Uber trip, 15km, 25 mins, paid 350'"
                            style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '1rem', resize: 'none' }}
                        />
                        <button
                            onClick={handleSmartPaste}
                            disabled={isExtracting || !smartText.trim()}
                            style={{ width: '100%', padding: '10px', background: '#334155', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: isExtracting ? 0.7 : 1 }}
                        >
                            {isExtracting ? 'Extracting...' : 'Auto-fill Form'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Platform</label>
                                <select value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                    <option>Uber</option><option>Ola</option><option>Rapido</option><option>Swiggy</option><option>Zomato</option><option>Porter</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Vehicle</label>
                                <select value={formData.vehicle} onChange={e => setFormData({ ...formData, vehicle: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                    <option>Bike</option><option>Auto</option><option>Car</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Pay (₹)</label>
                                <input type="number" required value={formData.pay} onChange={e => setFormData({ ...formData, pay: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Dist (km)</label>
                                <input type="number" required value={formData.distance} onChange={e => setFormData({ ...formData, distance: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Time (min)</label>
                                <input type="number" required value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Surge (x)</label>
                                <input type="number" step="0.1" value={formData.surge} onChange={e => setFormData({ ...formData, surge: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Traffic</label>
                                <select value={formData.traffic} onChange={e => setFormData({ ...formData, traffic: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                    <option>Low</option><option>Medium</option><option>High</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tolls (₹)</label>
                                <input type="number" value={formData.tolls} onChange={e => setFormData({ ...formData, tolls: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Performing AI Audit...' : 'Audit Fair Pay'}
                        </button>
                    </form>
                </div>

                {/* Results Area */}
                <div style={{
                    background: result ? (result.verdict?.toLowerCase() === 'fair' ? '#dcfce7' : '#fee2e2') : '#f9fafb',
                    padding: '2rem',
                    borderRadius: '12px',
                    minHeight: '400px',
                    border: result ? (result.verdict?.toLowerCase() === 'fair' ? '1px solid #e5e7eb' : '3px solid #ef4444') : '1px solid #e5e7eb',
                    boxShadow: result && result.verdict?.toLowerCase() !== 'fair' ? '0 0 30px rgba(239, 68, 68, 0.2)' : 'none',
                    transition: 'all 0.3s ease'
                }}>
                    {!result ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6b7280', textAlign: 'center' }}>
                            <Icons.Search />
                            <p style={{ marginTop: '1rem' }}>Enter trip details or use Smart Paste to get AI analysis</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                                color: result.verdict?.toLowerCase() === 'fair' ? '#16a34a' : '#dc2626'
                            }}>
                                {result.verdict?.toLowerCase() === 'fair' ? <Icons.Check /> : <Icons.Alert />}
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{result.verdict} Pay Structure</h2>
                            </div>

                            {result.economics && (
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Actual Pay per KM</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>₹{result.economics.pay_per_km}/km</div>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Audit Confidence</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{result.confidence_score}%</div>
                            </div>

                            <div style={{
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                background: result.verdict?.toLowerCase() === 'fair' ? 'rgba(255,255,255,0.6)' : '#fff1f1',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${result.verdict?.toLowerCase() === 'fair' ? '#667eea' : '#ef4444'}`
                            }}>
                                <div style={{ fontSize: '0.875rem', color: result.verdict?.toLowerCase() === 'fair' ? '#4b5563' : '#dc2626', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Forensic AI Breakdown</div>
                                <div style={{ lineHeight: '1.6', fontSize: '1.05rem', color: '#1f2937', whiteSpace: 'pre-line' }}>
                                    {result.analysis}
                                </div>
                            </div>

                            <div style={{
                                background: result.verdict?.toLowerCase() === 'fair' ? 'rgba(220, 252, 231, 0.5)' : '#fee2e2',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: `1px solid ${result.verdict?.toLowerCase() === 'fair' ? '#bbf7d0' : '#fecaca'}`
                            }}>
                                <div style={{ fontSize: '0.875rem', color: result.verdict?.toLowerCase() === 'fair' ? '#6b7280' : '#dc2626', marginBottom: '0.25rem' }}>Arbitration Recommendation</div>
                                <p style={{ fontWeight: '700', color: result.verdict?.toLowerCase() === 'fair' ? '#111827' : '#b91c1c' }}>{result.driver_action}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManualAudit;
