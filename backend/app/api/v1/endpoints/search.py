import pandas as pd
import os
from fastapi import APIRouter, Query, HTTPException
from app.ai.search import search_service

router = APIRouter()

def load_data_from_datasets():
    """Menggabungkan semua data dari folder dataset"""
    combined_data = []
    
    # Navigasi ke Project Root (E:\Projects\cultour)
    current_file_path = os.path.abspath(__file__)
    project_root = os.path.dirname(current_file_path) # endpoints
    for _ in range(5):
        project_root = os.path.dirname(project_root)
    
    dataset_dir = os.path.join(project_root, "dataset")
    
    files = {
        "destinations.csv": "Wisata",
        "culinary.csv": "Kuliner",
        "cultures.csv": "Budaya",
        "events.csv": "Event"
    }

    print(f"📂 Lokasi Project Root: {project_root}")
    print(f"📂 Mencari dataset di: {dataset_dir}")

    for file_name, cat in files.items():
        # VARIABEL 'path' DIDEFINISIKAN DI SINI
        file_path = os.path.join(dataset_dir, file_name)
        
        if os.path.exists(file_path):
            try:
                # Membaca CSV dengan proteksi tanda kutip (quotechar)
                df = pd.read_csv(file_path, encoding='utf-8', quotechar='"', skipinitialspace=True)
                df.columns = df.columns.str.strip()
                df['category'] = cat
                df = df.fillna("")
                
                items = df.to_dict('records')
                combined_data.extend(items)
                print(f"✅ Berhasil memuat {len(items)} data dari {file_name}")
            except Exception as e:
                print(f"❌ Gagal membaca {file_name}: {e}")
        else:
            print(f"⚠️ File TIDAK ditemukan di: {file_path}")
    
    return combined_data

# Inisialisasi AI dengan data CSV saat startup
@router.on_event("startup")
async def startup_event():
    try:
        data = load_data_from_datasets()
        if data:
            search_service.initialize_with_destinations(data)
            print(f"🚀 AI Search Ready dengan {len(data)} data asli!")
        else:
            print("⚠️ Gagal memuat data. Periksa folder dataset Anda.")
    except Exception as e:
        print(f"❌ Terjadi kesalahan saat startup: {e}")

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