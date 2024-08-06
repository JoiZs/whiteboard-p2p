import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";
import RelayServer from "./utils/relayserver.js";
import Redis from "ioredis";

(() => {
  const port = process.env.PORT || 4444;
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" },
  });
  const redis = new Redis({
    password: process.env.REDIS_PASSWORD,
  });

  io.on("connection", (socket) => {
    socket.on("create-room", async (callback) => {
      const nnid = nanoid(6);
      socket.join(nnid);
      const relayserver = await RelayServer(nnid);

      redis.set(nnid, relayserver.getMultiaddrs().toString());

      callback({ roomId: nnid, relayAddrs: relayserver.getMultiaddrs() });
    });

    socket.on("join-room", async ({ roomid }, callback) => {
      if (io.of("/").adapter.rooms.has(roomid)) {
        socket.join(roomid);
        callback({
          status: "room-joined",
          relayAddrs: await redis.get(roomid),
        });
      } else {
        callback({ status: "room-not-found" });
      }
    });
  });
  httpServer.listen(port, () => console.log("UP!: http://localhost:", port));
})();
