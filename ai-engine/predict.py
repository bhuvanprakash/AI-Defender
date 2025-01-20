# AI Model Predictions
# AI-Defender/ai-engine/predict.py

import torch
import faiss
import numpy as np
from model_loader import predict_threat

def batch_predict_threats(threat_list):
    """Process multiple threat events in a batch"""
    batch_size = len(threat_list)
    results = []
    for i in range(0, batch_size, 10):  # Process in batches of 10
        batch_data = threat_list[i:i+10]
        results.extend(predict_threat(batch_data))
    return results

# Create FAISS index for threat embedding search
index = faiss.IndexFlatL2(10)

def add_threat_to_index(threat_vector):
    """Store past threats for fast lookup"""
    index.add(np.array([threat_vector]).astype('float32'))

def find_similar_threats(threat_vector):
    """Find similar past threats using FAISS"""
    distances, indices = index.search(np.array([threat_vector]).astype('float32'), k=3)
    return indices.tolist()
