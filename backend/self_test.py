import os
import json
from dotenv import load_dotenv
from database import engine
from models import Base
from analysis import AnalysisEngine

load_dotenv()

def test_db():
    print("--- Testing Database Connection ---")
    try:
        # Just try to connect, don't necessarily create all if it fails
        with engine.connect() as conn:
            print("Successfully connected to PostgreSQL.")
        return True
    except Exception as e:
        print(f"FAILED to connect to PostgreSQL: {e}")
        return False

def test_ai():
    print("\n--- Testing AI Engine (OpenAI/Claude) ---")
    metrics = {
        "revenue": 100000,
        "expenses": 60000,
        "net_profit": 40000,
        "ratios": {"profit_margin": 40}
    }
    industry = "Retail"
    
    print(f"Industry: {industry}, Metrics: {metrics}")
    print("Calling AI engine...")
    try:
        result = AnalysisEngine.get_ai_narrative(metrics, industry)
        print("AI Response Received:")
        print(json.dumps(result, indent=2))
        return True
    except Exception as e:
        print(f"FAILED AI Analysis: {e}")
        return False

if __name__ == "__main__":
    db_ok = test_db()
    ai_ok = test_ai()
    
    print("\n" + "="*30)
    print(f"Database: {'PASSED' if db_ok else 'FAILED'}")
    print(f"AI Engine: {'PASSED' if ai_ok else 'FAILED'}")
    print("="*30)
