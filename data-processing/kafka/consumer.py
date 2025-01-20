# This script consumes messages from the Kafka topic "cyber-security-events" and prints them to the console.
# AI-Defender/data-processing/kafka/consumer.py

from kafka import KafkaConsumer
import json
import os

broker_url = os.getenv("KAFKA_BROKER_URL", "localhost:9092")
consumer = KafkaConsumer(
    "cyber-security-events",
    bootstrap_servers=broker_url,
    value_deserializer=lambda v: json.loads(v.decode("utf-8"))
)

for message in consumer:
    print(f"Consumed Threat Event: {message.value}")
