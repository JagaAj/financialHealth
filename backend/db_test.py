from database import engine
from models import Base
print("Connecting...")
try:
    Base.metadata.create_all(bind=engine)
    print("Success!")
except Exception as e:
    print(f"Error: {e}")
