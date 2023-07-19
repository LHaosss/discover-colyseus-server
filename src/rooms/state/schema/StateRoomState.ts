import {
  Schema,
  ArraySchema,
  MapSchema,
  SetSchema,
  CollectionSchema,
  type,
  filter,
} from "@colyseus/schema";

import { Client } from "@colyseus/core";

export class ComplexTypes extends Schema {
  @type("number")
  width: number;

  @type("number")
  height: number;

  @type("number")
  items: number = 10;
}

export class Player extends Schema {
  @type("string")
  id: string;

  @filter(function (
    this: Player,
    client: Client,
    value: Player["position"],
    root: Schema
  ) {
    return this.id === client.sessionId;
  })
  @type("number")
  position: number = 0;
}

export class StateRoomState extends Schema {
  // string type
  @type("string")
  stringField: string = "";

  // number type
  @type("number")
  numberField: number = 0;

  // boolean type
  @type("boolean")
  booleanField: boolean = true;

  //   @ int8 type specialized number types
  @type("int8")
  int8Field: number = 0;

  // complex type
  @type(ComplexTypes)
  complexField: ComplexTypes;

  // array with primitive type
  @type(["string"])
  stringArrayField: ArraySchema<string> = new ArraySchema<string>();

  // array with Schema type
  @type([ComplexTypes])
  schemaArrayField: ArraySchema<ComplexTypes> = new ArraySchema<ComplexTypes>();

  // map  tag: map's key must be string type
  @type({ map: ComplexTypes })
  schemaMapField: MapSchema<ComplexTypes, string> = new MapSchema<
    ComplexTypes,
    string
  >();

  // set tag: only supported by JavaScript
  @type({ set: ComplexTypes })
  schemaSetField: SetSchema<ComplexTypes> = new SetSchema<ComplexTypes>();

  // collection tag: only supported by JavaScript
  @type({ collection: ComplexTypes })
  schemaCollectionField: CollectionSchema<ComplexTypes> =
    new CollectionSchema<ComplexTypes>();

  // Players info
  @type({ map: Player })
  players: MapSchema<Player> = new MapSchema<Player>();
}
