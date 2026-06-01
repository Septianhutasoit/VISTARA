from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.engine import make_url
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Validasi URL
if not DATABASE_URL:
    raise ValueError("DATABASE_URL tidak ditemukan di .env")

# Perbaiki prefix jika dari Neon tertulis postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    # Memastikan URL valid untuk SQLAlchemy
    new_url = make_url(DATABASE_URL)
    engine = create_engine(new_url, pool_pre_ping=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    print(f"❌ Error parsing Database URL: {e}")
    raise e

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()