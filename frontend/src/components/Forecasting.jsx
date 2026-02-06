import React, { useState } from 'react';

const Forecasting = ({ analysisData, t }) => {
    const [adSpend, setAdSpend] = useState(24);
    const [efficiency, setEfficiency] = useState(82);

    const baseRevenue = analysisData ? analysisData.metrics.revenue : 92000;
    const baseExpenses = analysisData ? analysisData.metrics.expenses : 60500;

    // Advanced projection logic
    const growthTurbo = (adSpend / 100) * (efficiency / 100) * 2.5;
    const projectedRev = baseRevenue * (1 + growthTurbo);
    const projectedProfit = projectedRev - (baseExpenses * (1 + (adSpend / 200)));
    const roi = ((projectedProfit - (baseRevenue - baseExpenses)) / (adSpend * 500) * 100).toFixed(1);

    // Dynamic chart points
    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const p = [45, 52, 48, 70, 85, 95, 120].map(val => val * (1 + growthTurbo * 0.8));

    const svgWidth = 800;
    const svgHeight = 250;
    const padding = 40;

    const points = p.map((val, i) => ({
        x: padding + (i * (svgWidth - 2 * padding) / (p.length - 1)),
        y: svgHeight - padding - (val * (svgHeight - 2 * padding) / 150)
    }));

    const d = `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');
    const areaD = `${d} L ${points[points.length - 1].x},${svgHeight - padding} L ${points[0].x},${svgHeight - padding} Z`;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {t.forecast} <span style={{ fontSize: '1rem', verticalAlign: 'middle', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '1rem', marginLeft: '1rem' }}>PRO MODE</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Harnessing GPT-4 and deep-financial models for enterprise-grade growth mapping.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.3rem' }}>⚡ SIMULATION ENGINE ACTIVE</div>
                    <div style={{ width: '150px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                        <div style={{ width: '85%', height: '100%', background: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent)' }}></div>
                    </div>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>{t.twelve_month}</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div> Projected Revenue</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div> Market Baseline</span>
                    </div>
                </div>

                <div style={{ padding: '2.5rem', background: 'radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.08), transparent)' }}>
                    <svg width="100%" height="250" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="var(--primary)" />
                                <stop offset="100%" stopColor="var(--secondary)" />
                            </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map(v => (
                            <line key={v} x1={padding} y1={padding + (v * (svgHeight - 2 * padding) / 4)} x2={svgWidth - padding} y2={padding + (v * (svgHeight - 2 * padding) / 4)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        ))}

                        <path d={areaD} fill="url(#areaGrad)" />
                        <path d={d} fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                        {points.map((pt, i) => (
                            <g key={i}>
                                <circle cx={pt.x} cy={pt.y} r="6" fill="var(--background)" stroke="var(--primary)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 5px var(--primary))' }} />
                                <text x={pt.x} y={svgHeight - 10} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontWeight="500">{months[i]}</text>
                                <text x={pt.x} y={pt.y - 15} textAnchor="middle" fontSize="10" fill="var(--text)" opacity="0.8" fontWeight="bold">${(p[i] * 1000).toLocaleString()}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', margin: '2rem 0' }}>
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <div className="stat-label">{t.q3_revenue}</div>
                    <div className="stat-value" style={{ color: 'var(--primary)', fontSize: '1.8rem' }}>${(projectedRev * 1.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <div className="stat-label">Estimated ROI</div>
                    <div className="stat-value" style={{ color: 'var(--accent)', fontSize: '1.8rem' }}>{roi}%</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <div className="stat-label">Projected Runway</div>
                    <div className="stat-value" style={{ color: '#fbbf24', fontSize: '1.8rem' }}>{Math.max(12, 12 + (efficiency / 10)).toFixed(0)} Months</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                    <div className="stat-label">Engine Confidence</div>
                    <div className="stat-value" style={{ color: 'var(--secondary)', fontSize: '1.8rem' }}>{(88 + (efficiency / 20)).toFixed(0)}%</div>
                </div>
            </div>

            <div className="glass-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px border-white/5' }}>
                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚙️</span> {t.scenario}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '600' }}>
                            <span style={{ color: 'var(--text)' }}>Growth Investment (Ad Spend)</span>
                            <span style={{ color: 'var(--primary)' }}>${(adSpend * 1000).toLocaleString()} /mo</span>
                        </label>
                        <input
                            type="range"
                            min="5" max="100"
                            value={adSpend}
                            onChange={(e) => setAdSpend(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                cursor: 'pointer',
                                accentColor: 'var(--primary)',
                                height: '6px',
                                borderRadius: '3px'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span>Conservation Mode</span>
                            <span>Aggressive Scaling</span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '600' }}>
                            <span style={{ color: 'var(--text)' }}>Operational Efficiency</span>
                            <span style={{ color: 'var(--accent)' }}>{efficiency}%</span>
                        </label>
                        <input
                            type="range"
                            min="20" max="100"
                            value={efficiency}
                            onChange={(e) => setEfficiency(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                cursor: 'pointer',
                                accentColor: 'var(--accent)',
                                height: '6px',
                                borderRadius: '3px'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span>High Waste</span>
                            <span>Optimized Core</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecasting;
