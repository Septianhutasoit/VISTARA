from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import urllib.parse
from dotenv import load_dotenv

# Paksa reload .env
load_dotenv(override=True)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL tidak ditemukan! Pastikan file .env sudah benar.")

# Fix prefix
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    # Parsing manual untuk meng-encode password yang mengandung karakter spesial (@, #, !, dll)
    # Format: postgresql://user:password@host/dbname?sslmode=require
    prefix, rest = DATABASE_URL.split("://")
    user_pass, host_rest = rest.split("@")
    user, password = user_pass.split(":")
    
    # Encode password agar aman bagi SQLAlchemy
    encoded_password = urllib.parse.quote_plus(password)
    
    # Rakit kembali URL-nya
    CLEAN_URL = f"{prefix}://{user}:{encoded_password}@{host_rest}"
    
    engine = create_engine(
        CLEAN_URL, 
        pool_pre_ping=True,
        connect_args={'connect_timeout': 10}
    )
    print("✅ Konfigurasi Database Berhasil Disusun.")
except Exception as e:
    # Jika parsing gagal, gunakan URL asli (mungkin passwordnya sudah bersih)
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
    print(f"⚠️ Menggunakan URL asli karena: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()