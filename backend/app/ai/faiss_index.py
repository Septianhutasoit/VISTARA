import faiss
import numpy as np
import pickle
import os
from typing import List, Tuple

class FAISSIndex:
    def __init__(self, dimension: int = 384):
        self.dimension = dimension
        self.index = None
        self.metadata = []  # Store destination data
        self.create_index()
    
    def create_index(self):
        """Create new FAISS index"""
        self.index = faiss.IndexFlatL2(self.dimension)
        print(f"✅ Created FAISS index with dimension {self.dimension}")
    
    def add_embeddings(self, embeddings: np.ndarray, metadata_list: List[dict]):
        """Add embeddings to index with metadata"""
        if embeddings.shape[1] != self.dimension:
            raise ValueError(f"Expected dimension {self.dimension}, got {embeddings.shape[1]}")
        
        self.index.add(embeddings.astype('float32'))
        self.metadata.extend(metadata_list)
        print(f"✅ Added {len(metadata_list)} vectors. Total: {self.index.ntotal}")
    
    def search(self, query_embedding: np.ndarray, k: int = 5) -> List[Tuple[dict, float]]:
        """Search similar destinations"""
        if self.index.ntotal == 0:
            return []
        
        query_embedding = query_embedding.reshape(1, -1).astype('float32')
        distances, indices = self.index.search(query_embedding, k)
        
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx != -1 and idx < len(self.metadata):
                results.append((self.metadata[idx], float(distance)))
        
        return results
    
    def save(self, path: str = "faiss_index.bin"):
        """Save index to disk"""
        faiss.write_index(self.index, path)
        metadata_path = path.replace('.bin', '_metadata.pkl')
        with open(metadata_path, 'wb') as f:
            pickle.dump(self.metadata, f)
        print(f"✅ Saved index to {path}")
    
    def load(self, path: str = "faiss_index.bin"):
        """Load index from disk"""
        if os.path.exists(path):
            self.index = faiss.read_index(path)
            metadata_path = path.replace('.bin', '_metadata.pkl')
            with open(metadata_path, 'rb') as f:
                self.metadata = pickle.load(f)
            print(f"✅ Loaded index with {self.index.ntotal} vectors")
            return True
        return False