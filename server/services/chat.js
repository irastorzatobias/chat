let messages = []; // Array of chat messages
const MAX_MESSAGES = 500;

const addMessage = (message) => {
  if (messages.length >= MAX_MESSAGES) {
    messages.shift();
  }
  messages.push(message);
};

const getMessages = () => {
  return messages;
};

module.exports = { addMessage, getMessages };
