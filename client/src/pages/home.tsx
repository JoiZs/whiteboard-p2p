import createRoom from "../utils/generateRoomId";
import JoinRoomFn from "../utils/joinRoom";
import { HtmlHTMLAttributes, useRef } from "react";

type Props = {};

const Home = (props: Props) => {
  const roomId = useRef<HTMLInputElement>(null);
  const statusHandler = async () => {
    const status = await JoinRoomFn(roomId.current!.value);
    if (status.status === "room-joined") {
      console.log("Room Joined");
    } else {
      console.log("Room not found");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div>
          <input type="text" placeholder="Room Id" ref={roomId} />
          <button onClick={statusHandler}>Join</button>
        </div>
        <button className="w-full bg-red-500" onClick={createRoom}>
          Create
        </button>
      </div>
    </div>
  );
};
export default Home;
