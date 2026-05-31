from typing import List, Dict, Any
from app.ai.embeddings import EmbeddingManager
from app.ai.faiss_index import FAISSIndex

class SearchService:
    def __init__(self):
        self.embedding_manager = EmbeddingManager()
        self.faiss_index = FAISSIndex(dimension=384)
        self.destinations = []
        self.is_ready = False
    
    def initialize_with_destinations(self, destinations: List[dict]):
        """Initialize FAISS index with destination embeddings"""
        print(f"🔄 Initializing search service with {len(destinations)} destinations...")
        self.destinations = destinations
        
        # Generate embeddings for all destinations
        embeddings = self.embedding_manager.encode_destinations(destinations)
        
        # Add to FAISS index
        self.faiss_index.add_embeddings(embeddings, destinations)
        self.is_ready = True
        print(f"✅ Search service ready! Index size: {self.faiss_index.index.ntotal}")
    
    async def search(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Search similar destinations using semantic search"""
        if not self.is_ready:
            return []
        
        # Generate query embedding
        query_embedding = self.embedding_manager.encode_single(query)
        
        # Search in FAISS
        results = self.faiss_index.search(query_embedding, limit)
        
        # Format results
        formatted_results = []
        for dest, distance in results:
            # Convert distance to similarity score (closer distance = higher similarity)
            similarity = 1.0 / (1.0 + distance)
            formatted_results.append({
                "destination": dest,
                "similarity_score": round(similarity, 4),
                "distance": round(distance, 4)
            })
        
        return formatted_results
    
    def get_status(self) -> dict:
        """Get service status"""
        return {
            "is_ready": self.is_ready,
            "model_loaded": self.embedding_manager.model is not None,
            "index_size": self.faiss_index.index.ntotal if self.faiss_index.index else 0,
            "model_name": self.embedding_manager.model_name
        }

# Global instance
search_service = SearchService()