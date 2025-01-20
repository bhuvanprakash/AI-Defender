# This script is used to produce cyber security events to the Kafka topic "cyber-security-events".
# AI-Defender/data-processing/kafka/producer.py

from kafka import KafkaProducer
import json
import time
import random
import os

broker_url = os.getenv("KAFKA_BROKER_URL", "localhost:9092")
producer = KafkaProducer(bootstrap_servers=broker_url, value_serializer=lambda v: json.dumps(v).encode("utf-8"))

threat_types = ["Ransomware", "SQL Injection", "XSS Attack", "MITM Attack"]

while True:
    event = {
        "timestamp": time.time(),
        "threat": random.choice(threat_types),
        "severity": random.choice(["Low", "Medium", "High", "Critical"])
    }
    producer.send("cyber-security-events", event)
    print(f"Produced: {event}")
    time.sleep(int(os.getenv("PRODUCER_SLEEP_SECONDS", "3")))
