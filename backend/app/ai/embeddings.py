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
        # Menggunakan method baru 'get_embedding_dimension' untuk menghindari warning
        print(f"✅ Model loaded successfully! Dimension: {self.model.get_embedding_dimension()}")
    
    def encode(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings for texts"""
        if self.model is None:
            raise ValueError("Model not loaded")
        return self.model.encode(texts, normalize_embeddings=True) # Normalize untuk hasil distance yang lebih stabil
    
    def encode_single(self, text: str) -> np.ndarray:
        """Generate embedding for single text (Query)"""
        # Model E5 membutuhkan prefix "query: " untuk pencarian agar lebih akurat
        formatted_query = f"query: {text}"
        return self.encode([formatted_query])[0]
    
    def encode_destinations(self, destinations: List[dict]) -> np.ndarray:
        """Generate embeddings for all destinations (Passage)"""
        texts = []
        for dest in destinations:
            # Ambil data dengan fallback jika ada typo (seperti 'desctiption' kemarin)
            category = dest.get('category', 'Wisata')
            name = dest.get('name', '')
            location = dest.get('location', '')
            description = dest.get('description', dest.get('desctiption', ''))

            # 1. Gunakan prefix "passage: " untuk data yang disimpan (kebutuhan model E5)
            # 2. Strukturkan teks agar Kategori dan Nama diletakkan di awal (memberi bobot lebih)
            structured_text = (
                f"passage: Kategori: {category}. "
                f"Nama Tempat: {name}. "
                f"Lokasi: {location}. "
                f"Deskripsi: {description}"
            )
            texts.append(structured_text)
            
        return self.encode(texts)

# For testing
if __name__ == "__main__":
    manager = EmbeddingManager()
    # Test konsistensi
    test_embedding = manager.encode_single("wisata alam")
    print(f"✅ Test embedding success. Shape: {test_embedding.shape}")