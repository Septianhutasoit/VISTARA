from sqlalchemy import Column, Integer, String, Float, Text
from app.db.session import Base

class Destination(Base):
    __tablename__ = "destinations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False) 
    location = Column(String(100))
    description = Column(Text)
    rating = Column(Float, default=0.0)
    image_url = Column(String(255), nullable=True) 