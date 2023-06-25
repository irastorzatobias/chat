import { useState } from "react";

const ChatInput = ({ socket }) => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [userSet, setUserSet] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    if (event.target.value.length > 0) {
      socket.emit('typing', nickname);
    } else {
      socket.emit('stop_typing');
    }
  };

  const sendMessage = () => {
    if (nickname === "") {
      alert("Please enter a nickname before sending a message");
      return;
    }

    if (!userSet) {
      socket.emit("add_user", nickname);
      setUserSet(true);
    }

    if (!message) {
      alert("Please enter a message");
      return;
    }

    const messageObj = { user: nickname, message: message };
    socket.emit("chat_message", messageObj);
    setMessage("");
    socket.emit('stop_typing');
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-row gap-2 border-t w-full p-1 justify-between">
      <input
        type="text"
        className="border border-indigo-200 rounded-md px-1 w-1/5"
        placeholder="Nick"
        onChange={handleNicknameChange}
        disabled={userSet}
      />
      <div className="space-x-2 flex flex-row w-1/2">
        <input
          type="text"
          className="border border-indigo-200 rounded-md px-1 w-full"
          onChange={handleMessageChange}
          value={message}
          placeholder="Enter message"
          onKeyDown={handleEnter}
        />
        <button
          className="bg-indigo-200 text-indigo-700 px-1 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
