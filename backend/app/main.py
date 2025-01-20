import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import threats, websocket, logs, auth
from app.database.config import Base, engine
from app import models  # Ensure models are imported to create tables

logging.basicConfig(level=logging.INFO)
logging.info("Starting AI Defender API...")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Defender API"}

app.include_router(threats.router, prefix="/api")
app.include_router(websocket.router, prefix="/ws")
app.include_router(logs.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

# Create the database tables
Base.metadata.create_all(bind=engine)
