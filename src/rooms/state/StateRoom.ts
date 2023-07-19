import { Room, Client } from "@colyseus/core";
import { StateRoomState, Player } from "./schema/StateRoomState";

export class StateRoom extends Room<StateRoomState> {
  onCreate() {
    this.setState(new StateRoomState());

    this.onMessage("move", (client: Client, message) => {
      this.state.players.forEach((player, key) => {
        if (message.move) {
          if (key === client.sessionId) {
            player.position += message.move;
          }
        }
        console.log("player:", player.position);
      });

      this.state.numberField++;
      console.log("numberField:", this.state.numberField);

      client.send("reply", { message: "move event has been solved" });
    });
  }

  onJoin(client: Client) {
    console.log("client.sessionId:", client.sessionId);
    const player = new Player();
    player.id = client.sessionId;
    this.state.players.set(client.sessionId, player);
  }
}
