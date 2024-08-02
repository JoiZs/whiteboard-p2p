import socket from "../utils/socket";

const createRoom = async () => {
  try {
    const resp = await socket.timeout(5000).emitWithAck("create-room");
    if (resp["roomId"]) {
      sessionStorage.setItem("RoomId", resp["roomId"]);
    }
  } catch (error) {
    console.log(error);
  }
};
export default createRoom;
