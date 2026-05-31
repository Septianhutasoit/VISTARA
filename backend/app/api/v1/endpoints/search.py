from fastapi import APIRouter, Query, HTTPException
from typing import List, Dict, Any
from app.ai.search import search_service

router = APIRouter()

# Sample destinations data (nanti dari database)
DESTINATIONS = [
    {
        "id": 1,
        "name": "Bukit Holbung Samosir",
        "category": "wisata_alam",
        "description": "Bukit dengan pemandangan indah Danau Toba dan Pulau Samosir. Spot foto terbaik saat matahari terbenam.",
        "location": "Samosir",
        "rating": 4.8,
        "price_range": "murah",
        "latitude": 2.5,
        "longitude": 98.7
    },
    {
        "id": 2,
        "name": "Air Terjun Efrata",
        "category": "wisata_alam",
        "description": "Air terjun cantik dengan kolam renang alami yang menyegarkan. Airnya jernih dan dingin.",
        "location": "Toba",
        "rating": 4.6,
        "price_range": "murah",
        "latitude": 2.3,
        "longitude": 98.9
    },
    {
        "id": 3,
        "name": "Museum Batak Tomok",
        "category": "budaya",
        "description": "Museum sejarah dan budaya Batak di Pulau Samosir. Menampilkan artefak, pakaian adat, dan sejarah Batak.",
        "location": "Samosir",
        "rating": 4.5,
        "price_range": "murah",
        "latitude": 2.4,
        "longitude": 98.8
    },
    {
        "id": 4,
        "name": "Restoran Ni Marnis",
        "category": "kuliner",
        "description": "Ikan bakar khas Danau Toba dengan sambal andaliman yang pedas dan gurih. Porsi besar dan harga terjangkau.",
        "location": "Balige",
        "rating": 4.7,
        "price_range": "sedang",
        "latitude": 2.3,
        "longitude": 99.0
    },
    {
        "id": 5,
        "name": "Pesta Danau Toba",
        "category": "event",
        "description": "Festival tahunan budaya Batak di tepi Danau Toba. Ada tarian tradisional, musik, dan bazaar makanan.",
        "location": "Parapat",
        "rating": 4.9,
        "price_range": "sedang",
        "latitude": 2.6,
        "longitude": 98.8
    },
    {
        "id": 6,
        "name": "Istana Maimun",
        "category": "budaya",
        "description": "Istana Kesultanan Deli dengan arsitektur Melayu, Eropa, dan Islam. Destinasi sejarah populer.",
        "location": "Medan",
        "rating": 4.4,
        "price_range": "murah",
        "latitude": 3.6,
        "longitude": 98.7
    },
    {
        "id": 7,
        "name": "Pantai Pasir Putih Parapat",
        "category": "wisata_alam",
        "description": "Pantai pasir putih dengan pemandangan Danau Toba. Tempat yang tenang untuk bersantai.",
        "location": "Parapat",
        "rating": 4.3,
        "price_range": "murah",
        "latitude": 2.7,
        "longitude": 98.9
    }
]

# Initialize search service on module load
try:
    search_service.initialize_with_destinations(DESTINATIONS)
    print(f"✅ AI Search Service initialized with {len(DESTINATIONS)} destinations")
except Exception as e:
    print(f"⚠️ Error initializing AI Search Service: {e}")

@router.get("/search")
async def semantic_search(
    q: str = Query(..., min_length=1, description="Search query in natural language"),
    limit: int = Query(5, ge=1, le=20, description="Number of results")
):
    """
    🔍 Semantic Search - Find destinations using AI
    
    Gunakan bahasa alami untuk mencari destinasi.
    
    Contoh:
    - "tempat wisata alam yang bagus di samosir"
    - "makanan khas danau toba"
    - "museum dan sejarah batak"
    - "event budaya di bulan juli"
    """
    if not search_service.is_ready:
        return {
            "query": q,
            "total": 0,
            "results": [],
            "message": "AI service is initializing. Please try again in a moment."
        }
    
    results = await search_service.search(q, limit)
    
    return {
        "query": q,
        "total": len(results),
        "results": results,
        "ai_model": "intfloat/multilingual-e5-small",
        "search_type": "semantic_search"
    }

@router.get("/search/status")
async def search_status():
    """📊 Check AI Search Service Status"""
    status = search_service.get_status()
    return {
        "service": "CulTour AI Search",
        **status,
        "destinations_count": len(DESTINATIONS)
    }

@router.get("/destinations")
async def get_all_destinations():
    """📍 Get all destinations"""
    return {
        "total": len(DESTINATIONS),
        "destinations": DESTINATIONS
    }

@router.get("/destinations/{destination_id}")
async def get_destination(destination_id: int):
    """📍 Get destination by ID"""
    for dest in DESTINATIONS:
        if dest["id"] == destination_id:
            return dest
    raise HTTPException(status_code=404, detail="Destination not found")

@router.get("/initialize")
async def initialize_search():
    """🔄 Force re-initialize search service"""
    try:
        search_service.initialize_with_destinations(DESTINATIONS)
        return {"status": "success", "message": "Search service re-initialized"}
    except Exception as e:
        return {"status": "error", "message": str(e)}