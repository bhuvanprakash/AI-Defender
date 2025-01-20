# Kafka & WebSocket event handler
# AI-Defender/backend/app/services/event_stream.py

import asyncio
import random
from datetime import datetime
from kafka import KafkaProducer
import json
import redis

class ThreatEventStream:
    @staticmethod
    async def get_latest_threat():
        threat_types = ["Malware", "Phishing", "Unauthorized Access", "DDoS"]
        severities = ["Low", "Medium", "High", "Critical"]
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "threat_type": random.choice(threat_types),
            "severity": random.choice(severities),
            "description": "Real-time cybersecurity alert generated!"
        }

# Initialize Kafka Producer
producer = KafkaProducer(
    bootstrap_servers="kafka:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

# Initialize Redis Client
redis_client = redis.Redis(host="redis", port=6379, decode_responses=True)

def send_threat_alert(threat_data):
    """Publish cybersecurity threat event to Kafka & Cache in Redis"""
    producer.send("cyber-security-events", threat_data)
    redis_client.set("latest_threat", json.dumps(threat_data))
    producer.flush()

async def async_send_threat_alert(threat_data):
    await asyncio.to_thread(send_threat_alert, threat_data)