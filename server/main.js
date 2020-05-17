let express = require("express");
let app = express();
let server = require("http").Server(app);

let io = require("socket.io")(server);

app.use(express.static("../client/"));

app.get("/", function (req, res) {
  res.status(200).send("Hola Mundo !");
});

let listMessage = [];

//AL CONECTAR AL SOCKET
io.on("connect", function (socket) {
  listMessage.push({
    text: `Alguein se ha conectado!`,
    username: "[SERVER]",
  });

  io.sockets.emit("messages", listMessage);
  // --

  socket.on("newMessage", function (data) {
    listMessage.push({
      username: socket.id,
      text: data.text,
    });
    io.sockets.emit("messages", listMessage);
  });

  // DESCONECTARSE DEL SOCKET
  socket.on("disconnect", function () {
    listMessage.push({
      text: ` Alquien se ha desconectado!`,
      username: "[SERVER]",
    });

    io.sockets.emit("messages", listMessage);
  });
});

server.listen(80, function () {
  console.log("EL SERVIDOR ESTA FUNCIONANDO PERFECTAMENTE EN EL PUERTO 80");
});
