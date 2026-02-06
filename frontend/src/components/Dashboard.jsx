import React from "react";

const Dashboard = ({ analysisData, onNavigate, t }) => {
  const [hoveredBar, setHoveredBar] = React.useState(null);

  const stats = analysisData
    ? [
        {
          label: t.total_revenue,
          value: `$${analysisData.metrics.revenue.toLocaleString()}`,
          color: "var(--primary)",
        },
        {
          label: t.net_profit,
          value: `$${analysisData.metrics.net_profit.toLocaleString()}`,
          color: "var(--accent)",
        },
        {
          label: t.profit_margin,
          value: `${analysisData.metrics.ratios.profit_margin}%`,
          color: "var(--secondary)",
        },
        { label: t.risk_level, value: analysisData.risk, color: "#fbbf24" },
      ]
    : [
        { label: t.total_revenue, value: "$0", color: "var(--primary)" },
        { label: t.net_profit, value: "$0", color: "var(--accent)" },
        { label: t.profit_margin, value: "0%", color: "var(--secondary)" },
        { label: t.risk_level, value: "--", color: "#fbbf24" },
      ];

  return (
    <div className="animate-fade-in">
      <header
        style={{
          marginBottom: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {t.financial_overview}
          </h1>
          <p style={{ color: "var(--text-muted)" }}>{t.real_time_health}</p>
        </div>
        <div
          style={{
            padding: "0.5rem 1rem",
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "2rem",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          ● LIVE ENGINE CONNECTED
        </div>
      </header>

      <div className="stat-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className="glass-card"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>{t.ai_insight}</h2>
        <div
          style={{
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
            position: "relative",
            zIndex: 1,
          }}
        >
          {analysisData ? (
            analysisData.ai_summary
          ) : (
            <div style={{ color: "var(--text-muted)" }}>
              {t.placeholder_text}
            </div>
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate("analysis")}
        >
          {analysisData ? t.view_plan : t.start_analysis}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
        }}
      >
        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem" }}>{t.efficiency}</h3>
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "1rem",
              padding: "1rem",
              position: "relative",
            }}
          >
            {[
              {
                name: "Revenue",
                val: analysisData?.metrics.revenue || 0,
                color: "var(--primary)",
                h: 140,
              },
              {
                name: "Costs",
                val: analysisData?.metrics.expenses || 0,
                color: "var(--secondary)",
                h: analysisData
                  ? (analysisData.metrics.expenses /
                      analysisData.metrics.revenue) *
                    140
                  : 100,
              },
              {
                name: "Profit",
                val: analysisData?.metrics.net_profit || 0,
                color: "var(--accent)",
                h: analysisData
                  ? (analysisData.metrics.net_profit /
                      analysisData.metrics.revenue) *
                    140
                  : 40,
              },
            ].map((bar, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  width: "80px",
                  position: "relative",
                }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {hoveredBar === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--surface)",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--border)",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
                    }}
                  >
                    ${bar.val.toLocaleString()}
                  </div>
                )}
                <div
                  style={{
                    height: `${bar.h}px`,
                    background: bar.color,
                    borderRadius: "4px 4px 0 0",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    opacity: hoveredBar === i || hoveredBar === null ? 1 : 0.4,
                    cursor: "pointer",
                    filter:
                      hoveredBar === i
                        ? "brightness(1.2) drop-shadow(0 0 10px " +
                          bar.color +
                          ")"
                        : "none",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    display: "block",
                    marginTop: "8px",
                    color: hoveredBar === i ? "white" : "var(--text-muted)",
                  }}
                >
                  {bar.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem" }}>{t.trajectory}</h3>
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "1rem",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => onNavigate("forecast")}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <path
                d={
                  analysisData
                    ? "M0,80 Q50,70 100,50 T200,20"
                    : "M0,80 Q50,75 100,70 T200,65"
                }
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                className="animate-pulse"
                style={{ filter: "drop-shadow(0 0 5px var(--primary-glow))" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0)",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(139, 92, 246, 0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0)")
              }
            >
              <span
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  background: "var(--surface-glass)",
                  border: "1px solid var(--border)",
                  fontSize: "0.75rem",
                }}
              >
                {analysisData
                  ? "INTERACTIVE SIMULATION ACTIVE ↗"
                  : "WAITING FOR DATA..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
