from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class SME(Base):
    __tablename__ = "smes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    industry = Column(String)
    registration_number = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    financials = relationship("FinancialStatement", back_populates="owner")

class FinancialStatement(Base):
    __tablename__ = "financial_statements"
    
    id = Column(Integer, primary_key=True, index=True)
    sme_id = Column(Integer, ForeignKey("smes.id"))
    file_name = Column(String)
    data_type = Column(String)  # CSV, XLSX, PDF
    raw_data = Column(JSON)  # Store parsed data as JSON
    upload_date = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("SME", back_populates="financials")
    metrics = relationship("FinancialMetric", back_populates="statement")

class FinancialMetric(Base):
    __tablename__ = "financial_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    statement_id = Column(Integer, ForeignKey("financial_statements.id"))
    revenue = Column(Float)
    gross_profit = Column(Float)
    net_profit = Column(Float)
    current_assets = Column(Float)
    current_liabilities = Column(Float)
    total_debt = Column(Float)
    ratios = Column(JSON)  # Store calculated ratios
    ai_insights = Column(JSON)  # Store AI narrative and recommendations
    calculated_at = Column(DateTime, default=datetime.utcnow)
    
    statement = relationship("FinancialStatement", back_populates="metrics")
