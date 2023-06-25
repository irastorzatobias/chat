const Chat = ({ messages }) => {
  return (
    <div className="h-[70vh] overflow-y-scroll w-full">
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-row justify-between p-1 bg-indigo-100 mb-1
          scroll-auto"
        >
          <p className="text-indigo-700 font-bold">{message.user}</p>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
