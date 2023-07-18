import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

/**
 * Import your Room files
 */
// DefaultRoom solves common connections
import { DefaultRoom } from "./rooms/default/DefaultRoom";

// ReconnectionRoom supports reconnection
import { ReconnectionRoom } from "./rooms/reconnection/ReconnectionRoom";

// State && Serializer && filter
import { StateRoom } from "./rooms/state/StateRoom";

const room = process.env["ROOM"];
console.log(process.env["TEST_CONTENT"]);

export default config({
  initializeGameServer: (gameServer) => {
    // default
    gameServer.define("default", DefaultRoom);

    // reconnection
    gameServer.define("reconnection", ReconnectionRoom);

    // state && serializer && filter
    gameServer.define("state", StateRoom);
  },
});
