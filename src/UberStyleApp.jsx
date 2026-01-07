import React, { useState, useEffect, useRef } from 'react';
import './UberStyleApp.css';

// --- Icons (unchanged) ---
const Icons = {
    Home: () => <span className="icon">🏠</span>,
    Analytics: () => <span className="icon">📊</span>,
    History: () => <span className="icon">🕒</span>,
    Log: () => <span className="icon">✏️</span>,
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

// --- Mock Data ---
const initialHistory = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    date: `2026-01-${20 - i}`,
    platform: i % 3 === 0 ? 'DoorDash' : i % 2 === 0 ? 'Uber' : 'Lyft',
    time: `${10 + (i % 5)}:${10 * (i % 6)} ${i % 2 === 0 ? 'AM' : 'PM'}`,
    distance: (5 + i * 1.5).toFixed(1),
    duration: 15 + i * 5,
    pay: (250 + i * 45).toFixed(2),
    tips: i % 3 === 0 ? (i * 10).toFixed(2) : '0.00',
    status: i === 0 ? 'Pending' : 'Verified'
}));

// 1. Landing Page
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            onLogin({ username: formData.username || formData.email.split('@')[0], email: formData.email });
        }
    };

    return (
        <div className="auth-page">
            <div className="enhanced-auth-card">
                <div className="auth-header">
                    <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
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
                    <button type="submit" className="btn-auth-submit">{mode === 'login' ? 'Log In' : 'Create Account'}</button>
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
const HistoryView = ({ history }) => {
    const [filter, setFilter] = useState('All');
    const filtered = filter === 'All' ? history : history.filter(h => h.platform === filter);

    const downloadCSV = () => {
        const headers = ["ID", "Date", "Platform", "Time", "Distance", "Earnings"];
        const rows = filtered.map(t => [t.id, t.date, t.platform, t.time, t.distance, t.pay]);
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "giggod_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="view-container">
            <div className="section-header">
                <h2>Trip History</h2>
                <div className="actions">
                    <input type="text" placeholder="Search trips..." className="search-input" />
                    <button className="btn-outline" onClick={() => alert('Filter menu toggled')}><Icons.Filter /> Filter</button>
                    <button className="btn-outline" onClick={downloadCSV}><Icons.Download /> CSV</button>
                </div>
            </div>

            <div className="filter-tabs">
                {['All', 'Uber', 'Lyft', 'DoorDash'].map(f => (
                    <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="history-table-container">
                <table className="history-table premium">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Date & Time</th>
                            <th>Platform</th>
                            <th>Details</th>
                            <th className="text-right">Earnings</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((trip, idx) => (
                            <tr key={idx}>
                                <td>
                                    <span className={`status-pill ${trip.status.toLowerCase()}`}>
                                        {trip.status === 'Verified' ? '✓ Verified' : '⟳ Pending'}
                                    </span>
                                </td>
                                <td>
                                    <div className="cell-date">{trip.date}</div>
                                    <div className="cell-sub">{trip.time}</div>
                                </td>
                                <td><PlatformBadge platform={trip.platform} /></td>
                                <td>
                                    <div className="cell-detail">{trip.distance} km • {trip.duration} min</div>
                                    <div className="cell-sub">Tips: ₹{trip.tips}</div>
                                </td>
                                <td className="text-right">
                                    <div className="cell-amount">₹{trip.pay}</div>
                                </td>
                                <td className="text-right">
                                    <button className="btn-icon-only">⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

// 8. Log Data View (UPDATED with requested fields)
const LogDataView = ({ onSave }) => {
    const [entry, setEntry] = useState({
        platform: 'Uber',
        date: '',
        timeSlot: '', // 2. Time Slot
        distance: '', // 3. Distance travelled
        duration: '', // 4. Duration
        pay: '',      // 5. Pay received
        dayOfWeek: '',// 6. Day of Week
        location: ''  // 7. Location
    });

    // Auto-calculate Day of Week from Date
    useEffect(() => {
        if (entry.date) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const d = new Date(entry.date);
            setEntry(e => ({ ...e, dayOfWeek: days[d.getDay()] }));
        }
    }, [entry.date]);

    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsScanning(true);
            setTimeout(() => {
                setEntry({
                    platform: 'Uber',
                    date: new Date().toISOString().split('T')[0],
                    timeSlot: 'Morning (6AM - 10AM)',
                    distance: '15.2',
                    duration: '25',
                    pay: '450.00',
                    dayOfWeek: 'Wednesday',
                    location: 'Downtown Core'
                });
                setIsScanning(false);
                alert('Screenshot Scanned! Form Auto-filled.');
            }, 2000);
        }
    };

    const save = (e) => {
        e.preventDefault();
        onSave(entry);
        setEntry({ platform: 'Uber', date: '', timeSlot: '', distance: '', duration: '', pay: '', dayOfWeek: '', location: '' });
        alert('Entry Saved to History!');
    }

    return (
        <div className="view-container">
            <div className="log-layout">
                <div className="log-main">
                    <div className="section-header"><h2>Manual Entry</h2></div>
                    <form className="premium-form" onSubmit={save}>

                        {/* 1. Date & 6. Day of Week & 2. Time Slot */}
                        <div className="pf-section">
                            <h4>Trip Timing</h4>
                            <div className="form-row three-col">
                                <div className="form-group">
                                    <label>1. Date</label>
                                    <input type="date" required value={entry.date} onChange={e => setEntry({ ...entry, date: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>6. Day of Week</label>
                                    <input type="text" readOnly value={entry.dayOfWeek} placeholder="Auto-calc" style={{ background: '#222', color: '#888' }} />
                                </div>
                                <div className="form-group">
                                    <label>2. Time Slot</label>
                                    <select value={entry.timeSlot} onChange={e => setEntry({ ...entry, timeSlot: e.target.value })}>
                                        <option value="">Select Slot</option>
                                        <option>Morning (6AM - 10AM)</option>
                                        <option>Day (10AM - 4PM)</option>
                                        <option>Evening (4PM - 9PM)</option>
                                        <option>Night (9PM - 6AM)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 7. Location & Platform */}
                        <div className="pf-section">
                            <h4>Trip Context</h4>
                            <div className="form-row two-col">
                                <div className="form-group">
                                    <label>Platform</label>
                                    <select value={entry.platform} onChange={e => setEntry({ ...entry, platform: e.target.value })}>
                                        <option>Uber</option><option>Lyft</option><option>DoorDash</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>7. Location</label>
                                    <input type="text" placeholder="e.g. Downtown, Suburbs" value={entry.location} onChange={e => setEntry({ ...entry, location: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Distance, 4. Duration, 5. Pay */}
                        <div className="pf-section">
                            <h4>Trip Metrics</h4>
                            <div className="form-row three-col">
                                <div className="form-group">
                                    <label>3. Distance (km)</label>
                                    <input type="number" placeholder="0.0" value={entry.distance} onChange={e => setEntry({ ...entry, distance: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>4. Duration (min)</label>
                                    <input type="number" placeholder="0" value={entry.duration} onChange={e => setEntry({ ...entry, duration: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>5. Pay Received (₹)</label>
                                    <input type="number" placeholder="0.00" required value={entry.pay} onChange={e => setEntry({ ...entry, pay: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <button className="btn-primary full-width">Save Entry</button>
                    </form>
                </div>

                <div className="log-sidebar">
                    <div className={`upload-zone ${isScanning ? 'scanning' : ''}`} onClick={() => fileInputRef.current.click()}>
                        <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} />
                        <span className="icon">📸</span>
                        <h3>{isScanning ? 'Scanning...' : 'Upload Screenshot'}</h3>
                        <p>{isScanning ? 'Analyzing receipt data...' : 'Drag & drop or click to auto-fill'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 9. Dashboard Wrapper
const Dashboard = ({ user, onLogout, onUpdateUser }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [history, setHistory] = useState(initialHistory);

    const handleSaveLog = (entry) => {
        const newLog = {
            id: history.length + 1,
            date: entry.date || new Date().toISOString().split('T')[0],
            platform: entry.platform,
            time: entry.timeSlot || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Use TimeSlot if avail
            distance: entry.distance || '0',
            duration: entry.duration || '0', // New field
            pay: entry.pay || '0.00',
            tips: '0.00',
            status: 'Pending'
        };
        setHistory([newLog, ...history]);
        setActiveTab('history');
    };

    // Sidebar items
    const menuItems = [
        { id: 'home', icon: <Icons.Home />, label: 'Home' },
        { id: 'analytics', icon: <Icons.Analytics />, label: 'Analytics' },
        { id: 'history', icon: <Icons.History />, label: 'History' },
        { id: 'log-data', icon: <Icons.Log />, label: 'Log Data' },
        { id: 'profile', icon: <Icons.Profile />, label: 'Profile' },
        { id: 'settings', icon: <Icons.Settings />, label: 'Settings' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics': return <AnalyticsView />;
            case 'history': return <HistoryView history={history} />;
            case 'log-data': return <LogDataView onSave={handleSaveLog} />;
            case 'settings': return <SettingsView />;
            case 'profile': return <ProfileView user={user} onUpdateUser={onUpdateUser} />;
            default: return (
                <div className="dashboard-home-enhanced view-container">
                    <header className="dash-hero">
                        <h1>Hi, {user.username}</h1>
                        <p className="dash-subtitle">Your latest transparency report is ready.</p>
                    </header>
                    <div className="stats-row">
                        <StatCard title="Total Earnings" value="₹24,500" icon={<Icons.Money />} trend="+12%" colorClass="positive" />
                        <StatCard title="Hourly Avg" value="₹245/hr" icon={<Icons.Time />} trend="-2%" colorClass="negative" />
                        <StatCard title="Trips This Week" value="48" icon={<Icons.Car />} trend="+5" colorClass="positive" />
                    </div>

                    <div className="content-grid">
                        <div className="recent-history-section">
                            <div className="rh-header">
                                <h3>Recent Activity</h3>
                                <button className="btn-secondary" onClick={() => setActiveTab('history')}>View All</button>
                            </div>
                            <div className="recent-list">
                                {history.slice(0, 4).map((h, i) => (
                                    <div className="recent-item" key={i}>
                                        <div className="recent-icon-box">
                                            {h.platform === 'Uber' ? '🚗' : h.platform === 'Lyft' ? '🚙' : '🍔'}
                                        </div>
                                        <div className="recent-info">
                                            <h4>{h.platform} Trip</h4>
                                            <span>{h.date} • {h.time}</span>
                                        </div>
                                        <div className="recent-amount">
                                            + ₹{h.pay}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quick-actions-section">
                            <h3>Active Platforms</h3>
                            <div className="platform-card-grid">
                                <div className="p-card-mini">
                                    <div className="p-card-left">
                                        <span className="p-dot" style={{ background: '#000', border: '1px solid #333' }}></span>
                                        <strong>Uber</strong>
                                    </div>
                                    <span className="status-pill verified">Connected</span>
                                </div>
                                <div className="p-card-mini">
                                    <div className="p-card-left">
                                        <span className="p-dot" style={{ background: '#ff00bf' }}></span>
                                        <strong>Lyft</strong>
                                    </div>
                                    <span className="status-pill verified">Connected</span>
                                </div>
                                <div className="p-card-mini">
                                    <div className="p-card-left">
                                        <span className="p-dot" style={{ background: '#333' }}></span>
                                        <strong>DoorDash</strong>
                                    </div>
                                    <span className="status-pill pending">Syncing...</span>
                                </div>
                            </div>
                        </div>
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
