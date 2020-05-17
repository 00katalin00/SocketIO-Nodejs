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
  console.log("Alguien se ha conectado  ");

  listMessage.push({
    text: "Alguien se ha conectado!",
    username: "[SERVER]",
  });

  io.sockets.emit("messages", listMessage);

  socket.on("newMessage", function (data) {
    listMessage.push({
      username: socket.id,
      text: data.text,
    });

    console.log(socket.id);

    io.sockets.emit("messages", listMessage);
  });

  // DESCONECTARSE DEL SOCKET
  socket.on("disconnect", function () {
    console.log("Alguien se ha desconectado ");
    listMessage.push({
      text: "Alguien se ha desconectado!",
      username: "[SERVER]",
    });
    io.sockets.emit("messages", listMessage);
  });
});

server.listen(8080, function () {
  console.log("EL SERVIDOR ESTA FUNCIONANDO PERFECTAMENTE EN EL PUERTO 8080");
});
