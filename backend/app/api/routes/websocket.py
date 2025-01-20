# WebSocket for live alerts
# AI-Defender/backend/app/api/routes/websocket.py

from fastapi import APIRouter, WebSocket
from app.services.event_stream import ThreatEventStream

router = APIRouter()

# Store active WebSocket connections
active_connections = []

async def broadcast_threats(threat_data):
    for connection in active_connections:
        await connection.send_json(threat_data)

@router.websocket("/ws/threats")
async def websocket_threats(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    
    try:
        while True:
            threat_data = await ThreatEventStream.get_latest_threat()
            await broadcast_threats(threat_data)
    except Exception as e:
        print(f"WebSocket Error: {e}")
    finally:
        active_connections.remove(websocket)
