import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
/**
 * Import your Room files
 */
import { DefaultRoom } from "./rooms/default/DefaultRoom";
import { ReconnectionRoom } from "./rooms/reconnection/ReconnectionRoom";
import { StateRoom } from "./rooms/state/StateRoom";
import { PhaserRoom } from "./rooms/phaser/PhaserRoom";

export default config({
  initializeGameServer: (gameServer) => {
    // default
    gameServer.define("default", DefaultRoom);

    // reconnection
    gameServer.define("reconnection", ReconnectionRoom);

    // state && serializer && filter
    gameServer.define("state", StateRoom);

    // match by phaser client demo
    gameServer.define("phaser", PhaserRoom);

    // 用来模拟网络延时，体验用户使用时遇到延时的感受
    gameServer.simulateLatency(200);
  },
  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */
    app.get("/hello_world", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },
});
