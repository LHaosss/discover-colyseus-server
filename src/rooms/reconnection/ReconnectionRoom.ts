import { Client, ClientArray, Room } from "@colyseus/core";
import { ReconnectionRoomState } from "./schema/ReconnectionRoomState";

export class ReconnectionRoom extends Room<ReconnectionRoomState> {
  maxClients: number = 4;

  async onCreate() {
    this.setState(new ReconnectionRoomState());

    this.onMessage("reconnection", (client, message) => {
      console.log(client, message);
    });
  }

  async onLeave(client: Client, consented: boolean) {
    try {
      if (consented) {
        throw new Error("consented leave");
      }
      await this.allowReconnection(client, 20);
      console.log("Client successfully reconnected!");
    } catch (e) {
      console.log(`Could not reconnect. Err: ${e}`);
    }
  }
}
