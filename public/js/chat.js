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
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  });
});
