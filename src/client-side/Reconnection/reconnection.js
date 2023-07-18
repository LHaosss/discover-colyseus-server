const client = new Colyseus.Client("ws://localhost:2567");

client.joinOrCreate("reconnection").then((room) => {
  console.log(
    "roomId:",
    room.roomId,
    "sessionId:",
    room.sessionId,
    "reconnectinoToken:",
    room.reconnectionToken
  );
  localStorage.setItem("reconnectionToken", room.reconnectionToken);
});

console.log(localStorage.getItem("reconnectionToken"));
client.reconnect(localStorage.getItem("reconnectionToken")).then((room) => {
  console.log(`message:
        roomId: ${room.roomId}
        Reconnect Successfully`);
});
