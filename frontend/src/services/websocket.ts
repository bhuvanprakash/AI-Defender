// WebSocket connection
// AI-Defender/frontend/src/services/websocket.ts

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/ws/threats`; // Ensure this URL is correct

let socket: WebSocket | null = null;

export function connectWebSocket(onMessage: (data: any) => void, maxRetries = 3) {
  let attempts = 0;

  function createSocket() {
    if (!process.env.NEXT_PUBLIC_WS_URL) {
      console.error("WebSocket URL not configured");
      return null;
    }
    socket = new WebSocket(SOCKET_URL);
    
    socket.onopen = () => {
      console.log("WebSocket Connected");
      attempts = 0; // Reset attempts on successful connection
    };

    socket.onmessage = (event) => {
      const threatData = JSON.parse(event.data);
      onMessage(threatData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      if (attempts < maxRetries) {
        attempts++;
        setTimeout(createSocket, 2000);
      }
    };
  }

  createSocket();
  return socket;
}
