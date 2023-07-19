const client = new Colyseus.Client("ws://localhost:2567");

let rm;

client.joinOrCreate("state").then((room) => {
  console.log(
    `message:
      roomId: ${room.roomId}
      sessionId: ${room.sessionId}
      JoinOrCreate Successfully`
  );

  room.onMessage("reply", function (message) {
    console.log("msg received from reply:", message);
  });

  // console original state
  room.onStateChange.once((state) => {
    console.log("initial state:", state["players"][room.sessionId]);
  });

  room.onStateChange((state) => {
    console.log("state changed:", state["players"][room.sessionId]);
  });

  rm = room;
});

function sendMoveMessage() {
  rm.send("move", { move: 3 });
}
