import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

(() => {
  const port = process.env.PORT || 4444;
  const httpServer = createServer();
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    socket.on("create-room", () => {
      const nnid = nanoid(6);
      socket.emit("make-room", nnid);
      socket.join(nnid);
    });

    socket.on("join-room", ({ roomid }) => {
      socket.join(roomid);
    });
  });
  httpServer.listen(port, () => console.log("UP!: http://localhost:", port));
})();
