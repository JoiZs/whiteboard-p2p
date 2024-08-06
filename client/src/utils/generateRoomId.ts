import socket from "../utils/socket";
import ClientNode from "./libp2pnode";

const createRoom = async () => {
  try {
    const resp = await socket.timeout(5000).emitWithAck("create-room");
    if (resp["roomId"]) {
      sessionStorage.setItem("RoomId", resp["roomId"]);
      const clientnode = await ClientNode(resp["relayAddrs"], resp["roomId"]);

      clientnode.addEventListener("peer:connect", (ev) => {
        console.log(ev.detail.toString());
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export default createRoom;
