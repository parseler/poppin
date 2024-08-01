import { useState, useEffect, useRef } from "react";
import "@css/Pop/PopDetailChat.css";

import noticePin from "@assets/noticePin.svg";
import sendButton from "@assets/sendButton.svg";

interface ChatMessage {
  type: "me" | "other";
  profile?: string;
  nickName?: string;
  content: string;
  time: string;
}

const chatData: ChatMessage[] = [];

const noticeContent =
  "이것은 공지사항입니다. 과연 어디까지 공지사항 처음에 표시될지 너무나 궁금한데요. 일단 세 줄이 될 때까지 적어보겠습니다.";

const convertNewlinesToBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const Chat = () => {
  const [chats, setChats] = useState<ChatMessage[]>(chatData);
  const [message, setMessage] = useState<string>("");
  const [notice] = useState<string>(noticeContent);
  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  const chatMessageRef = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8081");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onmessage = async (event) => {
      let message: string;
      if (typeof event.data === "string") {
        message = event.data;
      } else if (event.data instanceof Blob) {
        message = await event.data.text();
      } else {
        console.error("Unsupported data type:", typeof event.data);
        return;
      }

      try {
        const newMessage: ChatMessage = JSON.parse(message);
        setChats((prevChats) => [...prevChats, newMessage]);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (isAutoScroll && chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [chats, isAutoScroll]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: ChatMessage = {
      type: "me",
      content: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(newMessage));
    } else {
      console.error("WebSocket is not open");
    }

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleScroll = () => {
    if (!chatMessageRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatMessageRef.current;

    if (scrollHeight - scrollTop === clientHeight) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  };

  return (
    <div className="chat-container">
      {notice && (
        <div className="notice">
          <div className="notice-title">
            <div className="notice-title-pin">
              <img src={noticePin} />
              <div>공지사항</div>
            </div>
            <button onClick={() => setNoticeOpen(!noticeOpen)}>
              {noticeOpen ? "▲" : "▼"}
            </button>
          </div>
          <div className={`notice-content ${noticeOpen ? "" : "collapsed"}`}>
            {noticeContent}
          </div>
        </div>
      )}
      <div
        className="chat-messages"
        ref={chatMessageRef}
        onScroll={handleScroll}
      >
        {chats.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.type}`}>
            {chat.type === "other" && (
              <>
                <div className="chat-info">
                  <div className="chat-header">
                    <img src={chat.profile} className="profile-img" />
                    <div className="chat-name">
                      <span className="nickname">{chat.nickName}</span>
                      <button className="report-button">신고하기</button>
                    </div>
                  </div>
                  <div className="chat-content">
                    {convertNewlinesToBreaks(chat.content)}
                  </div>
                </div>
              </>
            )}
            <div className="chat-time">{chat.time}</div>
            {chat.type === "me" && (
              <div className="chat-content me">
                {convertNewlinesToBreaks(chat.content)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="실시간 채팅하기"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <button onClick={sendMessage}>
          <img src={sendButton} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
