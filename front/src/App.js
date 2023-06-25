import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatInput from "./Components/Input";
import Chat from "./Components/Chat";
import Users from "./Components/Users";

const socket = io("http://localhost:3000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("get_messages");
      socket.emit("get_users");
    });

    socket.on("chat_message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("chat_messages", (messages) => {
      setMessages(messages);
    });

    socket.on("user_typing", (nickname) => {
      setUserTyping(nickname);
    });

    socket.on("user_stop_typing", () => {
      setUserTyping("");
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off("chat_messages");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, []);

  return (
    <div className="App">
      {/* Same as */}
      <div className="flex flex-row border border-indigo-700 rounded-md w-full h-[60vh] container mx-auto mt-1">
        <Users socket={socket} />
        <div className="flex flex-col justify-between items-center h-full w-full">
          <div className="flex w-full justify-between px-2">
            <p class="font-bold">
              {isConnected ? "CONNECTED" : "DISCONNECTED"}
            </p>
            <p>{userTyping.length > 0 ? `${userTyping} is typing...` : ""}</p>
          </div>
          <Chat messages={messages} />
          <ChatInput socket={socket} />
        </div>
      </div>
    </div>
  );
}

export default App;
