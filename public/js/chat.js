const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const clientMsg = e.target.elements.message.value;

  socket.emit("sendMessage", clientMsg, (message) => {
    console.log("The message was delivered", message);
  });
});
document.querySelector("#send-location").addEventListener("click", () => {
