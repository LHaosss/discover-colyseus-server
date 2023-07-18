const client = new Colyseus.Client("ws://localhost:2567");

let rm;

client.create("state").then((room) => {
  rm = room;
  console.log(`message:
    room.id: ${room.id}
    Joined Successfully`);
});

function sendMoveMessage() {
  rm.send("move", { move: 4 });
}
