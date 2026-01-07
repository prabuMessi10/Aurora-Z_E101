import React, { useState, useRef, useEffect } from 'react';

// SVG Icons (FontAwesome-style)
const Icons = {
    Robot: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c.5 0 1 .19 1.41.59l.7.7C14.68 2.54 15.8 2 17 2c2.21 0 4 1.79 4 4 0 1.2-.54 2.32-1.29 2.89l.7.7c.4.41.59.91.59 1.41v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-9c0-.5.19-1 .59-1.41l.7-.7C3.54 8.32 3 7.2 3 6c0-2.21 1.79-4 4-4 1.2 0 2.32.54 2.89 1.29l.7-.7C11 2.19 11.5 2 12 2zM7 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    ),
    User: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
    ),
    Send: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
    ),
    Sparkles: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z" />
        </svg>
    )
};

// --- Compact Forensic Card Component ---
const ForensicCard = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data || !data.economics) return null;

    const { economics, verdict, confidence_score, analysis, driver_action } = data;

    return (
        <div className="forensic-card" style={{
            marginTop: '1rem',
            background: 'white',
            borderRadius: '12px',
            border: verdict?.toLowerCase() === 'fair' ? '1px solid #e5e7eb' : '2px solid #ef4444',
            overflow: 'hidden',
            boxShadow: verdict?.toLowerCase() === 'fair' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(239, 68, 68, 0.2)'
        }}>
            {/* Header / Summary */}
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: verdict?.toLowerCase() === 'fair' ? '#ecfdf5' : '#fee2e2'
            }}>
                <div>
                    <span style={{
                        fontWeight: '700',
                        color: verdict?.toLowerCase() === 'fair' ? '#059669' : '#dc2626',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Verdict: {verdict}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {confidence_score}% Confidence Score
                    </div>
                </div>
                <div style={{
                    background: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: '1px solid #e5e7eb'
                }}>
                    Net Rate: ₹{economics.pay_per_km}/km
                </div>
            </div>

            {/* Quick Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1px',
                background: '#f3f4f6',
                padding: '1px'
            }}>
                {[
                    { label: 'Comm. Est.', value: `₹${economics.platform_commission_est}`, icon: '🏢' },
                    { label: 'Fuel Cost', value: `₹${economics.fuel_usage_est}`, icon: '⛽' }
                ].map((item, i) => (
                    <div key={i} style={{ background: 'white', padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>{item.label}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{item.value}</div>
                    </div>
                ))}
            </div>

            {/* Action Item */}
            <div style={{
                padding: '0.75rem 1rem',
                background: verdict?.toLowerCase() === 'fair' ? '#f9fafb' : '#fef2f2',
                fontSize: '0.85rem',
                borderTop: verdict?.toLowerCase() === 'fair' ? '1px solid #f3f4f6' : '1px solid #fecaca'
            }}>
                <span style={{ fontWeight: '700', color: verdict?.toLowerCase() === 'fair' ? '#374151' : '#dc2626' }}>💡 Advice: </span>
                <span style={{ color: verdict?.toLowerCase() === 'fair' ? '#374151' : '#991b1b' }}>{driver_action}</span>
            </div>

            {/* Expandable Breakdown */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'white',
                    border: 'none',
                    borderTop: '1px solid #f3f4f6',
                    fontSize: '0.75rem',
                    color: '#6366f1',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                }}
            >
                {isExpanded ? 'Collapse Report ▲' : 'Show Forensic Breakdown ▼'}
            </button>

            {isExpanded && (
                <div style={{
                    padding: '1rem',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    color: '#4b5563',
                    borderTop: '1px solid #f3f4f6',
                    whiteSpace: 'pre-wrap',
                    background: '#fff'
                }}>
                    {analysis}
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #e5e7eb', fontSize: '0.8rem' }}>
                        <strong>The Euclidean Gap:</strong> {economics.distance_gap_km} km variance detected.
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Compact Live Pulse Card ---
const PulseCard = ({ data }) => {
    if (!data) return null;
    const { pulse_message, system_health_score, top_scam, risk_status } = data;

    const getRiskColor = (status) => {
        if (status === 'Low') return '#10b981';
        if (status === 'Medium') return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{
            marginTop: '1rem',
            background: '#1a1c23',
            borderRadius: '12px',
            padding: '1.25rem',
            color: 'white',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>Live Gig-Pulse</span>
                <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    background: getRiskColor(risk_status),
                    color: 'white'
                }}>
                    {risk_status} RISK
                </span>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                "{pulse_message}"
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '4px' }}>Health Score</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{system_health_score}%</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '4px' }}>Active Pattern</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{top_scam}</div>
                </div>
            </div>
        </div>
    );
};

const ChatBot = ({ user, onAuditComplete }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSmartPaste, setShowSmartPaste] = useState(false);
    const [smartText, setSmartText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (user && user._id) {
            fetchChatHistory();
        }
    }, [user._id]);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/chat/history/${user._id}`);
            const data = await response.json();
            if (data.success && data.messages.length > 0) {
                const formattedMessages = data.messages.map(m => ({
                    role: m.role,
                    content: m.content,
                    auditData: m.type === 'audit' ? m.metadata : null,
                    pulseData: m.type === 'pulse' ? m.metadata : null,
                    timestamp: new Date(m.createdAt)
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    const handleSendMessage = async (messageText = input) => {
        if (!messageText.trim() || isTyping) return;

        const userMessage = {
            role: 'user',
            content: messageText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    context: {
                        userId: user._id,
                        username: user.username
                    }
                })
            });

            const data = await response.json();

            const aiMessage = {
                role: 'assistant',
                content: data.response || 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Connection error. Please make sure the backend is running on port 5001.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSmartAudit = async () => {
        if (!smartText.trim() || isScanning) return;
        const originalText = smartText;

        setIsScanning(true);
        try {
            // 1. Extract Data
            const extractRes = await fetch('http://localhost:5001/api/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: smartText })
            });
            const extractData = await extractRes.json();

            if (!extractData.success) throw new Error('Extraction failed');

            // 2. Add user message with original text
            const userMsg = {
                role: 'user',
                content: `🔍 Forensic Audit Request:\n"${smartText}"`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMsg]);
            setSmartText('');
            setShowSmartPaste(false);
            setIsTyping(true);

            // 3. Analyze Trip (Audit)
            const auditRes = await fetch('http://localhost:5001/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    platform: extractData.data.platform,
                    vehicle_type: extractData.data.vehicle,
                    metrics: {
                        total_pay: extractData.data.total_pay,
                        estimated_distance_km: extractData.data.app_shown_dist_km,
                        actual_distance_km: extractData.data.actually_driven_km || extractData.data.app_shown_dist_km,
                        duration_min: extractData.data.duration_min,
                        wait_time_min: extractData.data.wait_time_min
                    },
                    conditions: {
                        surge_multiplier: extractData.data.surge_multiplier,
                        traffic_level: extractData.data.traffic_level,
                        tolls_paid: extractData.data.tolls_paid
                    }
                })
            });
            const auditData = await auditRes.json();

            if (!auditData.success) throw new Error('Audit failed');

            const aiVerdict = auditData.ai_result;
            const naturalReply = aiVerdict.natural_reply || "";

            // Trigger History Sync (Trip Record)
            if (onAuditComplete) {
                onAuditComplete({
                    platform: extractData.data.platform,
                    metrics: {
                        total_pay: extractData.data.total_pay,
                        estimated_distance_km: extractData.data.app_shown_dist_km,
                        actual_distance_km: extractData.data.actually_driven_km || extractData.data.app_shown_dist_km,
                        duration_min: extractData.data.duration_min,
                        wait_time_min: extractData.data.wait_time_min
                    },
                    ai_result: aiVerdict
                });
            }

            // Professional Reply Content (prioritize natural explanation)
            const aiReplyMessage = {
                role: 'assistant',
                content: naturalReply || `Forensic Audit Complete. Verdict: ${aiVerdict.verdict}`,
                auditData: aiVerdict, // Store full object for rich rendering
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiReplyMessage]);

            // Save interactions to DB Chat History
            await fetch('http://localhost:5001/api/chat/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    role: 'assistant',
                    content: aiReplyMessage.content,
                    type: 'audit',
                    metadata: aiVerdict,
                    createdAt: new Date()
                })
            });

            // Save user request to DB Chat History
            await fetch('http://localhost:5001/api/chat/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    role: 'user',
                    content: `🔍 Forensic Audit Request: "${originalText}"`,
                    type: 'audit'
                })
            });

        } catch (error) {
            console.error('Smart Audit Error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Failed to perform smart audit. Please check your internet connection or try again later.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsScanning(false);
            setIsTyping(false);
        }
    };

    const handleGetPulse = async () => {
        if (isTyping) return;
        setIsTyping(true);

        const userMsg = {
            role: 'user',
            content: "💓 Requesting Live Gig-Pulse...",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        try {
            const response = await fetch('http://localhost:5001/api/live-pulse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();

            if (data.success) {
                const aiMsg = {
                    role: 'assistant',
                    content: "I've synthesized the latest gig marketplace trends for you.",
                    pulseData: data.pulse,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMsg]);

                // Save Pulse interaction to DB
                await fetch('http://localhost:5001/api/chat/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user._id,
                        role: 'assistant',
                        content: aiMsg.content,
                        type: 'pulse',
                        metadata: data.pulse,
                        createdAt: new Date()
                    })
                });

                await fetch('http://localhost:5001/api/chat/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user._id,
                        role: 'user',
                        content: "💓 Requesting Live Gig-Pulse...",
                        type: 'pulse'
                    })
                });
            } else {
                throw new Error("Pulse failed");
            }
        } catch (error) {
            console.error('Pulse error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting to the live pulse right now. Please try again in a moment.",
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const examplePrompts = [
        "💓 Get Live Pulse",
        "What are my total earnings?",
        "Which platform pays me the most?",
        "Show my recent trips"
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                background: '#ffffff'
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        textAlign: 'center',
                        padding: '3rem 2rem'
                    }}>
                        <div style={{
                            width: '72px',
                            height: '72px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            marginBottom: '2rem',
                            boxShadow: '0 8px 24px rgba(102,126,234,0.25)'
                        }}>
                            <Icons.Sparkles />
                        </div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            margin: '0 0 1rem 0',
                            color: '#1a1a1a',
                            letterSpacing: '-0.02em'
                        }}>
                            AI Trip Advisor
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6b7280',
                            margin: '0 0 4rem 0',
                            maxWidth: '600px',
                            lineHeight: '1.6'
                        }}>
                            Your intelligent assistant for gig work insights. Ask about earnings, trips, or platform analytics.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '1rem',
                            width: '100%',
                            maxWidth: '900px',
                            padding: '0 2rem'
                        }}>
                            {examplePrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => prompt.includes('Pulse') ? handleGetPulse() : handleSendMessage(prompt)}
                                    style={{
                                        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '1rem',
                                        color: '#1a1a1a',
                                        transition: 'all 0.2s',
                                        fontWeight: '500',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(102,126,234,0.25)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
                                        e.currentTarget.style.color = '#1a1a1a';
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    background: msg.role === 'assistant' ? '#f9fafb' : 'transparent',
                                    padding: '2rem 0',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                <div style={{
                                    padding: '0 3rem',
                                    display: 'flex',
                                    gap: '2rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        {msg.role === 'user' ? <Icons.User /> : <Icons.Robot />}
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '1.05rem',
                                        lineHeight: '1.75',
                                        color: '#1f2937',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        paddingTop: '0.5rem'
                                    }}>
                                        {msg.content}
                                        {msg.auditData && <ForensicCard data={msg.auditData} />}
                                        {msg.pulseData && <PulseCard data={msg.pulseData} />}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{
                                background: '#f9fafb',
                                padding: '2rem 0',
                                borderBottom: '1px solid #f3f4f6'
                            }}>
                                <div style={{
                                    padding: '0 3rem',
                                    display: 'flex',
                                    gap: '2rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        <Icons.Robot />
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        alignItems: 'center',
                                        paddingTop: '1rem'
                                    }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#9ca3af',
                                            animation: 'pulse 1.4s ease-in-out infinite'
                                        }}></div>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#9ca3af',
                                            animation: 'pulse 1.4s ease-in-out 0.2s infinite'
                                        }}></div>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#9ca3af',
                                            animation: 'pulse 1.4s ease-in-out 0.4s infinite'
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Smart Audit Paste Area */}
            {showSmartPaste && (
                <div style={{
                    padding: '1.5rem 3rem',
                    background: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>✨</span>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Smart Audit Paste</h3>
                            </div>
                            <button
                                onClick={() => setShowSmartPaste(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                            >✕</button>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                            Paste trip details (e.g., "Uber car, 12km, 30 mins, ₹350, heavy traffic") for a deep forensic audit.
                        </p>
                        <textarea
                            value={smartText}
                            onChange={(e) => setSmartText(e.target.value)}
                            placeholder="Type or paste trip summary..."
                            style={{
                                width: '100%',
                                height: '100px',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '0.95rem',
                                marginBottom: '1rem',
                                resize: 'none',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            onClick={handleSmartAudit}
                            disabled={isScanning || !smartText.trim()}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: isScanning || !smartText.trim() ? '#e2e8f0' : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: '600',
                                cursor: isScanning || !smartText.trim() ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '1rem'
                            }}
                        >
                            {isScanning ? '🔍 AI Analyzing Data...' : 'Perform Forensic Audit'}
                        </button>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div style={{
                padding: '1.5rem 3rem 2.5rem 3rem',
                background: '#ffffff'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: '#ffffff',
                        border: '2px solid #e5e7eb',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1rem 1.25rem',
                        transition: 'all 0.2s',
                        position: 'relative'
                    }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#667eea';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                        }}>

                        <button
                            onClick={() => setShowSmartPaste(!showSmartPaste)}
                            style={{
                                background: showSmartPaste ? '#f3f4f6' : 'transparent',
                                border: 'none',
                                borderRadius: '10px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                marginRight: '0.75rem',
                                color: showSmartPaste ? '#7c3aed' : '#6b7280',
                                transition: 'all 0.2s'
                            }}
                            title="Smart Audit Paste"
                        >
                            <Icons.Sparkles />
                        </button>

                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Ask me anything..."
                            disabled={isTyping}
                            rows={1}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                fontSize: '1.05rem',
                                fontFamily: 'inherit',
                                lineHeight: '1.6',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                background: 'transparent',
                                color: '#1a1a1a'
                            }}
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={isTyping || !input.trim()}
                            style={{
                                background: isTyping || !input.trim()
                                    ? '#e5e7eb'
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                                marginLeft: '1rem',
                                flexShrink: 0,
                                transition: 'all 0.2s',
                                boxShadow: isTyping || !input.trim()
                                    ? 'none'
                                    : '0 4px 12px rgba(102,126,234,0.3)'
                            }}
                            onMouseOver={(e) => {
                                if (!isTyping && input.trim()) {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102,126,234,0.4)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = isTyping || !input.trim()
                                    ? 'none'
                                    : '0 4px 12px rgba(102,126,234,0.3)';
                            }}
                        >
                            <Icons.Send />
                        </button>
                    </div>
                    <p style={{
                        margin: '1rem 0 0 0',
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        textAlign: 'center'
                    }}>
                        AI can make mistakes. Verify important information.
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ChatBot;
