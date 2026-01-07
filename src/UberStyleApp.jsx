import React, { useState, useEffect, useRef } from 'react';
import './UberStyleApp.css';
import ChatBot from './components/ChatBot';
import ManualAudit from './components/ManualAudit';

// --- Icons (unchanged) ---
const Icons = {
    Home: () => <span className="icon">🏠</span>,
    Analytics: () => <span className="icon">📊</span>,
    Audit: () => <span className="icon">⚡</span>,
    History: () => <span className="icon">🕒</span>,
    Settings: () => <span className="icon">⚙️</span>,
    Profile: () => <span className="icon">👤</span>,
    Logout: () => <span className="icon logout-icon">⏻</span>,
    Search: () => <span className="icon">🔍</span>,
    Filter: () => <span className="icon">⚡</span>,
    Download: () => <span className="icon">📥</span>,
    Upload: () => <span className="icon">📤</span>,
    Check: () => <span className="icon success">✓</span>,
    Alert: () => <span className="icon warning">!</span>,
    Money: () => <span className="icon">💰</span>,
    Time: () => <span className="icon">⏱️</span>,
    Car: () => <span className="icon">🚗</span>,
    Map: () => <span className="icon">🗺️</span>,
    Cal: () => <span className="icon">📅</span>
};

// --- Menu Items (New Audit Added) ---
const menuItems = [
    { id: 'home', label: 'Home', icon: <Icons.Home /> },
    { id: 'audit', label: 'Audit Trip', icon: <Icons.Audit /> },
    { id: 'analytics', label: 'Analytics', icon: <Icons.Analytics /> },
    { id: 'history', label: 'History', icon: <Icons.History /> },
    { id: 'profile', label: 'Profile', icon: <Icons.Profile /> },
    { id: 'settings', label: 'Settings', icon: <Icons.Settings /> }
];

// --- Landing Page ---
const LandingPage = ({ onNavigate }) => {
    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="logo-section">
                    <span className="logo-symbol">✦</span>
                    <span className="logo-text">GigGod</span>
                </div>
                <div className="nav-actions">
                    <button className="btn-secondary" onClick={() => onNavigate('login')}>Log in</button>
                    <button className="btn-primary" onClick={() => onNavigate('signup')}>Sign up</button>
                </div>
            </nav>
            <main className="landing-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Transparency? <br />
                        <span className="hero-highlight">Reality.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your algorithmic thinking partner. Uncover payment patterns and take control of your gig data.
                    </p>
                    <div className="hero-auth-box">
                        <button className="btn-email-auth" onClick={() => onNavigate('login')}>
                            Get Started
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-image-container"></div>
                </div>
            </main>
        </div>
    );
};

// 2. Auth Page
const AuthPage = ({ mode, onLogin, onNavigate }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
            const response = await fetch(`http://localhost:5001${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Backend returns { user: { _id, username, email, ... } }
            onLogin(data.user);
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="enhanced-auth-card">
                <div className="auth-header">
                    <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                    {error && <div style={{ color: '#ef4444', background: '#fef2f2', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', marginTop: '10px' }}>{error}</div>}
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    {mode === 'signup' && (
                        <div className="form-group floating">
                            <input type="text" placeholder=" " value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                            <label>Username</label>
                        </div>
                    )}
                    <div className="form-group floating">
                        <input type="email" placeholder=" " value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                        <label>Email Address</label>
                    </div>
                    <div className="form-group floating">
                        <input type="password" placeholder=" " value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? 'Processing...' : (mode === 'login' ? 'Log In' : 'Create Account')}
                    </button>
                </form>
                <div className="auth-footer">
                    <p onClick={() => onNavigate(mode === 'login' ? 'signup' : 'login')}>
                        {mode === 'login' ? "Create an account" : "Log in"}
                    </p>
                </div>
            </div>
        </div>
    );
};

// 3. Stateless Components
const StatCard = ({ title, value, icon, trend, colorClass }) => (
    <div className="stat-card">
        <div className="stat-top">
            <span className="stat-icon">{icon}</span>
            {trend && <span className={`stat-trend ${colorClass}`}>{trend}</span>}
        </div>
        <div className="stat-content">
            <span className="stat-title">{title}</span>
            <div className="stat-value">{value}</div>
        </div>
    </div>
);

const PlatformBadge = ({ platform }) => {
    let cls = 'generic';
    if (platform === 'Uber') cls = 'uber';
    if (platform === 'Lyft') cls = 'lyft';
    if (platform === 'DoorDash') cls = 'doordash';
    return <span className={`badge ${cls}`}>{platform}</span>;
}

// 4. Analytics View
const AnalyticsView = () => {
    return (
        <div className="view-container">
            <div className="section-header">
                <h2>Analytics</h2>
                <div className="actions">
                    <button className="btn-outline">Last 7 Days ▼</button>
                    <button className="btn-primary" onClick={() => alert('PDF Report Generated!')}><Icons.Download /> Report</button>
                </div>
            </div>

            <div className="analytics-grid-premium">
                <div className="chart-card main-chart">
                    <div className="card-header">
                        <h3>Earnings Performance</h3>
                        <div className="legend">
                            <span className="legend-item"><span className="dot p1"></span> Earnings</span>
                            <span className="legend-item"><span className="dot p2"></span> Avg</span>
                        </div>
                    </div>
                    <div className="complex-bar-chart">
                        {[65, 85, 45, 95, 75, 55, 90].map((h, i) => (
                            <div key={i} className="bar-column">
                                <div className="bar-value-tooltip">₹{h * 10}</div>
                                <div className="bar-fill-gradient" style={{ '--h': `${h}%` }}></div>
                                <div className="bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-card side-stats">
                    <h3>Platform Mix</h3>
                    <div className="donut-chart-css">
                        <div className="donut-slice uber" style={{ '--p': 60, '--c': '#000' }}></div>
                        <div className="donut-center">
                            <span>Total</span>
                            <strong>142</strong>
                            <small>Trips</small>
                        </div>
                    </div>
                    <div className="platform-breakdown">
                        <div className="pb-row">
                            <span className="pb-name"><span className="dot uber"></span> Uber</span>
                            <span className="pb-val">60%</span>
                        </div>
                        <div className="pb-row">
                            <span className="pb-name"><span className="dot lyft"></span> Lyft</span>
                            <span className="pb-val">30%</span>
                        </div>
                        <div className="pb-row">
                            <span className="pb-name"><span className="dot dd"></span> DoorDash</span>
                            <span className="pb-val">10%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="insights-row">
                <div className="insight-card warning">
                    <Icons.Alert />
                    <div>
                        <h4>Wage Gap Detected</h4>
                        <p>On Tuesday, your average hourly dropped 15% below market rate.</p>
                    </div>
                </div>
                <div className="insight-card success">
                    <Icons.Check />
                    <div>
                        <h4>Consistency Bonus</h4>
                        <p>You maintained a 4.9 rating across all platforms this week.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. History View
const HistoryView = ({ user }) => {
    const [chatLogs, setChatLogs] = useState([]);
    const [loadingChat, setLoadingChat] = useState(false);

    useEffect(() => {
        if (user?._id) {
            fetchChatLogs();
        }
    }, [user?._id]);

    const fetchChatLogs = async () => {
        setLoadingChat(true);
        try {
            const response = await fetch(`http://localhost:5001/api/chat/history/${user._id}`);
            const data = await response.json();
            if (data.success) {
                setChatLogs(data.messages.reverse()); // Show newest first
            }
        } catch (error) {
            console.error('Error fetching chat logs:', error);
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <div className="view-container">
            <div className="section-header">
                <h2>AI Chat Logs</h2>
            </div>

            <div className="chat-logs-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px 0' }}>
                {loadingChat ? (
                    <p>Loading conversation history...</p>
                ) : chatLogs.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>No chat history found.</p>
                ) : (
                    chatLogs.map((log, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            padding: '1.25rem',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    color: log.role === 'user' ? '#7c3aed' : '#10b981'
                                }}>
                                    {log.role === 'user' ? 'YOU' : 'AI ADVISOR'}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                    {new Date(log.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div style={{
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                color: '#374151',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {log.content}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// 6. Settings View
const SettingsView = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('appSettings');
        return saved ? JSON.parse(saved) : { darkMode: true, compact: false, alerts: true, report: true };
    });

    useEffect(() => {
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }, [settings]);

    const toggle = (k) => setSettings(p => ({ ...p, [k]: !p[k] }));

    return (
        <div className="view-container">
            <h2>Account Settings</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3>Display & App</h3>
                    <div className="settings-row">
                        <div className="set-label">
                            <strong>Dark Mode</strong>
                            <p>Easy on the eyes</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={settings.darkMode} onChange={() => toggle('darkMode')} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="settings-card">
                    <h3>Notifications</h3>
                    <div className="settings-row">
                        <div className="set-label">
                            <strong>Wage Alerts</strong>
                            <p>Get notified of pay discrepancies</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={settings.alerts} onChange={() => toggle('alerts')} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 7. Profile View
const ProfileView = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...user });

    const handleSave = (e) => {
        e.preventDefault();
        onUpdateUser(editForm);
        setIsEditing(false);
        alert('Profile Updated Successfully!');
    }

    return (
        <div className="view-container">
            <div className="profile-hero">
                <div className="profile-cover"></div>
                <div className="profile-content">
                    <div className="profile-avatar-xl">{user.username[0].toUpperCase()}</div>
                    <div className="profile-names">
                        <h2>{user.username}</h2>
                        <p className="verified-tag"><Icons.Check /> Verified Data Contributor</p>
                    </div>
                </div>
            </div>
            <div className="profile-grid">
                <div className="profile-card stats">
                    <h3>Lifetime Stats</h3>
                    <div className="p-stats-grid">
                        <div className="ps-item"><strong>4.95</strong> <small>Avg Rating</small></div>
                        <div className="ps-item"><strong>1.2k</strong> <small>Trips Logged</small></div>
                    </div>
                </div>
                <div className="profile-card security">
                    <h3><Icons.Settings /> Security
                        <button className="btn-outline" style={{ float: 'right', fontSize: '0.7rem' }} onClick={() => {
                            if (isEditing) setEditForm({ ...user }); // cancel
                            setIsEditing(!isEditing);
                        }}>
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </h3>
                    <form className="security-form" onSubmit={handleSave}>
                        <div className="form-group-sm">
                            <label>Username</label>
                            <input type="text" value={isEditing ? editForm.username : user.username}
                                readOnly={!isEditing}
                                onChange={e => setEditForm({ ...editForm, username: e.target.value })} />
                        </div>
                        <div className="form-group-sm">
                            <label>Email</label>
                            <input type="text" value={isEditing ? editForm.email : user.email}
                                readOnly={!isEditing}
                                onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                        </div>
                        {isEditing && (
                            <div className="form-group-sm">
                                <label>New Password</label>
                                <input type="password" placeholder="New Password" />
                            </div>
                        )}
                        {isEditing && <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.5rem' }}>Save Changes</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}



// 9. Dashboard Wrapper (Corrected prop names for handleSaveLog)
const Dashboard = ({ user, onLogout, onUpdateUser }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user && user._id) {
            fetchTrips();
        }
    }, [user._id]);

    const fetchTrips = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/trips/${user._id}`);
            const data = await response.json();
            if (data.success) {
                const formattedTrips = data.trips.map(t => ({
                    id: t._id,
                    date: new Date(t.createdAt).toISOString().split('T')[0],
                    platform: t.platform,
                    time: new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    distance: t.metrics.actual_distance_km || t.metrics.estimated_distance_km,
                    duration: t.metrics.duration_min,
                    pay: t.metrics.total_pay,
                    tips: '0.00', // Tips logic can be expanded later
                    status: t.ai_verdict ? t.ai_verdict.verdict : 'Verified'
                }));
                setHistory(formattedTrips);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };



    const handleAuditComplete = (auditData) => {
        const newLog = {
            id: history.length + 1,
            date: new Date().toISOString().split('T')[0],
            platform: auditData.platform,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            distance: auditData.metrics.actual_distance_km || auditData.metrics.estimated_distance_km || '0',
            duration: auditData.metrics.duration_min || '0',
            pay: auditData.metrics.total_pay || '0.00',
            tips: '0.00',
            status: auditData.ai_result.verdict // Use verdict as status (Fair/Underpaid/etc)
        };
        setHistory([newLog, ...history]);
    };

    const handleDeleteTrip = async (tripId) => {
        if (!window.confirm("Are you sure you want to remove this trip record?")) return;
        try {
            const response = await fetch(`http://localhost:5001/api/trips/${tripId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setHistory(prev => prev.filter(t => t.id !== tripId));
            } else {
                alert("Failed to delete trip: " + data.error);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert("Error connecting to server for deletion.");
        }
    };

    // Sidebar items
    const menuItems = [
        { id: 'home', icon: <Icons.Home />, label: 'Home' },
        { id: 'analytics', icon: <Icons.Analytics />, label: 'Analytics' },
        { id: 'history', icon: <Icons.History />, label: 'History' },
        { id: 'profile', icon: <Icons.Profile />, label: 'Profile' },
        { id: 'settings', icon: <Icons.Settings />, label: 'Settings' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics': return <AnalyticsView />;
            case 'history': return <HistoryView user={user} />;
            case 'settings': return <SettingsView />;
            case 'profile': return <ProfileView user={user} onUpdateUser={onUpdateUser} />;
            case 'audit': return <ManualAudit user={{ ...user, onBack: () => setActiveTab('home') }} />;
            default: return (
                <div className="dashboard-home-enhanced view-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingBottom: '15px'
                    }}>
                        <button
                            onClick={() => setActiveTab('audit')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'white',
                                color: '#374151',
                                border: '1px solid #e5e7eb',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ color: '#7c3aed' }}>⚡</span> Manual Entry
                        </button>
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <ChatBot user={user} onAuditComplete={handleAuditComplete} />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar-enhanced">
                <div className="sidebar-top">
                    <div className="sidebar-brand">GigGod</div>
                    <nav className="sidebar-menu">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={activeTab === item.id ? 'active' : ''}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.icon} {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="sidebar-bottom">
                    <div className="user-profile-row">
                        <div className="user-mini clickable" onClick={() => setActiveTab('profile')}>
                            <div className="avatar">{user.username[0].toUpperCase()}</div>
                            <div className="user-text">
                                <span className="u-name">{user.username}</span>
                                <span className="u-role">Basic Plan</span>
                            </div>
                        </div>
                        <button onClick={onLogout} className="btn-logout-small" title="Logout">
                            <Icons.Logout />
                        </button>
                    </div>
                </div>
            </aside>
            <main className="main-area">
                {renderContent()}
            </main>
        </div>
    );
};

// Main App
const UberStyleApp = () => {
    const [view, setView] = useState('landing');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setView('dashboard');
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setView('dashboard');
    };

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Persist update
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        setView('landing');
    };

    return (
        <div className="app-root">
            {view === 'landing' && <LandingPage onNavigate={setView} />}
            {(view === 'login' || view === 'signup') && <AuthPage mode={view} onLogin={handleLogin} onNavigate={setView} />}
            {view === 'dashboard' && <Dashboard user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />}
        </div>
    );
};

export default UberStyleApp;
