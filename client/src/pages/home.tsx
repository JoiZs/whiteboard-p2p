import React, { useEffect } from "react";
import socket from "../utils/socket";

type Props = {};

const Home = (props: Props) => {
  useEffect(() => {
    const createRoom = async () => {
      try {
        const resp = await socket.timeout(5000).emitWithAck("create-room");
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    };
    createRoom();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button>Create </button>
    </div>
  );
};
export default Home;
