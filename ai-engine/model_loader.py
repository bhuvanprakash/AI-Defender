# Load AI models for API
# AI-Defender/ai-engine/model_loader.py

import sys
import torch
import torch_geometric
from stable_baselines3 import PPO

from training.train_gnn import ThreatDetectorGNN

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load GNN Model
gnn_model = ThreatDetectorGNN(10, 16, 2)
gnn_model.load_state_dict(torch.load("models/gnn_model.pth", map_location=device))
gnn_model.to(device)
gnn_model.eval()

# Load RL Model
rl_model = PPO.load("models/rl_model")
rl_model.set_device(device)

def predict_threat(graph_data):
    """Predicts threat level using GNN"""
    edge_index = torch.tensor(graph_data, dtype=torch.long).t().contiguous().to(device)
    x = torch.eye(10).to(device)
    output = gnn_model(x, edge_index)
    return output.argmax(dim=1).tolist()

def decide_action(threat_level):
    """Decides action using RL model"""
    return rl_model.predict([threat_level])
