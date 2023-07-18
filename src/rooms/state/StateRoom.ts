import { Room, Client } from "@colyseus/core";
import { StateRoomState, Player } from "./schema/StateRoomState";

export class StateRoom extends Room<StateRoomState> {
  onCreate() {
    this.setState(new StateRoomState());

    this.onMessage("move", (client: Client, message) => {
      console.log(message.move);
      this.state.players.forEach((player, key) => {
        if (message.move) {
          if (key === client.sessionId) {
            player.position += message.move;
          }
        }
        console.log("player:", player.position);
      });
    });
  }

  onJoin(client: Client) {
    this.state.players.set(client.sessionId, new Player());
  }
}
