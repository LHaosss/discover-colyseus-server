const client = new Colyseus.Client("ws://localhost:2567");

let rm;

client.joinOrCreate("state").then((room) => {
  console.log(
    `message:
      roomId: ${room.roomId}
      sessionId: ${room.sessionId}
      JoinOrCreate Successfully`
  );

  rm = room;

  room.onMessage("reply", function (message) {
    console.log("msg received from reply:", message);
  });

  // console original state
  room.onStateChange.once((state) => {
    console.log("initial state:", state["players"][room.sessionId]);
  });

  room.onStateChange((state) => {
    state.listen("numberField", (value, previousValue) => {
      console.log("previousValue:", previousValue);
      console.log("currentValue", value);
    });

    state.listen("players", (value, previousValue) => {
      console.log(
        "previousValue:",
        previousValue ? previousValue[room.sessionId].position : previousValue
      );
      console.log("currentValue", value[room.sessionId].position);
    });
  });
});

function sendMoveMessage() {
  rm.send("move", { move: 3 });
  console.log(rm.state["numberField"]);
}
