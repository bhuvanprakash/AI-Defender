# AI-Defender/backend/app/api/routes/auth.py
# User Authentication API

from app.models.user import User
from database.config import SessionLocal
from jose import JWTError, jwt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: int = 15):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
async def register(username: str, password: str, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(password)
    new_user = User(username=username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(username: str, password: str):
    return {"message": "User logged in"}

@router.post("/token")
async def generate_token(username: str):
    token = create_access_token({"sub": username})
    return {"access_token": token}
