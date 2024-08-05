import express from "express";
import multer from "multer";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const upload = multer();

const httpServer = app.listen(8080, () => {
  console.log("HTTP server is running on http://localhost:8080");
});

// WebSocket 서버 설정
const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());
    console.log(`Received: ${message}`);

    // 모든 클라이언트에게 메시지 브로드캐스트
    wsServer.clients.forEach((client) => {
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

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");

// POST 요청 처리
app.post("/api/popups", upload.array("images"), (req, res) => {
  // 요청 처리 코드
  console.log(req.body);
  console.log(req.files);

  // 필수 필드 확인
  const { name, description, startDate, endDate, hours, content, lat, lon } =
    req.body;
  if (
    !name ||
    !description ||
    !startDate ||
    !endDate ||
    !hours ||
    !content ||
    !lat ||
    !lon
  ) {
    return res.status(400).send("Missing required fields");
  }

  // 성공적으로 처리되었음을 클라이언트에 응답
  res.send("Popup created");
});
