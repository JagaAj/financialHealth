from database import SessionLocal
import models

def create_initial_sme():
    db = SessionLocal()
    try:
        # Check if any SME already exists
        existing = db.query(models.SME).first()
        if not existing:
            test_sme = models.SME(
                name="Global Retail Solutions",
                industry="Retail",
                registration_number="GSTIN-9876543210"
            )
            db.add(test_sme)
            db.commit()
            print("Successfully created test SME with ID: 1")
        else:
            print(f"SME already exists with ID: {existing.id}")
    except Exception as e:
        print(f"Error creating SME: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_sme()
