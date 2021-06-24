const {
  Sequelize,
  sequelize,
  User,
  Project,
  Users_Projects,
} = require("./models");

const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// const server = require("http").createServer();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

// Have Node serve the files for our built React app
// app.use('/static',express.static(path.resolve(__dirname, './client/build')));
app.use('/static', express.static(path.join(__dirname, './client/build')));

//CollabApp Routes
app.use('/register', require('./routes/register'));
app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));
app.use("/", (req, res) => res.send("Hello World. This is the CollabApp"));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//socket.io server

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

// server.listen(PORT, async () => {
//   console.log(`Listening on port ${PORT}`);
// });

server.listen(PORT, async () => {
  console.log(`Server started on port, ${PORT}`);
  await sequelize.authenticate();
  console.log("database synced!");
});
