import ClientNode from "./libp2pnode";
import socket from "./socket";
import TransformData from "./datatransform";

const JoinRoomFn = async (roomId: string) => {
  try {
    const resp = await socket
      .timeout(5000)
      .emitWithAck("join-room", { roomid: roomId });
    if (resp["relayAddrs"]) {
      const clientnode = await ClientNode(
        resp["relayAddrs"].split(","),
        roomId,
      );

      clientnode.addEventListener("peer:connect", async (ev) => {
        for (let conn of clientnode.getConnections()) {
          if (conn.multiplexer == "/webrtc") {
            const stream = await conn.newStream("/wbprot");

            await TransformData(stream);
          }
        }
      });
    }
    return resp;
  } catch (err) {
    return err;
  }
};

export default JoinRoomFn;
