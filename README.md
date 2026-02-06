# SME Financial Health AI Platform 🚀

[![Deployment Status](https://img.shields.io/badge/Deployment-Ready-green)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20PostgreSQL-blue)](#)

## 📖 Overview
The **SME Financial Health AI** is a comprehensive platform designed to act as a "Virtual CFO" for small and medium enterprises. By leveraging Generative AI and statistical modeling, the platform ingests raw financial data (CSV/PDF/Excel) and transforms it into actionable strategic insights.

## ✨ Key Features

### 1. 🧠 AI-Powered Analysis
- **Instant Interpretation**: Upload raw financial statements to get an immediate health check.
- **Narrative Insights**: Uses GPT-4/Claude to explain complex metrics in plain English (or regional languages).
- **Risk Assessment**: automatically categorizes business health as Low, Medium, or High risk.

### 2. 📈 Interactive Forecasting
- **"What-If" Scenarios**: Dynamic sliders to simulate the impact of increased Ad Spend or improved Operational Efficiency.
- **Visual Projections**: Real-time graph updates showing 12-month revenue trajectories.

### 3. ✅ Compliance & Regulatory
- **Automated Checks**: Tracks status of GST, Tax filings, and Labor Law compliance.
- **Regional Support**: Tailored to local regulatory frameworks.

### 4. 🌐 Multilingual Support
- Built-in support for **English**, **Hindi**, and **Tamil** to ensure accessibility for diverse business owners.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, CSS Modules (Glassmorphism UI)
- **Backend**: Python FastAPI, Uvicorn
- **Data Processing**: Pandas, NumPy
- **Database**: PostgreSQL (SQLAlchemy ORM)
- **AI Integration**: OpenAI API / Anthropic Claude API

## 🚀 Setup & Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on hosting this application on Render (Backend) and Vercel (Frontend).

## 🏃‍♂️ Running Locally

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---
*Built for the 2026 Hackathon.*
