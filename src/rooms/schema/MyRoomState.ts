import { Schema, Context, type } from "@colyseus/schema";

export class MyRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

}


export class MyDefinedState extends Schema {
  @type("string") msg: string = "hello client";
}