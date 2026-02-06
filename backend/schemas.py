from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class SMEBase(BaseModel):
    name: str
    industry: str
    registration_number: str

class SMECreate(SMEBase):
    pass

class SME(SMEBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class FinancialMetricBase(BaseModel):
    revenue: float
    gross_profit: float
    net_profit: float
    current_assets: float
    current_liabilities: float
    total_debt: float
    ratios: Dict[str, Any]
    ai_insights: Dict[str, Any]

class FinancialMetric(FinancialMetricBase):
    id: int
    calculated_at: datetime

    class Config:
        from_attributes = True

class FinancialStatementBase(BaseModel):
    file_name: str
    data_type: str

class FinancialStatement(FinancialStatementBase):
    id: int
    upload_date: datetime
    metrics: List[FinancialMetric] = []

    class Config:
        from_attributes = True
