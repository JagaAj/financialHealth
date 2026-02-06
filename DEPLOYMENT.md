# Deployment Guide for SME Financial Health Platform

This guide covers how to deploy the full-stack application using **Render** for the backend (FastAPI + PostgreSQL) and **Vercel** for the frontend (React + Vite).

## Prerequisites

- GitHub Account (push your code to a repository)
- [Render Account](https://render.com/) (Free tier available)
- [Vercel Account](https://vercel.com/) (Free tier available)

---

## Part 1: Backend Deployment (Render)

1. **Log in to Render** and click **New +** -> **Web Service**.
2. **Connect your GitHub repository**.
3. Configure the service:
   - **Name**: `sme-backend` (or similar)
   - **Root Directory**: `backend` (Important! This tells Render where the Python app is)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables** (Scroll down to "Environment"):
   - `PYTHON_VERSION`: `3.11.0` (Recommended)
   - `OPENAI_API_KEY`: Your OpenAI Key
   - `ANTHROPIC_API_KEY`: Your Anthropic Key (Optional)
   - `DATABASE_URL`: *See next step*
5. **Database Setup**:
   - In a new tab, go to Render Dashboard -> **New +** -> **PostgreSQL**.
   - Name it `sme-db`.
   - Create it. Any region is fine (ideally same as Web Service).
   - Once created, copy the **Internal Database URL** (starts with `postgres://...`).
   - Go back to your Web Service -> Environment Variables and add `DATABASE_URL` with this value.
6. **Click "Create Web Service"**.
   - Wait for the build to finish.
   - Once live, copy the **Service URL** (e.g., `https://sme-backend-xyz.onrender.com`). You will need this for the frontend.

---

## Part 2: Frontend Deployment (Vercel)

1. **Log in to Vercel** and click **Add New...** -> **Project**.
2. **Import your GitHub repository**.
3. Configure the project:
   - **Framework Preset**: `Vite` (Should detect automatically)
   - **Root Directory**: Click "Edit" and select `frontend`.
   - Toggles for Build Command and Output Directory can stay default (`npm run build` / `dist`).
4. **Environment Variables**:
   - Name: `VITE_API_URL`
   - Value: The **Backend Service URL** from Part 1 (e.g., `https://sme-backend-xyz.onrender.com`). *Note: Do not include a trailing slash.*
5. **Click "Deploy"**.

---

## Part 3: Verification

1. Open your new Vercel App URL.
2. The dashboard should load.
3. Try uploading a sample financial CSV.
4. If it works, the frontend is successfully talking to the backend!

## Troubleshooting

- **CORS Errors**: If you see CORS errors in the browser console, check the `backend/main.py`. Currently, it is set to allow all origins (`allow_origins=["*"]`), which is permissible for testing but should be restricted to your Vercel domain in production.
- **Database Errors**: Check the Render logs. Ensure `DATABASE_URL` is set correctly in the Backend Environment Variables.
- **"File not found"**: Ensure you set the **Root Directory** correctly in both Render (`backend`) and Vercel (`frontend`).
