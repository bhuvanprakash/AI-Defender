# App configuration settings
# AI-Defender/backend/app/config.py

import os

class Settings:
    PROJECT_NAME = "AI-Defender"
    VERSION = "1.0.0"

    # Database Configuration
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_USER = os.getenv("DB_USER", "defender_admin")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "SuperSecretPass")
    DB_NAME = os.getenv("DB_NAME", "ai_defender")

    # Kafka Configuration
    KAFKA_BROKER_URL = os.getenv("KAFKA_BROKER_URL", "localhost:9092")

    # Redis Configuration
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

    # WebSocket Logs Configuration
    ENABLE_WEB_SOCKET_LOGS = os.getenv("ENABLE_WEB_SOCKET_LOGS", "False") == "True"

settings = Settings()
