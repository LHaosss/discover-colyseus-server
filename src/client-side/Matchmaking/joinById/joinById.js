const client = new Colyseus.Client("ws://localhost:2567");

// 通过getAvailableRooms()方法获取已建立的房间，通过房间Id加入房间

client
  .getAvailableRooms()
  .then((rooms) => {
    rooms.forEach((room) => {
        const rm = client.joinById(room.roomId)
        rm.then(room => {
          console.log(`message:
            roomId: ${room.roomId}
            JoinById Successfully`)
        })
    });
  })
  .catch((e) => {
    console.error(e);
  });



