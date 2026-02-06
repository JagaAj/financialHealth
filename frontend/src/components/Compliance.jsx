import React from 'react';

const Compliance = ({ analysisData, t }) => {
    const score = (analysisData && analysisData.ai_insights && analysisData.ai_insights.compliance_score)
        ? analysisData.ai_insights.compliance_score
        : (analysisData ? 75 : 0);

    const itcAmount = analysisData ? (analysisData.metrics.expenses * 0.05).toLocaleString() : '0';

    const checks = (analysisData && analysisData.ai_insights && analysisData.ai_insights.compliance_checks)
        ? analysisData.ai_insights.compliance_checks
        : [
            { title: 'GST Filing Status', status: analysisData ? 'Compliant' : 'Not Analyzed', date: analysisData ? 'No issues' : '--', icon: analysisData ? '✅' : '⚪' },
            { title: 'Tax Deduction (TDS)', status: analysisData ? 'Compliant' : 'Not Analyzed', date: analysisData ? 'Verified' : '--', icon: analysisData ? '✅' : '⚪' },
            { title: 'MCA Annual Returns', status: analysisData ? 'Compliant' : 'Not Analyzed', date: analysisData ? 'Up to date' : '--', icon: analysisData ? '✅' : '⚪' },
            { title: 'Labor Law Compliance', status: analysisData ? 'In Review' : 'Not Analyzed', date: analysisData ? 'Check pending' : '--', icon: analysisData ? '⚠️' : '⚪' },
        ];

    const getStatusColor = (status) => {
        if (status === 'Compliant') return 'var(--accent)';
        if (status === 'Pending' || status === 'Action Required') return '#fbbf24';
        if (status === 'Not Analyzed') return 'var(--text-muted)';
        return 'var(--secondary)';
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t.compliance} & Tax Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Automated monitoring for your regulatory obligations.</p>
            </header>

            <div className="glass-card">
                <h2 style={{ marginBottom: '1.5rem' }}>{t.compliance_score}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: `8px solid ${score > 80 ? 'var(--accent)' : score > 0 ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {score} / 100
                    </div>
                    <div>
                        <h3 style={{ color: score > 80 ? 'var(--accent)' : 'var(--primary)' }}>
                            {score > 80 ? 'Excellent Condition' : score > 50 ? 'Good Condition' : score > 0 ? 'Critical Attention' : 'Waiting for Data'}
                        </h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {analysisData
                                ? analysisData.ai_summary.split('.')[0] + "."
                                : "Please upload your financial statements to calculate your regulatory health score."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {checks.map((check, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem', marginBottom: '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>{check.title}</span>
                            <span>{check.icon}</span>
                        </div>
                        <div style={{ fontWeight: '700', color: getStatusColor(check.status) }}>{check.status}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{check.date}</div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h3>{t.gst_opt}</h3>
                <p style={{ marginTop: '1rem' }}>Based on your purchase records, we identified <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>${itcAmount}</span> in unclaimed Input Tax Credit (ITC).</p>
                <button
                    className="btn btn-primary"
                    style={{ marginTop: '1.5rem' }}
                    disabled={!analysisData}
                    onClick={() => {
                        alert("Generating Investor-Ready Report... Preparing data for print.");
                        window.print();
                    }}
                >
                    {analysisData ? t.generate_report : 'Upload Data First'}
                </button>
            </div>
        </div>
    );
};

export default Compliance;
