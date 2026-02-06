import React, { useState } from 'react';

const AnalysisWizard = ({ onAnalysisComplete, t }) => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = async () => {
        if (!file) return;
        setAnalyzing(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/smes/1/analyze`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status === 'success') {
                const results = {
                    metrics: data.metrics,
                    risk: data.ai_insights.risk_level,
                    recommendations: data.ai_insights.recommendations,
                    ai_summary: data.ai_insights.summary
                };
                setResult(results);
                if (onAnalysisComplete) {
                    onAnalysisComplete(results);
                }
            } else {
                alert('Analysis failed: ' + (data.detail || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to backend.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t.analysis} Wizard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Upload your financial statements for a deep-dive assessment.</p>
            </header>

            {!result ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '5rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📁</div>
                    <h2 style={{ marginBottom: '1rem' }}>{t.upload_data}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Supported formats: CSV, XLSX, PDF (Text-based)
                    </p>

                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor="file-upload" className="btn" style={{ background: 'var(--surface)', border: '1px solid var(--border)', marginRight: '1rem' }}>
                        {file ? file.name : t.select_file}
                    </label>

                    <button
                        className="btn btn-primary"
                        disabled={!file || analyzing}
                        onClick={handleUpload}
                    >
                        {analyzing ? 'Analyzing...' : t.start_analysis}
                    </button>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="glass-card" style={{ borderLeft: '6px solid var(--accent)' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Analysis Results</h2>
                        <div className="stat-grid">
                            <div className="stat-card">
                                <div className="stat-label">{t.total_revenue}</div>
                                <div className="stat-value">${result.metrics.revenue}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">{t.net_profit}</div>
                                <div className="stat-value">${result.metrics.net_profit}</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">{t.risk_level}</div>
                                <div className="stat-value" style={{ color: 'var(--accent)' }}>{result.risk}</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.5rem' }}>{t.actionable_recs}</h3>
                        <ul style={{ listStyle: 'none' }}>
                            {result.recommendations.map((rec, i) => (
                                <li key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
                                    <span style={{ color: 'var(--primary)' }}>✔</span> {rec}
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => setResult(null)}>
                            Analyze Another Document
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisWizard;
