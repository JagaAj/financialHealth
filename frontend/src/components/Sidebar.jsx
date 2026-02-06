import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, lang, setLang, t }) => {
    const navItems = [
        { id: 'dashboard', label: t.dashboard, icon: '📊' },
        { id: 'analysis', label: t.analysis, icon: '🧠' },
        { id: 'forecast', label: t.forecast, icon: '📈' },
        { id: 'compliance', label: t.compliance, icon: '⚖️' },
        { id: 'settings', label: t.settings, icon: '⚙️' },
    ];

    return (
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon">💠</span>
                {t.sme_health}
            </div>
            <ul className="nav-links">
                {navItems.map((item) => (
                    <li
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="sidebar-footer">
                <div
                    className="nav-item"
                    onClick={() => {
                        if (lang === 'en') setLang('hi');
                        else if (lang === 'hi') setLang('ta');
                        else setLang('en');
                    }}
                    style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)' }}
                >
                    <span className="nav-icon">🌐</span>
                    {lang === 'en' ? 'Switch to Hindi' : lang === 'hi' ? 'Switch to Tamil' : 'English-க்கு மாறவும்'}
                </div>
                <div className="nav-item">
                    <span className="nav-icon">👤</span>
                    Business Profile
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
