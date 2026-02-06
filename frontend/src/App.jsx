import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnalysisWizard from './components/AnalysisWizard';
import Forecasting from './components/Forecasting';
import Compliance from './components/Compliance';

const translations = {
  en: {
    dashboard: 'Dashboard', analysis: 'AI Analysis', forecast: 'Forecasting', compliance: 'Compliance', settings: 'Settings', sme_health: 'SME Health AI',
    total_revenue: 'Total Revenue', net_profit: 'Net Profit', profit_margin: 'Profit Margin', risk_level: 'Risk Level',
    financial_overview: 'Financial Overview', real_time_health: 'Real-time health assessment for your enterprise.',
    ai_insight: 'AI Financial Insight', view_plan: 'View Detailed Plan', efficiency: 'Business Efficiency', trajectory: 'Growth Trajectory',
    upload_data: 'Upload Financial Data', start_analysis: 'Start Analysis', select_file: 'Select File', actionable_recs: 'Actionable Recommendations',
    another_doc: 'Analyze Another Document', twelve_month: '12-Month Projection', q3_revenue: 'Projected Q3 Revenue', status: 'Profitability Status',
    scenario: 'What-if Scenario Analysis', compliance_score: 'Compliance Health Score', gst_opt: 'Suggested GST Optimization', generate_report: 'Generate Report',
    placeholder_text: 'No financial data analyzed yet. Please upload a statement to generate insights.'
  },
  hi: {
    dashboard: 'डैशबोर्ड', analysis: 'एआई विश्लेषण', forecast: 'पूर्वानुमान', compliance: 'अनुपालन', settings: 'सेटिंग्स', sme_health: 'एसएमई स्वास्थ्य एआई',
    total_revenue: 'कुल राजस्व', net_profit: 'कुल लाभ', profit_margin: 'लाभ मार्जिन', risk_level: 'जोखिम स्तर',
    financial_overview: 'वित्तीय अवलोकन', real_time_health: 'आपके उद्यम के लिए वास्तविक समय स्वास्थ्य मूल्यांकन।',
    ai_insight: 'एआई वित्तीय अंतर्दृष्टि', view_plan: 'विस्तृत योजना देखें', efficiency: 'व्यापार दक्षता', trajectory: 'विकास पथ',
    upload_data: 'वित्तीय डेटा अपलोड करें', start_analysis: 'विश्लेषण शुरू करें', select_file: 'फ़ाइल चुनें', actionable_recs: 'कार्यवाही योग्य सिफारिशें',
    another_doc: 'दूसरा दस्तावेज़ विश्लेषण करें', twelve_month: '12-महीने का अनुमान', q3_revenue: 'अनुमानित Q3 राजस्व', status: 'लाभप्रदता स्थिति',
    scenario: 'क्या-अगर परिदृश्य विश्लेषण', compliance_score: 'अनुपालन स्वास्थ्य स्कोर', gst_opt: 'सुझाया गया जीएसटी अनुकूलन', generate_report: 'रिपोर्ट तैयार करें',
    placeholder_text: 'अभी तक किसी वित्तीय डेटा का विश्लेषण नहीं किया गया है। अंतर्दृष्टि उत्पन्न करने के लिए कृपया एक विवरण अपलोड करें।'
  },
  ta: {
    dashboard: 'டாஷ்போர்டு', analysis: 'AI பகுப்பாய்வு', forecast: 'முன்னறிவிப்பு', compliance: 'இணக்கம்', settings: 'அமைப்புகள்', sme_health: 'SME ஹெல்த் AI',
    total_revenue: 'மொத்த வருவாய்', net_profit: 'நிகர லாபம்', profit_margin: 'லாப வரம்பு', risk_level: 'அபாய நிலை',
    financial_overview: 'நிதி மேலோட்டம்', real_time_health: 'உங்கள் நிறுவனத்திற்கான நிகழ்நேர சுகாதார மதிப்பீடு.',
    ai_insight: 'AI நிதி நுண்ணறிவு', view_plan: 'விரிவான திட்டத்தைப் பார்க்கவும்', efficiency: 'வணிகத் திறன்', trajectory: 'வளர்ச்சிப் பாதை',
    upload_data: 'நிதித் தரவைப் பதிவேற்றவும்', start_analysis: 'பகுப்பாய்வைத் தொடங்கு', select_file: 'கோப்பைத் தேர்ந்தெடுக்கவும்', actionable_recs: 'செயல்படக்கூடிய பரிந்துரைகள்',
    another_doc: 'மற்றொரு ஆவணத்தைப் பகுப்பாய்வு செய்யவும்', twelve_month: '12 மாத முன்னறிவிப்பு', q3_revenue: 'கணிக்கப்பட்ட Q3 வருவாய்', status: 'லாப நிலை',
    scenario: 'முன்னறிவிப்பு பகுப்பாய்வு', compliance_score: 'இணக்க சுகாதார மதிப்பெண்', gst_opt: 'பரிந்துரைக்கப்பட்ட ஜிஎஸ்டி மேம்படுத்தல்', generate_report: 'அறிக்கையை உருவாக்கவும்',
    placeholder_text: 'நிதித் தரவு இன்னும் பகுப்பாய்வு செய்யப்படவில்லை. நுண்ணறிவுகளை உருவாக்க ஒரு அறிக்கையைப் பதிவேற்றவும்.'
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    // Restore latest analysis on refresh
    const fetchLatest = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_BASE}/smes/1/latest-analysis`);
        const data = await response.json();
        if (data.status === 'success') {
          setLastAnalysis({
            metrics: data.metrics,
            risk: data.ai_insights.risk_level,
            recommendations: data.ai_insights.recommendations,
            ai_summary: data.ai_insights.summary,
            ai_insights: data.ai_insights // Store raw insights for full access
          });
        }
      } catch (e) {
        console.warn("Could not restore session:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard analysisData={lastAnalysis} onNavigate={setActiveTab} t={t} />;
      case 'analysis':
        return <AnalysisWizard onAnalysisComplete={setLastAnalysis} t={t} />;
      case 'forecast':
        return <Forecasting analysisData={lastAnalysis} t={t} />;
      case 'compliance':
        return <Compliance analysisData={lastAnalysis} t={t} />;
      default:
        return (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Step Pending</h2>
            <p style={{ color: 'var(--text-muted)' }}>This module is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        t={t}
      />
      <main className="main-content">
        {loading ? (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="animate-spin" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⌛</div>
              <h2>Retrieving Analysis...</h2>
            </div>
          </div>
        ) : renderContent()}
      </main>
    </div>
  );
}

export default App;
