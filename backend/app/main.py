from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI(
    title="CulTour API",
    description="AI-Powered Cultural Tourism Assistant for Danau Toba",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to CulTour API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "search": "/api/v1/search?q=your_query",
            "destinations": "/api/v1/destinations",
            "health": "/health"
        }
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "CulTour Backend",
        "version": "1.0.0"
    }

# Import and include routers
try:
    from app.api.v1.endpoints import search
    app.include_router(search.router, prefix="/api/v1", tags=["search"])
    print("✅ Search router loaded successfully")
except Exception as e:
    print(f"⚠️ Error loading search router: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)