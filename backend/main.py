from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn
import os

from database import engine, get_db
import models, schemas, database

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SME Financial Health Assessment API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the SME Financial Health Assessment API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# SME Endpoints
@app.post("/smes/", response_model=schemas.SME)
def create_sme(sme: schemas.SMECreate, db: Session = Depends(get_db)):
    db_sme = models.SME(**sme.model_dump())
    db.add(db_sme)
    db.commit()
    db.refresh(db_sme)
    return db_sme

@app.get("/smes/", response_model=List[schemas.SME])
def read_smes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    smes = db.query(models.SME).offset(skip).limit(limit).all()
    return smes

@app.get("/smes/{sme_id}", response_model=schemas.SME)
def read_sme(sme_id: int, db: Session = Depends(get_db)):
    db_sme = db.query(models.SME).filter(models.SME.id == sme_id).first()
    if db_sme is None:
        raise HTTPException(status_code=404, detail="SME not found")
    return db_sme

from analysis import AnalysisEngine
import json

# ... (existing code remains same until the endpoint)

# Analysis Scaffolding
@app.post("/smes/{sme_id}/analyze")
async def analyze_financials(sme_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Check if SME exists
    db_sme = db.query(models.SME).filter(models.SME.id == sme_id).first()
    if not db_sme:
        raise HTTPException(status_code=404, detail="SME not found")
    
    content = await file.read()
    filename = file.filename.lower()
    
    try:
        if filename.endswith('.csv'):
            data = AnalysisEngine.parse_csv(content)
        elif filename.endswith('.xlsx'):
            data = AnalysisEngine.parse_xlsx(content)
        elif filename.endswith('.pdf'):
            # Text extraction for PDF (simplified)
            text = AnalysisEngine.parse_pdf(content)
            # In a real app, we'd use LLM to extract structured data from PDF text
            # For now, we'll use a placeholder structure
            data = [{"type": "revenue", "amount": 10000}, {"type": "expense", "amount": 6000}]
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
            
        metrics = AnalysisEngine.calculate_metrics(data)
        ai_narrative = AnalysisEngine.get_ai_narrative(metrics, db_sme.industry)
        
        # Save to database
        db_statement = models.FinancialStatement(
            sme_id=sme_id,
            file_name=file.filename,
            data_type=filename.split('.')[-1],
            raw_data=data
        )
        db.add(db_statement)
        db.commit()
        db.refresh(db_statement)
        
        db_metric = models.FinancialMetric(
            statement_id=db_statement.id,
            revenue=metrics['revenue'],
            net_profit=metrics['net_profit'],
            ratios=metrics['ratios'],
            ai_insights=ai_narrative
        )
        db.add(db_metric)
        db.commit()
        
        return {
            "status": "success",
            "statement_id": db_statement.id,
            "metrics": metrics,
            "ai_insights": ai_narrative
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/smes/{sme_id}/latest-analysis")
def get_latest_analysis(sme_id: int, db: Session = Depends(get_db)):
    # Get the latest metric entry for this SME
    latest_metric = db.query(models.FinancialMetric)\
        .join(models.FinancialStatement)\
        .filter(models.FinancialStatement.sme_id == sme_id)\
        .order_by(models.FinancialMetric.id.desc())\
        .first()
    
    if not latest_metric:
        return {"status": "no_data"}
        
    return {
        "status": "success",
        "metrics": {
            "revenue": latest_metric.revenue,
            "expenses": latest_metric.revenue - latest_metric.net_profit,
            "net_profit": latest_metric.net_profit,
            "ratios": latest_metric.ratios
        },
        "ai_insights": latest_metric.ai_insights
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
