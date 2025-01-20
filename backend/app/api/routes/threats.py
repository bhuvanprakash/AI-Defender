# Threat Detection API
# AI-Defender/backend/app/api/routes/threats.py

import sys
import redis
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models import Threat
from app.database.config import SessionLocal
from app.schemas import ThreatCreate, ThreatResponse

# Add ai-engine directory to Python path
sys.path.append("/home/neo/Downloads/AI-Defender/ai-engine")
from model_loader import predict_threat, decide_action

router = APIRouter()
redis_client = redis.Redis(host="redis", port=6379, decode_responses=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/threats", response_model=ThreatResponse)
def create_threat(threat: ThreatCreate, db: Session = Depends(get_db)):
    db_threat = Threat(**threat.dict())
    db.add(db_threat)
    db.commit()
    db.refresh(db_threat)
    return db_threat


@router.get("/threats", response_model=List[ThreatResponse])
def read_threats(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    threats = db.query(Threat).offset(skip).limit(limit).all()
    return threats


@router.post("/analyze")
async def analyze_threat(graph_data: list):
    threat_level = predict_threat(graph_data)
    action = decide_action(threat_level)
    return {"threat_level": threat_level, "recommended_action": action}


@router.get("/latest-threat", response_model=ThreatResponse)
def get_latest_threat(db: Session = Depends(get_db)):
    latest_threat = db.query(Threat).order_by(Threat.timestamp.desc()).first()
    if not latest_threat:
        raise HTTPException(status_code=404, detail="No threats found")
    return latest_threat


@router.get("/threats_summary")
async def get_threats_summary(db: Session = Depends(get_db)):
    count = db.query(Threat).count()
    return {"total_threats": count}