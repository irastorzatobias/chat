let users = []; // Array of connected users
const MAX_USERS = 50;

const addUser = (nickname, socketId) => {
  if (users.length < MAX_USERS && !users.some(user => user.nickname === nickname)) {
    users.push({ nickname, socketId });
    console.log(`User ${nickname} added.`);
  }
};

const removeUser = (socketId) => {
  user = users.find(user => user.socketId === socketId);
  if (user) {
    users = users.filter(user => user.socketId !== socketId);
    console.log(`User ${user.nickname} removed.`);
  }

  return user;
};

const getUsers = () => {
  return users;
}

module.exports = { addUser, removeUser, getUsers };
