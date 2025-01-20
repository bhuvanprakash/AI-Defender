# docker file for ai-engine
# build the ai-engine and run the server
# AI-Defender/ai-engine/Dockerfile

FROM python:3.10

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD ["python", "predict.py"]
