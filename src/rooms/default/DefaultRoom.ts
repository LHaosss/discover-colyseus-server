import { Room, Client, ClientArray } from "@colyseus/core";
import { MyRoomState, MyDefinedState } from "./schema/MyRoomState";

export class DefaultRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      console.log("received msg by type");
      console.log(client, message);
    });

    this.onMessage("move", (client, message) => {
      console.log("received msg by move");
      console.log(message);
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
