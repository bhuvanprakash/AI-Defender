# Database configurations
# AI-Defender/database/config.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER', 'defender_admin')}:"
    f"{os.getenv('DB_PASSWORD', 'SuperSecretPass')}@"
    f"{os.getenv('DB_HOST', 'localhost')}/ai_defender"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
