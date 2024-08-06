import ClientNode from "./libp2pnode";
import socket from "./socket";

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
      clientnode.addEventListener("peer:connect", (ev) => {
        console.log(ev.detail.toString());
      });
    }
    return resp;
  } catch (err) {
    return err;
  }
};

export default JoinRoomFn;
