let socket = io.connect("http://localhost:8080", {
  forceNew: true,
});

socket.on("messages", function (data) {
  render(data);
});

function render(data) {
  let html = data
    .map((d, i) => {
      if (data.length <= 9 || data.length - 9 <= i) {
        if (socket.id === d.username) {
          return `<div>#${i} | <b>YO</b>: <em>${d.text}</em></div>`;
        } else {
          return `<div>#${i} | <b>${d.username}</b>: <em>${d.text}</em></div>`;
        }
      }
    })
    .join(" ");

  document.getElementById("mensajes").innerHTML = html;
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let payload = {
    text: e.target.text.value,
  };
  console.log(payload);

  socket.emit("newMessage", payload);

  // console.log(e.target.username.value);
  //console.log(e.target.texto.value);
});
