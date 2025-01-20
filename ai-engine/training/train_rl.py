# Train Reinforcement Learning Model
# AI-Defender/ai-engine/training/train_rl.py

import gym
import numpy as np
import torch
from stable_baselines3 import PPO

# Define a simple Cybersecurity Environment
class CyberSecurityEnv(gym.Env):
    def __init__(self):
        super(CyberSecurityEnv, self).__init__()
        self.observation_space = gym.spaces.Box(low=0, high=1, shape=(5,))
        self.action_space = gym.spaces.Discrete(3)  # 0 = Ignore, 1 = Alert, 2 = Block

    def reset(self):
        return np.random.rand(5)

    def step(self, action):
        reward = 1 if action == 2 else -1  # Reward blocking threats
        done = np.random.rand() < 0.1  # 10% chance of ending
        return np.random.rand(5), reward, done, {}

# Train Reinforcement Learning Model
env = CyberSecurityEnv()
model = PPO("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=10000)

# Save trained model
model.save("models/rl_model")

# Move model to the correct device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.policy.to(device)

# Convert to TorchScript
scripted_model = torch.jit.script(model.policy)
scripted_model.save("models/rl_model_torchscript.pth")

# Convert to ONNX
torch.onnx.export(model.policy, torch.randn(1, 5).to(device), "models/rl_model.onnx", opset_version=11)

print("✅ RL Model optimized and exported!")
