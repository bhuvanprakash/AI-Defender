# Incident Logs API
# AI-Defender/backend/app/api/routes/logs.py

from app.config import settings
from fastapi import APIRouter

router = APIRouter()

@router.get("/logs")
async def get_logs():
    return {"logs": []}