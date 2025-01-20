# Train Graph Neural Network
# AI-Defender/ai-engine/training/train_gnn.py

import torch
import torch.nn as nn
import torch.optim as optim
import torch_geometric
import onnx
import torch_tensorrt
from torch_geometric.nn import GCNConv
import networkx as nx
import numpy as np

# Sample threat dataset (attack source → target)
threat_data = [
    (0, 1), (1, 2), (2, 3),  # Normal Traffic
    (4, 5), (5, 6), (6, 7),  # Potential Attack Path
    (7, 8), (8, 9), (9, 10), # Confirmed Attack
]

# Convert to NetworkX Graph
G = nx.Graph()
G.add_edges_from(threat_data)

# Convert NetworkX graph to PyTorch Geometric graph
edge_index = torch.tensor(list(G.edges), dtype=torch.long).t().contiguous()
x = torch.eye(G.number_of_nodes())  # Identity Matrix (One-hot encoding)

# Define GNN Model
class ThreatDetectorGNN(nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super(ThreatDetectorGNN, self).__init__()
        self.conv1 = GCNConv(in_channels, hidden_channels)
        self.conv2 = GCNConv(hidden_channels, out_channels)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index).relu()
        x = self.conv2(x, edge_index)
        return x

# Initialize model
model = ThreatDetectorGNN(in_channels=G.number_of_nodes(), hidden_channels=16, out_channels=2)
optimizer = optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.CrossEntropyLoss()

# Training loop
for epoch in range(50):
    optimizer.zero_grad()
    out = model(x, edge_index)
    target = torch.tensor([0] * 3 + [1] * 7)  # 0 = Safe, 1 = Attack
    loss = loss_fn(out, target)
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

# Save trained model
torch.save(model.state_dict(), "models/gnn_model.pth")

# Load model
model.load_state_dict(torch.load("models/gnn_model.pth"))
model.eval()

# Move model to the correct device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Convert to TorchScript
scripted_model = torch.jit.script(model)
scripted_model.save("models/gnn_model_torchscript.pth")

# Convert to ONNX
dummy_input = (torch.randn(10, 10), torch.randint(0, 10, (2, 20)))
torch.onnx.export(model, dummy_input, "models/gnn_model.onnx", opset_version=11)

# Optimize using TensorRT
trt_model = torch_tensorrt.compile(scripted_model, inputs=[torch_tensorrt.Input((10, 10))])
torch.jit.save(trt_model, "models/gnn_model_trt.pth")

print("✅ Model optimized and exported: TorchScript, ONNX, TensorRT")
