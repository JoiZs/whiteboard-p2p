require("dotenv/config");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

(() => {
  const port = process.env.PORT || 4444;
  const httpServer = createServer();
  const io = new Server(httpServer, {});
  io.on("connection", (socket) => {});
  httpServer.listen(port, () => console.log("UP!: http://localhost:", port));
})();
