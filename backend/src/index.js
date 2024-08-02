import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

(() => {
  const port = process.env.PORT || 4444;
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    socket.on("create-room", (callback) => {
      const nnid = nanoid(6);
      socket.join(nnid);
      callback({ roomId: nnid });
    });

    socket.on("join-room", ({ roomid }, callback) => {
      if (io.of("/").adapter.rooms.has(roomid)) {
        socket.join(roomid);
        callback({ status: "room-joined" });
      } else {
        callback({ status: "room-not-found" });
      }
    });
  });
  httpServer.listen(port, () => console.log("UP!: http://localhost:", port));
})();
