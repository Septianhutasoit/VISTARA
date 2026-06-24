import os
import torch
import numpy as np
from PIL import Image
from sentence_transformers import SentenceTransformer, util


class VisionManager:
    def __init__(self):
        self.model_name = 'clip-ViT-B-32'
        self.model = None
        self.sample_embeddings = None
        self.sample_labels: list = []
        self.load_model()

    def load_model(self):
        print(f"🔄 Loading Vistara Lens (CLIP Model): {self.model_name}...")
        try:
            self.model = SentenceTransformer(self.model_name, device='cpu')
            print("✅ Vistara Lens Model Ready!")
        except Exception as e:
            print(f"❌ Gagal memuat Vision AI: {e}")
            self.model = None

    def encode_image(self, image_source):
        """Ubah gambar (path atau file object) menjadi vektor."""
        if self.model is None:
            raise RuntimeError("Model belum dimuat.")
        img = Image.open(image_source).convert('RGB')
        return self.model.encode(img)

    def train_samples(self):
        """
        Load foto dari struktur folder BERTINGKAT secara rekursif.

        Struktur yang didukung:
            vision_samples/
                ulos/
                    ulos_ragihotang/   ← LABEL = nama folder paling ujung
                        foto1.jpg
                    ulos_sibolang/
                        foto1.jpg
                kuliner/
                    mie_gomak/         ← LABEL = mie_gomak
                        foto1.jpg
                wisata/
                    bukit_holbung/
                        foto1.jpg
        """
        base_path = os.path.join(
            os.path.dirname(__file__), "..", "..", "..", "dataset", "vision_samples"
        )
        base_path = os.path.normpath(base_path)

        if not os.path.exists(base_path):
            print(f"⚠️  Folder tidak ditemukan: {base_path}")
            print("⚠️  Buat folder dataset/vision_samples/ dan isi dengan foto.")
            return

        all_embeddings = []
        labels = []
        skipped = 0

        print(f"🔄 Memproses dataset visual dari: {base_path}")
        print("─" * 60)

        # os.walk menembus semua subfolder secara rekursif
        for root, dirs, files in os.walk(base_path):
            # Skip folder root utama (vision_samples itu sendiri)
            if root == base_path:
                continue

            # Skip folder kategori level-1 (ulos/, kuliner/, wisata/, dll)
            # yang tidak langsung berisi foto — hanya berisi subfolder
            image_files = [
                f for f in files
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
            ]
            if not image_files:
                continue

            # Nama folder paling ujung = LABEL
            category_label = os.path.basename(root)

            for img_file in image_files:
                img_path = os.path.join(root, img_file)
                try:
                    emb = self.encode_image(img_path)
                    all_embeddings.append(emb)
                    labels.append(category_label)
                except Exception as e:
                    print(f"  ❌ Gagal proses {img_file}: {e}")
                    skipped += 1

            print(f"  ✅ {category_label}: {len(image_files)} foto")

        print("─" * 60)

        if all_embeddings:
            self.sample_embeddings = torch.tensor(np.array(all_embeddings))
            self.sample_labels = labels

            unique_cats = sorted(set(labels))
            print(f"✅ Vistara Lens siap!")
            print(f"   📸 Total foto   : {len(labels)}")
            print(f"   🏷️  Kategori     : {len(unique_cats)}")
            if skipped:
                print(f"   ⚠️  Dilewati     : {skipped} foto")
            print(f"   📂 Label aktif  : {', '.join(unique_cats)}")
        else:
            print("⚠️  Tidak ada foto yang berhasil diproses.")
            print("    Pastikan folder berisi file .jpg / .jpeg / .png")

    async def identify(self, upload_file) -> dict:
        """
        Identifikasi foto yang diupload user.
        Mengembalikan label, confidence, dan top-3 kandidat.
        """
        if self.model is None:
            return {"error": "Model Vision AI belum siap."}

        if self.sample_embeddings is None or len(self.sample_labels) == 0:
            return {
                "error": "Dataset visual kosong.",
                "hint": "Isi folder dataset/vision_samples/ lalu restart server."
            }

        try:
            query_emb = self.encode_image(upload_file)
            hits = util.semantic_search(query_emb, self.sample_embeddings, top_k=3)[0]

            best = hits[0]
            label    = self.sample_labels[best['corpus_id']]
            score    = float(best['score'])

            # Format label untuk ditampilkan ke user
            label_display = label.replace("_", " ").title()

            # Top-3 kandidat
            candidates = [
                {
                    "label":      self.sample_labels[h['corpus_id']].replace("_", " ").title(),
                    "label_id":   self.sample_labels[h['corpus_id']],
                    "confidence": round(float(h['score']), 4),
                }
                for h in hits
            ]

            # Threshold: jika confidence terlalu rendah, jujur ke user
            if score < 0.20:
                return {
                    "label":      "Tidak Dikenali",
                    "label_id":   "unknown",
                    "confidence": round(score, 4),
                    "message":    "Foto tidak mirip dengan dataset. Coba foto yang lebih jelas.",
                    "candidates": candidates,
                }

            return {
                "label":      label_display,
                "label_id":   label,
                "confidence": round(score, 4),
                "candidates": candidates,
            }

        except Exception as e:
            return {"error": f"Gagal mengidentifikasi gambar: {str(e)}"}


# Instance global
vision_manager = VisionManager()