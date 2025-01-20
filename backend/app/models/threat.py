# AI-Defender/backend/app/models/threat.py

from sqlalchemy import Column, Integer, String, TIMESTAMP
from database.config import Base
from datetime import datetime

class ThreatLog(Base):
    __tablename__ = "threat_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(TIMESTAMP, default=datetime.utcnow)
    threat_type = Column(String)
    severity = Column(String)
    description = Column(String)
    source_ip = Column(String)
