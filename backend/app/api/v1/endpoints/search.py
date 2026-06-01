import pandas as pd
import os
from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db, engine, Base
from app.models.destination import Destination
from app.ai.search import search_service

router = APIRouter()

# Otomatis buat tabel saat aplikasi start
Base.metadata.create_all(bind=engine)

def sync_csv_to_db(db: Session):
    """Fungsi untuk memindahkan data dari CSV ke Database jika DB masih kosong"""
    count = db.query(Destination).count()
    if count > 0:
        print(f"ℹ️ Database sudah berisi {count} data. Melewati sinkronisasi CSV.")
        return

    print("⚠️ Database kosong. Memulai migrasi data dari CSV...")
    current_file_path = os.path.abspath(__file__)
    project_root = os.path.dirname(current_file_path)
    for _ in range(5): project_root = os.path.dirname(project_root)
    dataset_dir = os.path.join(project_root, "dataset")
    
    files = {"destinations.csv": "Wisata", "culinary.csv": "Kuliner", 
             "cultures.csv": "Budaya", "events.csv": "Event"}

    for file_name, cat in files.items():
        path = os.path.join(dataset_dir, file_name)
        if os.path.exists(path):
            df = pd.read_csv(path, encoding='utf-8', quotechar='"')
            for _, row in df.iterrows():
                new_item = Destination(
                    name=row['name'],
                    category=cat,
                    location=row['location'],
                    description=row.get('description', row.get('desctiption', '')),
                    rating=row['rating']
                )
                db.add(new_item)
    db.commit()
    print("✅ Migrasi CSV ke Database Selesai!")

@router.on_event("startup")
async def startup_event():
    # Gunakan SessionLocal secara manual untuk startup
    from app.db.session import SessionLocal
    db = SessionLocal()
    try:
        # 1. Pastikan data ada di DB
        sync_csv_to_db(db)
        
        # 2. Ambil SEMUA data dari DB untuk di-index oleh AI
        all_destinations = db.query(Destination).all()
        
        # Konversi objek SQLAlchemy ke list of dict untuk AI
        data_for_ai = [
            {
                "id": d.id,
                "name": d.name,
                "category": d.category,
                "location": d.location,
                "description": d.description,
                "rating": d.rating
            } for d in all_destinations
        ]
        
        # 3. Inisialisasi AI dengan data dari DB
        search_service.initialize_with_destinations(data_for_ai)
        print(f"🚀 AI Search Ready dengan {len(data_for_ai)} data dari PostgreSQL!")
    finally:
        db.close()

@router.get("/search")
async def semantic_search(q: str = Query(..., min_length=1), limit: int = 6):
    if not search_service.is_ready:
        raise HTTPException(status_code=503, detail="AI Service is initializing")
    results = await search_service.search(q, limit)
    return {"query": q, "results": results}