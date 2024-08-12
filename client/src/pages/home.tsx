import createRoom from "../utils/generateRoomId";
import JoinRoomFn from "../utils/joinRoom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const roomId = useRef<HTMLInputElement>(null);
  const statusHandler = async () => {
    const status = await JoinRoomFn(roomId.current!.value);
    if (status.status === "room-joined") {
      console.log("Room Joined");
      navigate("/room");
    } else {
      console.log("Room not found");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-teal-50 gap-4">
      <div className="text-teal-500 text-5xl mb-4 font-logo">Marker</div>
      <div className="flex flex-col bg-teal-50 w-1/4 justify-center items-center border-2 border-teal-100 rounded shadow-md">
        <div className="flex flex-row justify-center py-2 w-full">
          <input
            type="text"
            placeholder="Room Id"
            ref={roomId}
            className="mr-5 outline-teal-100 p-1 text-teal-400 w-4/5 bg-teal-50"
          />
          <button onClick={statusHandler} className="text-teal-400">
            Join
          </button>
        </div>
      </div>
      <button
        className="w-1/4 bg-teal-400 p-1 mb-3 text-white rounded"
        onClick={createRoom}
      >
        Create
      </button>
    </div>
  );
};
export default Home;
