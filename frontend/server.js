import express from "express";
import multer from "multer";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const upload = multer({ dest: 'uploads/' }); // 파일 업로드 경로 설정

// HTTP 서버 시작
const httpServer = app.listen(3000, () => { // 포트 번호 설정
  console.log("HTTP server is running on http://localhost:3000");
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

console.log("WebSocket server is running on ws://localhost:3000");

// POST 요청 처리
app.post("/api/popups", upload.array("images", 10), (req, res) => { // 파일 개수 제한
  const images = req.files;
  const popupData = JSON.parse(req.body.popupData);

  // 요청 처리 코드
  console.log(popupData);
  console.log(images);

  const { name, description, startDate, endDate, hours, content, lat, lon } =
    popupData;
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

  res.send("Popup created");
});
