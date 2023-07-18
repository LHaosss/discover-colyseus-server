const client = new Colyseus.Client("ws://localhost:2567");

try {
  const room = client.create("default", {
    /* options */
  });
  room.then((room) => {
    console.log(`message:
      roomId: ${room.roomId}
      Create Successfully`);
  });
} catch (e) {
  console.error("create error", e);
}

client.join("default").then((room) => {
  console.log(`message:
      rooId: ${room.roomId}
      Join Successfully`);
});
