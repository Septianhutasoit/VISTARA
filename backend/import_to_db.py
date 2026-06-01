import pandas as pd
import os
from app.db.session import SessionLocal, engine, Base
from app.models.destination import Destination

Base.metadata.create_all(bind=engine)

def migrate():
    db = SessionLocal()
    dataset_dir = "../dataset" # Sesuaikan path
    files = ["destinations.csv", "culinary.csv", "cultures.csv", "events.csv"]
    
    for file in files:
        path = os.path.join(dataset_dir, file)
        if os.path.exists(path):
            df = pd.read_csv(path)
            for _, row in df.iterrows():
                db_item = Destination(
                    name=row['name'],
                    category=file.split('.')[0], # Misal: 'destinations'
                    location=row['location'],
                    description=row['description'],
                    rating=row['rating']
                )
                db.add(db_item)
    db.commit()
    print("✅ Berhasil migrasi data CSV ke PostgreSQL!")

if __name__ == "__main__":
    migrate()