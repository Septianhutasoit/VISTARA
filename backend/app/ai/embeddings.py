from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List

class EmbeddingManager:
    def __init__(self, model_name: str = "intfloat/multilingual-e5-small"):
        self.model_name = model_name
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load Sentence Transformer model"""
        print(f"🔄 Loading model: {self.model_name}")
        self.model = SentenceTransformer(self.model_name)
        print(f"✅ Model loaded successfully! Dimension: {self.model.get_sentence_embedding_dimension()}")
    
    def encode(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings for texts"""
        if self.model is None:
            raise ValueError("Model not loaded")
        return self.model.encode(texts)
    
    def encode_single(self, text: str) -> np.ndarray:
        """Generate embedding for single text"""
        return self.encode([text])[0]
    
    def encode_destinations(self, destinations: List[dict]) -> np.ndarray:
        """Generate embeddings for all destinations"""
        texts = []
        for dest in destinations:
            text = f"{dest.get('name', '')} {dest.get('description', '')} {dest.get('category', '')} {dest.get('location', '')}"
            texts.append(text)
        return self.encode(texts)

# For testing
if __name__ == "__main__":
    manager = EmbeddingManager()
    test_embedding = manager.encode_single("wisata budaya danau toba")
    print(f"Test embedding shape: {test_embedding.shape}")