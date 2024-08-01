import createRoom from "../utils/generateRoomId";
import socket from "../utils/socket";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <div>
          <input type="text" placeholder="Room Id" />
          <button>Join</button>
        </div>
        <button className="w-full bg-red-500" onClick={createRoom}>
          Create{" "}
        </button>
      </div>
    </div>
  );
};
export default Home;
