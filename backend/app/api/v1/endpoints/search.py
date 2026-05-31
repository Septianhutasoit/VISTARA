import pandas as pd
import os
from fastapi import APIRouter, Query, HTTPException
from app.ai.search import search_service

router = APIRouter()

def load_data_from_datasets():
    """Menggabungkan semua data dari folder dataset"""
    combined_data = []
    # Path menuju folder dataset (naik satu level dari folder backend)
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
    dataset_dir = os.path.join(base_dir, "dataset")
    
    files = {
        "destinations.csv": "Wisata",
        "culinary.csv": "Kuliner",
        "cultures.csv": "Budaya",
        "events.csv": "Event"
    }

    print(f"📂 Mencari dataset di: {dataset_dir}")

    for file_name, cat in files.items():
        path = os.path.join(dataset_dir, file_name)
        if os.path.exists(path):
            try:
                # Baca CSV (pastikan encoding utf-8 atau latin-1)
                df = pd.read_csv(path, encoding='utf-8')
                # Tambahkan kolom category jika belum ada
                df['category'] = cat
                # Ubah ke list of dictionary
                items = df.to_dict('records')
                combined_data.extend(items)
                print(f"✅ Loaded {len(items)} items from {file_name}")
            except Exception as e:
                print(f"❌ Error reading {file_name}: {e}")
        else:
            print(f"⚠️ File tidak ditemukan: {path}")
    
    return combined_data

# Inisialisasi AI dengan data CSV saat startup
@router.on_event("startup")
async def startup_event():
    data = load_data_from_datasets()
    if data:
        search_service.initialize_with_destinations(data)
        print(f"🚀 AI Search Ready dengan {len(data)} data asli!")
    else:
        print("⚠️ Gagal memuat data. Periksa folder dataset Anda.")

@router.get("/search")
async def semantic_search(
    q: str = Query(..., min_length=1),
    limit: int = Query(6, ge=1, le=20)
):
    if not search_service.is_ready:
        raise HTTPException(status_code=503, detail="AI Service is initializing")
    
    results = await search_service.search(q, limit)
    return {
        "query": q,
        "total_results": len(results),
        "results": results
    }

@router.get("/search/status")
async def get_status():
    return search_service.get_status()