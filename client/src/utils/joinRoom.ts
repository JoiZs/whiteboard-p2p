import socket from "./socket";

const JoinRoomFn = async (roomId: string) => {
  try {
    const resp = await socket
      .timeout(5000)
      .emitWithAck("join-room", { roomid: roomId });
    return resp;
  } catch (err) {
    return err;
  }
};

export default JoinRoomFn;
