import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ port: 8081 });

server.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(`Received: ${message}`);

    // 모든 클라이언트에게 메시지 브로드캐스트
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        // 보낸 클라이언트에게는 그대로, 다른 클라이언트에게는 "other"로 변경
        const outgoingMessage = {
          ...parsedMessage,
          type: client === ws ? parsedMessage.type : "other",
        };
        console.log(`Sending to client: ${JSON.stringify(outgoingMessage)}`);
        client.send(JSON.stringify(outgoingMessage));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});

console.log('WebSocket server is running on ws://localhost:8081');