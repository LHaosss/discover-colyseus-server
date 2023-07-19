import { Room, Client, ClientArray } from "@colyseus/core";
import { PhaserRoomState, Player } from "./schema/PhaserRoomState";

export class PhaserRoom extends Room<PhaserRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new PhaserRoomState());

    console.log("Joined successfully!");

    this.onMessage(0, (client, message) => {
      // get reference to the player who sent the message
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;

      if (message.left) {
        player.x -= velocity;
      }
      if (message.right) {
        player.x += velocity;
      }
      if (message.up) {
        player.y -= velocity;
      }
      if (message.down) {
        player.y += velocity;
      }
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    const mapWith = 800;
    const mapHeight = 600;

    // create player instance
    const player = new Player();

    // place Player at a random position
    player.x = Math.random() * mapWith;
    player.y = Math.random() * mapHeight;

    // place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
