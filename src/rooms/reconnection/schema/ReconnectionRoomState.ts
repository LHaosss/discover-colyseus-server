import { Schema, Context, type, ArraySchema } from "@colyseus/schema";
import { Client } from "@colyseus/core";

export class ReconnectionRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
}
